// ==UserScript==
// @name           Memrise Chinese Examples
// @namespace      https://github.com/cooljingle
// @description    Example sentences for learning Chinese on Memrise
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/review/*
// @version        0.1.7
// @updateURL      https://github.com/cooljingle/memrise-chinese-examples/raw/master/Memrise_Chinese_Examples.user.js
// @downloadURL    https://github.com/cooljingle/memrise-chinese-examples/raw/master/Memrise_Chinese_Examples.user.js
// @grant          none
// ==/UserScript==

// SHORTCUTS:
//  plus/equals |   increase font size
//  minus/dash  |   decrease font size
//  insert      |   toggle example details (pinyin, translation)
//  full stop   |   next example
//  comma       |   previous example

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
            fontSizeScaleFactor = 1.3, //change this number to change the scale factor to which the default font size is to be altered 
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
                "           <span id='example-sentence' style='font-size: " + 100 * fontSizeScaleFactor + "%'>",
                "           </span>",
                "           <a id='example-detail-toggle' style='cursor: pointer;color: #AAAAAA;'>+",
                "           </a>",
                "       </div>",
                "       <div id='example-detail' style='font-size:  " + 70 * fontSizeScaleFactor + "%;display:none'>",
                "           <div id='pinyin'>",
                "           </div>",
                "           <div id='translation'>",
                "           </div>",
                "       </div>",
                "   </div>",
                "</div>"
            ].join("\n"));

        addToBox("PresentationBox", function(context) {
            word = context.thing.columns[1].val;
            resetLocalVars();
            showExample(true);
        });

        addToBox("CopyTypingBox", function() {
            showExample(true);
        });

        setKeyboardEvents();

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function addHskColours(examples) {
            var payload = _.chain(examples).map(function(e) {
                return $.parseHTML(e.exampleAutolink);
            }).flatten().map(function(e) {
                return $(e).attr('data-query');
            }).value().join("%0D%0A");

            $.get("http://crossorigin.me/" + "http://hskhsk.pythonanywhere.com/hanzi?ignoredefaults=true&analysehskwords=true&format=oneperline&hanzi=" + payload)
                .complete(function(data) {
                    var hskHtml = $(data.responseText).filter('*.box');
                    var hskLevels = [];

                    _.each(hskHtml, function(item) {
                        var i = $(item),
                            title = i.find('.title').text(),
                            words = i.find('textarea').text().split("\n");
                        hskLevels.push({
                            "name": title,
                            "words": words
                        });
                    });

                    _.each(examples, function(example) {
                        example.exampleAutolink = _.map($.parseHTML(example.exampleAutolink), function(word) {
                            var level = _.find(hskLevels, function(level) {
                                return level.words.indexOf($(word).text()) > -1;
                            });

                            switch (level && level.name) {
                                case "HSK 1":
                                    return $(word).css('color', '#E12E2E')[0];
                                case "HSK 2":
                                    return $(word).css('color', '#EB8B2B')[0];
                                case "HSK 3":
                                    return $(word).css('color', '#CFBE00')[0];
                                case "HSK 4":
                                    return $(word).css('color', '#1ca10d')[0];
                                case "HSK 5":
                                    return $(word).css('color', '#1D8FCC')[0];
                                case "HSK 6":
                                    return $(word).css('color', '#db44df')[0];
                                default:
                                    return word;
                            }
                        });
                    });
                    showExample();
                });
        }

        function addToBox(boxName, func) {
            MEMRISE.garden.box_types[boxName].prototype.activate = (function() {
                var cached_function = MEMRISE.garden.box_types[boxName].prototype.activate;
                return function() {
                    var result = cached_function.apply(this, arguments);
                    func(this);
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
            addHskColours(data.exampleList);
            if (!cachedData) {
                cachedData = data;
            } else if (data.exampleList) {
                Array.prototype.push.apply(cachedData.exampleList, data.exampleList);
            }
        }

        function renderExample() {
            var example = cachedData.exampleList[exampleIndex];
            $('#example-sentence').html(example.exampleAutolink);
            $('#pinyin').html(example.pinyin);
            $('#translation').html(example.translation);

            $('#previous-example').toggle(exampleIndex > 0);
            $('#next-example').toggle(exampleIndex + 1 < cachedData.total);
        }

        function resetLocalVars() {
            cachedData = undefined;
            exampleIndex = 0;
            pageNo = 0;
        }

        function scaleExampleFontSize(scaleFactor) {
            $('#example-detail, #example-sentence').css('font-size', function() {
                return (parseFloat($(this).css('font-size')) * scaleFactor) + 'px';
            });
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

        function setKeyboardEvents() {
            $(document).keydown(function(e) {
                if ($('#example-sentence').length > 0) {
                    switch (e.which) {
                        case 107: // +
                        case 187: // =
                            scaleExampleFontSize(1.1);
                            break;
                        case 109: // - (subtract)
                        case 189: // - (dash)
                            scaleExampleFontSize(0.9);
                            break;
                        case 188: // comma
                            if ($('#previous-example').is(':visible')) {
                                $('#previous-example').click();
                            }
                            break;
                        case 190: // full stop
                            if ($('#next-example').is(':visible')) {
                                $('#next-example').click();
                            }
                            break;
                        case 45: //insert
                            $('#example-detail-toggle').click();
                            break;
                        default:
                            return;
                    }
                    e.preventDefault();
                }
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
    }
}());
