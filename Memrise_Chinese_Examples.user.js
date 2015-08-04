// ==UserScript==
// @name           Memrise Chinese Examples
// @description    Example sentences for learning Chinese on Memrise
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/review/*
// @version        0.1.1
// @grant          none
// ==/UserScript==

(function() {
    var exampleIndex,
        cachedData,
        word,
        pageNo,
        pageSize = 20,
        lastRetrieved = new Date(0),
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


    $("#boxes").bind("DOMSubtreeModified", function() {
        if (MEMRISE.garden.box.start_time > lastRetrieved) {
            lastRetrieved = MEMRISE.garden.box.start_time;
            word = MEMRISE.garden.boxes.current().thing.columns[1].val;
            if (!word) {
                return;
            }
            if (!!$('.show-chosen-mem, .choosing-mem')[0]) {
                cachedData = undefined;
                exampleIndex = 0;
                pageNo = 0;
                showExample(true);
            } else if (!!$('.copytyping')[0] && !!cachedData) {
                showExample(true);
            }
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getUrl(wordURI, pageNo) {
        return "http://linedict.naver.com/cnen/example/search.dict?query=" +
            wordURI + "&page=" + pageNo + "&page_size=" + pageSize + "&format=json";
    }

    function loadDOM() {
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
            $.get(url, function(data) {
                if (data.total !== 0) {
                    onDataLoaded(data);
                    updateDOM();
                }
            }, "jsonp");
        } else {
            updateDOM();
        }
    }
}());
