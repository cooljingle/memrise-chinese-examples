// ==UserScript==
// @name           Memrise Chinese Examples
// @namespace      https://github.com/cooljingle
// @description    Example sentences for learning Chinese on Memrise
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/review/*
// @version        0.1.3
// @updateURL      https://github.com/cooljingle/memrise-chinese-examples/raw/master/Memrise_Chinese_Examples.user.js
// @downloadURL    https://github.com/cooljingle/memrise-chinese-examples/raw/master/Memrise_Chinese_Examples.user.js
// @grant          none
// ==/UserScript==

(function() {
    MEMRISE.garden.boxes.load = (function() {
        var cached_function = MEMRISE.garden.boxes.load;
        return function() {
            var result = cached_function.apply(this, arguments);
            if (MEMRISE.garden.session.category.name === "Mandarin Chinese (Simplified)") {
                console.log("enabling showing of example Chinese sentences");
                enableExamples();
            }
            return result;
        };      
    }());

    function enableExamples() {
        var exampleIndex,
            cachedData,
            word,
            pageNo,
            pageSize = 20,
            html = $([
                "<div class='row column' style='max-width: 90%'>",
                "   <div class='row-label'>Example Sentence",
                "       <a id='next-example' style='cursor: pointer;color: green;display:none'>↻</a>",
                "   </div>",
                "   <div class='row-label' style='top:34px'>",
                "       <a id='previous-example' style='cursor: pointer;color: purple;display:none'>↺</a>",
                "   </div>",
                "   <div class='row-value'>",
                "       <div class='primary-value'>",
                "           <span id='example-sentence' >",
                "           </span>",
                "           <a id='example-detail-toggle' style='cursor: pointer;color: #AAAAAA;'>+",
                "           </a>",
                "       </div>",
                "       <div id='example-detail' style='font-size: .7em;display:none'>",
                "           <div id='pinyin'>",
                "           </div>",
                "           <div id='translation'>",
                "           </div>",
                "       </div>",
                "   </div>",
                "</div>"
            ].join("\n"));

        addToBox("PresentationBox", function() {
            word = MEMRISE.garden.boxes.current().thing.columns[1].val;
            resetLocalVars();
            showExample(true);
        });

        addToBox("CopyTypingBox", function() {
            showExample(true);
        });
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function addToBox(boxName, func) {
        MEMRISE.garden.box_types[boxName].prototype.activate = (function() {
            var cached_function = MEMRISE.garden.box_types[boxName].prototype.activate;
            return function() {
                var result = cached_function.apply(this, arguments);
                func();
                return result;
            };
        }());
        }

        function getUrl(wordURI, pageNo) {
            return "http://linedict.naver.com/cnen/example/search.dict?query=" +
                wordURI + "&page=" + pageNo + "&page_size=" + pageSize + "&format=json";
        }

        function loadDOM() {
            console.log("loading example sentence DOM");
            $('.columns').append(html);
            setClickEvents();
        }

        function onDataLoaded(data) {
            data.exampleList = _.shuffle(data.exampleList);
            if (!cachedData) {
                cachedData = data;
            } else if (data.exampleList) {
                Array.prototype.push.apply(cachedData.exampleList, data.exampleList);
            }
        }

        function renderExample() {
            var example = cachedData.exampleList[exampleIndex];
            $('#example-sentence').html(example.example);
            $('#pinyin').html(example.pinyin);
            $('#translation').html(example.translation);

            $('#previous-example').toggle(exampleIndex > 0);
            $('#next-example').toggle(exampleIndex + 1 < cachedData.total);
        }

        function setClickEvents() {
            $('#example-detail-toggle').click(function() {
                $('#example-detail-toggle')
                .text($('#example-detail').is(':hidden') ? '-' : '+');
                $('#example-detail').toggle();
            });
            $('#next-example').click(function() {
                exampleIndex++;
                showExample();
            });
            $('#previous-example').click(function() {
                exampleIndex--;
                showExample();
            });
        }

        function showExample(shouldLoadDOM) {
            console.log("showing example for word: " + word);

            function updateDOM() {
                if (shouldLoadDOM) {
                    loadDOM();
                }
                renderExample();
            }

            var fetchMoreExamples = !cachedData || (exampleIndex === cachedData.exampleList.length);
            if (fetchMoreExamples) {
                pageNo++;
                $("#next-example").hide();
                var url = getUrl(encodeURIComponent(word), pageNo);
                console.log("fetching examples from LINE dictionary, url = " + url);
                $.get(url, function(data) {
                    console.log("examples fetched, total number of examples: " + data.total);
                    if (data.total !== 0) {
                        onDataLoaded(data);
                        updateDOM();
                    }
                }, "jsonp");
            } else {
                updateDOM();
            }
        }

        function resetLocalVars() {
            cachedData = undefined;
            exampleIndex = 0;
            pageNo = 0;
        }
    }
}());
