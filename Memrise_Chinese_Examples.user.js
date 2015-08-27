// ==UserScript==
// @name           Memrise Chinese Examples
// @namespace      https://github.com/cooljingle
// @description    Example sentences for learning Chinese on Memrise
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/review/*
// @version        0.1.9
// @updateURL      https://github.com/cooljingle/memrise-chinese-examples/raw/master/Memrise_Chinese_Examples.user.js
// @downloadURL    https://github.com/cooljingle/memrise-chinese-examples/raw/master/Memrise_Chinese_Examples.user.js
// @resource       colourpicker_css https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.7.1/spectrum.min.css
// @require        https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.7.1/spectrum.min.js
// @grant          GM_addStyle
// @grant          GM_getResourceText
// ==/UserScript==

(function() {
	MEMRISE.garden.boxes.load = (function() {
		var cached_function = MEMRISE.garden.boxes.load;
		return function() {
			var result = cached_function.apply(this, arguments);
			if (MEMRISE.garden.session.category.name === "Mandarin Chinese (Simplified)") {
				console.log("enabling showing of example Chinese sentences");
				enableExamples();
				GM_addStyle(GM_getResourceText("colourpicker_css"));
			}
			return result;
		};
	}());

	function enableExamples() {
		var audioPlaying,
			cachedData,
			defaultSettings = {
				"audioSpeed": 1,
				"colours": {
					"non-hsk": "#000000",
					"hsk-1": "#E12E2E",
					"hsk-2": "#EB8B2B",
					"hsk-3": "#CFBE00",
					"hsk-4": "#1ca10d",
					"hsk-5": "#1D8FCC",
					"hsk-6": "#db44df"
				},
				"difficulty": "all",
				"fontSizeScaleFactor": 1.3,
				"keyBindings": {
					"next-example-key": 46,
					"previous-example-key": 44,
					"example-detail-toggle-key": 47,
					"increase-font-size-key": 43,
					"decrease-font-size-key": 45,
					"example-audio-key": 112
				},
				"underlineWord": true
			},
			difficulties = {
				"basic": "&degreeType=2",
				"intermediate": "&degreeType=3",
				"advanced": "&degreeType=1",
				"all": ""
			},
            exampleIndex,
			firstTimeLoad = true,
			hskHtml,
			hskLevels,
			localStorageIdentifier = "memrise-chinese-examples",
			localStorageObject = JSON.parse(localStorage.getItem(localStorageIdentifier)) || jQuery.extend(true, {}, defaultSettings),
			sessionFontSizeScaleFactor = parseFloat(localStorageObject.fontSizeScaleFactor),
			pageNo,
			pageSize = 20,
			word,
			exampleHtml = $([
				"<div class='row column' id='example-html'>",
				"    <div class='row-label'> <a id='settings-icon' data-toggle='modal' data-target='#example-settings-modal' style='cursor: pointer;color:black'>⛭</a> Example Sentence",
				"        <a id='next-example' style='cursor: pointer; color: green; display:none'>↻</a>",
				"    </div>",
				"    <div class='row-label' style='top:34px'>",
				"        <a id='previous-example' style='cursor: pointer; color: purple; display:none'>↺</a>",
				"    </div>",
				"    <div class='row-value'>",
				"        <span id='example-audio' style='vertical-align: text-top; cursor: pointer; float: right; display:none'>🔊</span>",
				"        <div class='primary-value'>",
				"            <span id='example-sentence'></span>",
				"            <a id='example-detail-toggle' style='cursor: pointer; color: #AAAAAA; display:none'>+</a>",
				"        </div>",
				"        <div id='example-detail' style='display:none'>",
				"            <div id='pinyin'></div>",
				"            <div id='translation'></div>",
				"        </div>",
				"    </div>",
				"</div>"
			].join("\n")),
			modalHtml = $([
				"<div class='modal fade' id='example-settings-modal' tabindex='-1' role='dialog' aria-labelledby='example-settings-modal-label'>",
				"    <div class='modal-dialog' role='document'>",
				"        <div class='modal-content'>",
				"            <div class='modal-header'>",
				"                <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button>",
				"                <h1 class='modal-title' id='example-settings-modal-label'>Example Settings</h1></div>",
				"            <div class='modal-body'>",
				"                <div>",
				"                    <h3>Colours</h3>",
				"                    <table class='table table-striped'>",
				"                        <thead>",
				"                            <tr>",
				"                                <th>Non-HSK</th>",
				"                                <th>HSK 1</th>",
				"                                <th>HSK 2</th>",
				"                                <th>HSK 3</th>",
				"                                <th>HSK 4</th>",
				"                                <th>HSK 5</th>",
				"                                <th>HSK 6</th>",
				"                            </tr>",
				"                        </thead>",
				"                        <tbody>",
				"                            <tr id='picker'>",
				"                                <td>",
				"                                    <input type='text' id='non-hsk'>",
				"                                </td>",
				"                                <td>",
				"                                    <input type='text' id='hsk-1'>",
				"                                </td>",
				"                                <td>",
				"                                    <input type='text' id='hsk-2'>",
				"                                </td>",
				"                                <td>",
				"                                    <input type='text' id='hsk-3'>",
				"                                </td>",
				"                                <td>",
				"                                    <input type='text' id='hsk-4'>",
				"                                </td>",
				"                                <td>",
				"                                    <input type='text' id='hsk-5'>",
				"                                </td>",
				"                                <td>",
				"                                    <input type='text' id='hsk-6'>",
				"                                </td>",
				"                            </tr>",
				"                        </tbody>",
				"                    </table>",
				"                    <hr>",
				"                    <h3>Default font size</h3>",
				"                    <div>",
				"                        <input type='range' id='font-range' min='0.8' max='4' step='0.1'>",
				"                        <output id='font-range-label' style='margin-left: 20px'></output>",
				"                    </div>",
				"                    <hr>",
				"                    <h3>Audio speed</h3>",
				"                    <div>",
				"                        <input type='range' id='speed-range' min='0' max='2' step='1'>",
				"                        <output id='speed-range-label' style='margin-left: 20px'></output>",
				"                    </div>",
				"                    <hr>",
				"                    <h3>Underline word</h3>",
				"                    <div>",
				"                    	<label>",
				"                        <input id='underline' type='checkbox' style='vertical-align: top'>",
				"                        <output id='underline-label' style='margin-left: 20px'></output>",
				"                    	</label>",
				"                    </div>",
				"                    <hr>",
				"                    <div style='font-size: 1.5em; line-height: 1.6em' align='center'>",
				"                        <div id='settings-example-sentence'>",
				"							<span class='non-hsk'>哈利</span>",
				"							<span class='hsk-1'>的</span>",
				"							<span class='hsk-1'><strong>爸爸</strong></span>",
				"							<span class='hsk-2'>非常</span>",
				"							<span class='hsk-3'>关心</span>",
				"							<span class='hsk-4'>国际</span>",
				"							<span class='hsk-5'>进口</span>",
				"							<span class='hsk-6'>指标</span>",
				"							<span class='non-hsk'>。</span>",		
                "							<span id='settings-example-audio' style='cursor: pointer; float: right'>🔊</span>",
				"                        </div>",
				"                        <div id='settings-example-detail'>",
				"                            <div>Hālì de <strong>bàba</strong> fēicháng guānxīn guójì jìnkǒu zhǐbiāo.</div>",
				"                            <div>Harry's father takes great interest in international import targets.</div>",
				"                        </div>",
				"                    </div>",
				"                    <hr>",
				"                    <h3>Example difficulties</h3>",
				"                    <div class='radio'>",
				"                        <label>",
				"                            <input type='radio' name='difficulty-options' value='all' checked=''> All </label>",
				"                    </div>",
				"                    <div class='radio'>",
				"                        <label>",
				"                            <input type='radio' name='difficulty-options' value='basic'> Basic only </label>",
				"                    </div>",
				"                    <div class='radio'>",
				"                        <label>",
				"                            <input type='radio' name='difficulty-options' value='intermediate'> Intermediate only </label>",
				"                    </div>",
				"                    <div class='radio'>",
				"                        <label>",
				"                            <input type='radio' name='difficulty-options' value='advanced'> Advanced only </label>",
				"                    </div>",
				"                    <hr>",
				"                    <h3>Key bindings</h3>",
				"                    <table id='key-bindings' class='table table-condensed'>",
				"                        <tbody>",
				"                            <tr id='next-example-key'>",
                "                                <th style='width:80%'>",
				"                                    Next example",
				"                                </th>",
				"                                <td class='value' style='width:10%'>",
				"                                    <kbd></kbd>",
				"                                </td>",
				"                                <td class='set-link' style='width:10%'>",
				"                                    <a>Set</a>",
				"                                </td>",
				"                            </tr>",
				"                            <tr id='previous-example-key'>",
				"                                <th style='width:80%'>",
				"                                    Previous example",
				"                                </th>",
				"                                <td class='value' style='width:10%'>",
				"                                    <kbd></kbd>",
				"                                </td>",
				"                                <td class='set-link' style='width:10%'>",
				"                                    <a>Set</a>",
				"                                </td>",
				"                            </tr>",
				"                            <tr id='example-detail-toggle-key'>",
				"                                <th style='width:80%'>",
				"                                    Toggle example details",
				"                                </th>",
				"                                <td class='value'>",
				"                                    <kbd></kbd>",
				"                                </td>",
				"                                <td class='set-link'>",
				"                                    <a>Set</a>",
				"                                </td>",
				"                            </tr>",
				"                            <tr id='increase-font-size-key'>",
				"                                <th style='width:80%'>",
				"                                    Increase font size",
				"                                </th>",
				"                                <td class='value' style='width:10%'>",
				"                                    <kbd></kbd>",
				"                                </td>",
				"                                <td class='set-link' style='width:10%'>",
				"                                    <a>Set</a>",
				"                                </td>",
				"                            </tr>",
				"                            <tr id='decrease-font-size-key'>",
				"                                <th style='width:80%'>",
				"                                    Decrease font size",
				"                                </th>",
				"                                <td class='value' style='width:10%'>",
				"                                    <kbd></kbd>",
				"                                </td>",
				"                                <td class='set-link' style='width:10%'>",
				"                                    <a>Set</a>",
				"                                </td>",
				"                            </tr>",
				"                            <tr id='example-audio-key'>",
				"                                <th style='width:80%'>",
				"                                    Play audio",
				"                                </th>",
				"                                <td class='value' style='width:10%'>",
				"                                    <kbd></kbd>",
				"                                </td>",
				"                                <td class='set-link' style='width:10%'>",
				"                                    <a>Set</a>",
				"                                </td>",
				"                            </tr>",
				"                        </tbody>",
				"                    </table>",
				"                </div>",
				"            </div>",
				"            <div class='modal-footer'>",
				"                <button type='button' class='btn btn-info pull-left' id='reset-settings-button'>Reset to defaults</button>",
				"                <button type='button' class='btn btn-default' data-dismiss='modal'>Cancel</button>",
				"                <button type='button' class='btn btn-primary' data-dismiss='modal' id='save-settings-button'>Save changes</button>",
				"            </div>",
				"        </div>",
				"    </div>",
				"</div>"
			].join("\n").replace(/[\t\r\n]/g, ""));

		addToBox("PresentationBox", function(context) {
			word = context.thing.columns[1].val;
			resetLocalVars();
			showExample(true);
		});

		addToBox("CopyTypingBox", function() {
			showExample(true);
		});
        
		setKeyboardEvents();
        loadModal();

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		function addHskColours(examples) {
			var payload = _.chain(examples).map(function(e) {
				return $.parseHTML(e.exampleAutolink);
			}).flatten().map(function(e) {
				return $(e).attr('data-query');
			}).value().join("%0D%0A");

			$.get("http://crossorigin.me/" + "http://hskhsk.pythonanywhere.com/hanzi?ignoredefaults=true&analysehskwords=true&format=oneperline&hanzi=" + payload)
				.complete(function(data) {
					hskHtml = $(data.responseText).filter('*.box');
					hskLevels = [];

					_.each(hskHtml, function(item) {
						var i = $(item),
							title = i.find('.title').text(),
							words = i.find('textarea').text().split("\n");
						hskLevels.push({
							"name": title,
							"words": words
						});
					});
					colourExamples(examples);
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

		function colourExamples(examples) {
			_.each(examples, function(example) {
				example.exampleAutolink = _.map($.parseHTML(example.exampleAutolink) || example.exampleAutolink, function(word) {
					var level = _.find(hskLevels, function(level) {
						return level.words.indexOf($(word).text()) > -1;
					});

					switch (level && level.name) {
						case "HSK 1":
							return $(word).css('color', localStorageObject.colours["hsk-1"])[0];
						case "HSK 2":
							return $(word).css('color', localStorageObject.colours["hsk-2"])[0];
						case "HSK 3":
							return $(word).css('color', localStorageObject.colours["hsk-3"])[0];
						case "HSK 4":
							return $(word).css('color', localStorageObject.colours["hsk-4"])[0];
						case "HSK 5":
							return $(word).css('color', localStorageObject.colours["hsk-5"])[0];
						case "HSK 6":
							return $(word).css('color', localStorageObject.colours["hsk-6"])[0];
						default:
							return $(word).css('color', localStorageObject.colours["non-hsk"])[0];
					}
				});
			});
		}

		function getUrl(wordURI, pageNo) {
			return "http://linedict.naver.com/cnen/example/search.dict?query=" +
				wordURI + "&page=" + pageNo + "&page_size=" + pageSize + "&format=json" + difficulties[localStorageObject.difficulty];
		}
        
        function initialiseColourPickers() {
			_.each($('#picker input'), function(input) {
				$(input).spectrum();
			});
        }

		function initialiseFontSizes() {
			setExampleFontSize(sessionFontSizeScaleFactor);
			setModalFontSize(localStorageObject.fontSizeScaleFactor);
		}

		function loadModal() {
			$("body").append(modalHtml);
			var settingsObject = jQuery.extend(true, {}, localStorageObject);
            initialiseColourPickers();
			setModalEvents(settingsObject);
			setModalFields(settingsObject);
		}

		function loadDOM() {
			console.log("loading example sentence DOM for word " + word);
            exampleHtml.find('#example-sentence, #pinyin, #translation').html("");
			$('.columns').append(exampleHtml);
			shiftShowMoreLink();
			setClickEvents();
			if (firstTimeLoad) {
				initialiseFontSizes();
				firstTimeLoad = false;
			}
		}

		function onDataLoaded(data) {
			data.exampleList = _.shuffle(data.exampleList);
			addHskColours(data.exampleList);
			if (localStorageObject.underlineWord) {
				toggleUnderlines(data.exampleList);
			}
			if (!cachedData) {
				cachedData = data;
			} else if (data.exampleList) {
				Array.prototype.push.apply(cachedData.exampleList, data.exampleList);
			}
		}
        
        function playAudio(word, speed) {
            var audioElement = document.createElement('audio');
            var audioLink = 'http://tts.cndic.naver.com/tts/mp3ttsV1.cgi?spk_id=250&text_fmt=0&pitch=100&volume=100&speed=' + 80 * speed + '&wrapper=0&enc=0&text=' +
                encodeURIComponent(word);
            audioElement.setAttribute('src', audioLink);
            audioElement.play();
            audioPlaying = true;
            $(audioElement).on('ended', function() {
                audioPlaying = false;
            });
        }

		function renderExample() {
			var example = cachedData.exampleList[exampleIndex] || "";
			$('#example-sentence').html(example.exampleAutolink);
			$('#pinyin').html(example.pinyin);
			$('#translation').html(example.translation);

			$('#previous-example').toggle(exampleIndex > 0);
			$('#next-example').toggle(exampleIndex + 1 < cachedData.total);
			$('#example-detail-toggle').toggle(!!example);
			$('#example-audio').toggle(!!example);
		}

		function resetLocalVars() {
			cachedData = undefined;
			exampleIndex = 0;
			pageNo = 0;
		}

		function scaleElementFontSize(selector, scaleFactor) {
			$(selector).css('font-size', function() {
				var defaultSize = parseFloat($(this).parent().css('font-size'));
				return (defaultSize * scaleFactor) + 'px';
			}).css('line-height', function() {
				var defaultSize = parseFloat($(this).parent().css('line-height'));
				return (defaultSize * scaleFactor) + 'px';
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
			$('#example-audio').click(function() {
				if (audioPlaying) {
					return;
                } else {
                    playAudio(cachedData.exampleList[exampleIndex].example, localStorageObject.audioSpeed);
                }
			});
		}

		function setExampleFontSize(scaleFactor) {
			scaleElementFontSize("#example-sentence", scaleFactor);
			scaleElementFontSize("#example-detail", 0.7 * scaleFactor);
			scaleElementFontSize("#example-detail-toggle", 0.7 * scaleFactor);
		}

		function setKeyboardEvents() {
			$(document).on("keypress.example", function(e) {
				if ($('#example-sentence').length > 0) {
					var key = _.findKey(localStorageObject.keyBindings, function(value) {
							return value === e.which;
						}),
						methods = {
							"next-example-key": function() {
								if ($('#next-example').is(':visible')) {
									$('#next-example').click();
								}
							},
							"previous-example-key": function() {
								if ($('#previous-example').is(':visible')) {
									$('#previous-example').click();
								}
							},
							"example-detail-toggle-key": function() {
								$('#example-detail-toggle').click();
							},
							"increase-font-size-key": function() {
								sessionFontSizeScaleFactor += 0.1;
								setExampleFontSize(sessionFontSizeScaleFactor);
							},
							"decrease-font-size-key": function() {
								sessionFontSizeScaleFactor -= 0.1;
								setExampleFontSize(sessionFontSizeScaleFactor);
							},
							"example-audio-key": function() {
								$('#example-audio').click();
							},
						};

					if (key) {
						methods[key]();
					}
					e.preventDefault();
				}
			});
		}

		function setModalEvents(settingsObject) {
            //modal show/hide
			$('#example-settings-modal').on('shown.bs.modal', function() {
				$(document).off('focusin.modal'); //enable focus events on modal
                $(document).off("keypress.example"); //disable keyboard shortcuts
			});
            
			$('#example-settings-modal').on('hide.bs.modal', function() {
				settingsObject = jQuery.extend(true, {}, localStorageObject);
				setModalFields(settingsObject);
                setKeyboardEvents();
			});

			//coours
			_.each($('#picker input'), function(input) {
				var id = $(input).attr('id');
				$(input).change(function() {
					var self = this;
					$('.' + id).css('color', function() {
						var newColour = $(self).spectrum("get").toHexString();
						settingsObject.colours[id] = newColour;
						return newColour;
					});
				});
			});

			//font size
			$('#font-range')[0].oninput = function() {
				var scaleFactor = $(this).val();
				settingsObject.fontSizeScaleFactor = scaleFactor;
				$('#font-range-label').text(scaleFactor + 'x');
				setModalFontSize(scaleFactor);
			};

			//audio Speed
			$('#speed-range')[0].oninput = function() {
				var speed = parseInt($(this).val(), 10);
                switch(speed){
                    case 0:
                        settingsObject.audioSpeed = 0.2;
                        $('#speed-range-label').text("Slow");
                        break
                    case 1:
                        settingsObject.audioSpeed = 1;
                        $('#speed-range-label').text("Normal");
                        break;
                    case 2:
                        settingsObject.audioSpeed = 2.5;
                        $('#speed-range-label').text("Fast");
                        break;
                }
			};
            
            $('#settings-example-audio').click(function(){
               playAudio($('#settings-example-sentence').text(), settingsObject.audioSpeed); 
            });
            
			//Underline
			$('#underline').change(function() {
				var example = $('#settings-example-sentence'),
					exampleUnderlined = !!$('#settings-example-sentence u').length;

				settingsObject.underlineWord = $(this).is(':checked');
				if (settingsObject.underlineWord !== exampleUnderlined) {
					toggleUnderline(example);
				}
				$('#underline-label').text(settingsObject.underlineWord ? "Underlined" : "Not underlined");
			});

			//example difficulties
			$('.radio input[name=difficulty-options]').change(function() {
				if ($(this).is(':checked')) {
					settingsObject.difficulty = $(this).val();
				}
			});

			//key bindings
			$('.set-link').click(function(setEvent) {
                $(document).off("keypress.example");
				var element = $(this).parent().find('.value');
				var initialValue = element.text();
				element.html('<input type="text" style="width:35px;height:20px;margin:0px" maxlength="1">');
				element.find('input').focus();

				var inputPending = true;
				setEvent.stopPropagation();

				$(document).click(function(event) {
					onInput(event);
				});
				$(document).keypress(function(event) {
					onInput(event);
				});

				function onInput(e) {
					if (inputPending) {
                        var id = element.parent().attr('id');
						element.html('<kbd></kbd>');
                        var invalidChars = _.where(settingsObject.keyBindings, function(val, key){return key.toString() !== id}).concat(13);
						var char = (e.type === "keypress" && !_.contains(invalidChars, e.which)) ? String.fromCharCode(e.which) : initialValue;
						element.find('kbd').text(char);
						e.stopPropagation();
						inputPending = false;
						settingsObject.keyBindings[element.parent().attr('id')] = char.charCodeAt(0);
					}
					$(this).off(e);
				}
			});

			//button click events
			$('#save-settings-button').click(function() {
				var shouldReloadExamples = settingsObject.difficulty !== localStorageObject.difficulty;
				localStorage.setItem(localStorageIdentifier, JSON.stringify(settingsObject));
				localStorageObject = jQuery.extend(true, {}, settingsObject);
				if (shouldReloadExamples) {
					$('#example-html').remove();
					resetLocalVars();
					showExample(true);
				} else {
					colourExamples(cachedData.exampleList);
					toggleUnderlines(cachedData.exampleList);
					showExample();
				}
				sessionFontSizeScaleFactor = parseFloat(localStorageObject.fontSizeScaleFactor);
				setExampleFontSize(sessionFontSizeScaleFactor);
			});
			$('#reset-settings-button').click(function() {
				settingsObject = jQuery.extend(true, {}, defaultSettings);
				setModalFields(settingsObject);
			});
		}

		function setModalFields(settingsObject) {
			//colours
			_.each($('#picker input'), function(input) {
				var id = $(input).attr('id');
				$(input).spectrum({
					color: settingsObject.colours[id]
				});
				$(input).change();
			});

			//font size
			$('#font-range').prop('value', settingsObject.fontSizeScaleFactor)[0].oninput();

			//audio speed
			$('#speed-range').prop('value', settingsObject.audioSpeed)[0].oninput();

			//underline
			$('#underline').prop('checked', settingsObject.underlineWord).change();

			//example difficulties
			$('.radio input[name=difficulty-options][value=' + settingsObject.difficulty + ']').prop('checked', true);

			//key bindings
			_.each($('table#key-bindings tr'), function(tr) {
				var id = $(tr).attr('id');
				var char = String.fromCharCode(settingsObject.keyBindings[id]);
				$(tr).find('td.value kbd').text(char);
			});
		}

		function setModalFontSize(scaleFactor) {
			scaleElementFontSize("#settings-example-sentence", scaleFactor);
			scaleElementFontSize("#settings-example-detail", 0.7 * scaleFactor);
		}

		function shiftShowMoreLink() {
			$('.show-more-link').css("right", "-80px");
		}

		function showExample(shouldLoadDOM) {
			function updateDOM() {
				if (shouldLoadDOM) {
					loadDOM();
				}
				renderExample();
			}

			var fetchMoreExamples = !cachedData || (cachedData.total > 0) && (exampleIndex === cachedData.exampleList.length);
			if (fetchMoreExamples) {
				pageNo++;
				$("#next-example").hide();
				var url = getUrl(encodeURIComponent(word), pageNo);
				console.log("fetching examples from LINE dictionary, url = " + url);
				$.get(url, function(data) {
					console.log("examples fetched, total number of examples: " + data.total);
                    onDataLoaded(data);
                    updateDOM();
				}, "jsonp");
			} else {
				updateDOM();
			}
		}
        
		function toggleUnderline(element) {
			$(element).find('u >').unwrap()[0] || $(element).find('strong').wrap('<u></u>');
			return element;
		}   
        
		function toggleUnderlines(examples) {
			_.each(examples, function(example) {
				example.exampleAutolink = _.map($.parseHTML(example.exampleAutolink) || example.exampleAutolink, function(word) {
					return toggleUnderline(word);
				});
			});
		}     
	}
}());
