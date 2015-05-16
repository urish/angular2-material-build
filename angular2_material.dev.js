"format register";
System.register("angular2_material/src/core/constants", [], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/core/constants";
  var KEY_ESC,
      KEY_SPACE,
      KEY_UP,
      KEY_DOWN;
  return {
    setters: [],
    execute: function() {
      KEY_ESC = 27;
      $__export("KEY_ESC", KEY_ESC);
      KEY_SPACE = 32;
      $__export("KEY_SPACE", KEY_SPACE);
      KEY_UP = 38;
      $__export("KEY_UP", KEY_UP);
      KEY_DOWN = 40;
      $__export("KEY_DOWN", KEY_DOWN);
    }
  };
});

System.register("angular2/src/facade/browser", [], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/facade/browser";
  var __esModule,
      win,
      document,
      location,
      gc,
      Event,
      MouseEvent,
      KeyboardEvent;
  return {
    setters: [],
    execute: function() {
      __esModule = true;
      $__export("__esModule", __esModule);
      win = window;
      $__export("window", win);
      document = window.document;
      $__export("document", document);
      location = window.location;
      $__export("location", location);
      gc = window.gc ? (function() {
        return window.gc();
      }) : (function() {
        return null;
      });
      $__export("gc", gc);
      Event = Event;
      $__export("Event", Event);
      MouseEvent = MouseEvent;
      $__export("MouseEvent", MouseEvent);
      KeyboardEvent = KeyboardEvent;
      $__export("KeyboardEvent", KeyboardEvent);
    }
  };
});

System.register("angular2_material/src/components/grid_list/grid_list", ["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view", "angular2/src/core/annotations_impl/visibility", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/facade/math"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/grid_list/grid_list";
  var Component,
      onDestroy,
      onChange,
      onAllChangesDone,
      View,
      Parent,
      ListWrapper,
      StringWrapper,
      isPresent,
      isString,
      NumberWrapper,
      RegExpWrapper,
      Math,
      MdGridList,
      MdGridTile,
      TileCoordinator,
      Position,
      TileStyle;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      onDestroy = $__m.onDestroy;
      onChange = $__m.onChange;
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Parent = $__m.Parent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      isString = $__m.isString;
      NumberWrapper = $__m.NumberWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
    }, function($__m) {
      Math = $__m.Math;
    }],
    execute: function() {
      MdGridList = (function() {
        function MdGridList() {
          this.tiles = [];
          this.rows = 0;
        }
        return ($traceurRuntime.createClass)(MdGridList, {
          set cols(value) {
            this._cols = isString(value) ? NumberWrapper.parseInt(value, 10) : value;
          },
          get cols() {
            return this._cols;
          },
          set rowHeight(value) {
            if (value === 'fit') {
              this.rowHeightMode = 'fit';
            } else if (StringWrapper.contains(value, ':')) {
              var ratioParts = StringWrapper.split(value, RegExpWrapper.create(':'));
              if (ratioParts.length !== 2) {
                throw ("md-grid-list: invalid ratio given for row-height: \"" + value + "\"");
              }
              this.rowHeightMode = 'ratio';
              this.rowHeightRatio = NumberWrapper.parseFloat(ratioParts[0]) / NumberWrapper.parseFloat(ratioParts[1]);
            } else {
              this.rowHeightMode = 'fixed';
              this.fixedRowHeight = value;
            }
          },
          onAllChangesDone: function() {
            this.layoutTiles();
          },
          layoutTiles: function() {
            var tracker = new TileCoordinator(this.cols, this.tiles);
            this.rows = tracker.rowCount;
            for (var i = 0; i < this.tiles.length; i++) {
              var pos = tracker.positions[i];
              var tile = this.tiles[i];
              var style = this.getTileStyle(tile, pos.row, pos.col);
              tile.styleWidth = style.width;
              tile.styleHeight = style.height;
              tile.styleTop = style.top;
              tile.styleLeft = style.left;
              tile.styleMarginTop = style.marginTop;
              tile.stylePaddingTop = style.paddingTop;
            }
          },
          addTile: function(tile) {
            ListWrapper.push(this.tiles, tile);
          },
          removeTile: function(tile) {
            ListWrapper.remove(this.tiles, tile);
          },
          getBaseTileSize: function(sizePercent, gutterFraction) {
            return ("(" + sizePercent + "% - ( " + this.gutterSize + " * " + gutterFraction + " ))");
          },
          getTilePosition: function(baseSize, offset) {
            return ("calc( (" + baseSize + " + " + this.gutterSize + ") * " + offset + " )");
          },
          getTileSize: function(baseSize, span) {
            return ("calc( (" + baseSize + " * " + span + ") + (" + (span - 1) + " * " + this.gutterSize + ") )");
          },
          getTileStyle: function(tile, rowIndex, colIndex) {
            var percentWidthPerTile = 100 / this.cols;
            var gutterWidthFractionPerTile = (this.cols - 1) / this.cols;
            var baseTileWidth = this.getBaseTileSize(percentWidthPerTile, gutterWidthFractionPerTile);
            var tileStyle = new TileStyle();
            tileStyle.left = this.getTilePosition(baseTileWidth, colIndex);
            tileStyle.width = this.getTileSize(baseTileWidth, tile.colspan);
            switch (this.rowHeightMode) {
              case 'fixed':
                tileStyle.top = this.getTilePosition(this.fixedRowHeight, rowIndex);
                tileStyle.height = this.getTileSize(this.fixedRowHeight, tile.rowspan);
                break;
              case 'ratio':
                var percentHeightPerTile = percentWidthPerTile / this.rowHeightRatio;
                var baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterWidthFractionPerTile);
                tileStyle.marginTop = this.getTilePosition(baseTileHeight, rowIndex);
                tileStyle.paddingTop = this.getTileSize(baseTileHeight, tile.rowspan);
                break;
              case 'fit':
                var percentHeightPerTile = 100 / this.cols;
                var gutterHeightFractionPerTile = (this.rows - 1) / this.rows;
                var baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterHeightFractionPerTile);
                tileStyle.top = this.getTilePosition(baseTileHeight, rowIndex);
                tileStyle.height = this.getTileSize(baseTileHeight, tile.rowspan);
                break;
            }
            return tileStyle;
          }
        }, {});
      }());
      $__export("MdGridList", MdGridList);
      Object.defineProperty(MdGridList, "annotations", {get: function() {
          return [new Component({
            selector: 'md-grid-list',
            properties: {
              'cols': 'cols',
              'rowHeight': 'row-height',
              'gutterSize': 'gutter-size'
            },
            lifecycle: [onAllChangesDone]
          }), new View({template: "<style>\n  md-grid-tile {\n    background: lightblue;\n  }\n</style>\n\n<div class=\"md-grid-list\">\n  <content></content>\n</div>"})];
        }});
      Object.defineProperty(MdGridList.prototype.addTile, "parameters", {get: function() {
          return [[MdGridTile]];
        }});
      Object.defineProperty(MdGridList.prototype.removeTile, "parameters", {get: function() {
          return [[MdGridTile]];
        }});
      Object.defineProperty(MdGridList.prototype.getBaseTileSize, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.number]];
        }});
      Object.defineProperty(MdGridList.prototype.getTilePosition, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.number]];
        }});
      Object.defineProperty(MdGridList.prototype.getTileSize, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.number]];
        }});
      Object.defineProperty(MdGridList.prototype.getTileStyle, "parameters", {get: function() {
          return [[MdGridTile], [assert.type.number], [assert.type.number]];
        }});
      MdGridTile = (function() {
        function MdGridTile(gridList) {
          this.gridList = gridList;
          this.role = 'listitem';
          this.rowspan = 1;
          this.colspan = 1;
        }
        return ($traceurRuntime.createClass)(MdGridTile, {
          set rowspan(value) {
            this._rowspan = isString(value) ? NumberWrapper.parseInt(value, 10) : value;
          },
          get rowspan() {
            return this._rowspan;
          },
          set colspan(value) {
            this._colspan = isString(value) ? NumberWrapper.parseInt(value, 10) : value;
          },
          get colspan() {
            return this._colspan;
          },
          onChange: function(_) {
            if (!this.isRegisteredWithGridList) {
              this.gridList.addTile(this);
              this.isRegisteredWithGridList = true;
            }
          },
          onDestroy: function() {
            this.gridList.removeTile(this);
          }
        }, {});
      }());
      $__export("MdGridTile", MdGridTile);
      Object.defineProperty(MdGridTile, "annotations", {get: function() {
          return [new Component({
            selector: 'md-grid-tile',
            properties: {
              'rowspan': 'rowspan',
              'colspan': 'colspan'
            },
            hostProperties: {
              'styleHeight': 'style.height',
              'styleWidth': 'style.width',
              'styleTop': 'style.top',
              'styleLeft': 'style.left',
              'styleMarginTop': 'style.marginTop',
              'stylePaddingTop': 'style.paddingTop',
              'role': 'role'
            },
            lifecycle: [onDestroy, onChange]
          }), new View({template: "<figure>\n  <content></content>\n</figure>"})];
        }});
      Object.defineProperty(MdGridTile, "parameters", {get: function() {
          return [[MdGridList, new Parent()]];
        }});
      TileCoordinator = (function() {
        function TileCoordinator(numColumns, tiles) {
          var $__0 = this;
          this.columnIndex = 0;
          this.rowIndex = 0;
          this.tracker = ListWrapper.createFixedSize(numColumns);
          ListWrapper.fill(this.tracker, 0);
          this.positions = ListWrapper.map(tiles, (function(tile) {
            return $__0._trackTile(tile);
          }));
        }
        return ($traceurRuntime.createClass)(TileCoordinator, {
          get rowCount() {
            return this.rowIndex + 1;
          },
          _trackTile: function(tile) {
            if (tile.colspan > this.tracker.length) {
              throw ("Tile with colspan " + tile.colspan + " is wider\n          than grid with cols=\"" + this.tracker.length + "\".");
            }
            var gapStartIndex = -1;
            var gapEndIndex = -1;
            do {
              if (this.columnIndex + tile.colspan > this.tracker.length) {
                this._nextRow();
                continue;
              }
              gapStartIndex = ListWrapper.indexOf(this.tracker, 0, this.columnIndex);
              if (gapStartIndex == -1) {
                this._nextRow();
                continue;
              }
              gapEndIndex = this._findGapEndIndex(gapStartIndex);
              this.columnIndex = gapStartIndex + 1;
            } while (gapEndIndex - gapStartIndex < tile.colspan);
            this._markTilePosition(gapStartIndex, tile);
            this.columnIndex = gapStartIndex + tile.colspan;
            return new Position(this.rowIndex, gapStartIndex);
          },
          _nextRow: function() {
            this.columnIndex = 0;
            this.rowIndex++;
            for (var i = 0; i < this.tracker.length; i++) {
              this.tracker[i] = Math.max(0, this.tracker[i] - 1);
            }
          },
          _findGapEndIndex: function(gapStartIndex) {
            for (var i = gapStartIndex + 1; i < this.tracker.length; i++) {
              if (this.tracker[i] != 0) {
                return i;
              }
            }
            return this.tracker.length;
          },
          _markTilePosition: function(start, tile) {
            for (var i = 0; i < tile.colspan; i++) {
              this.tracker[start + i] = tile.rowspan;
            }
          }
        }, {});
      }());
      Object.defineProperty(TileCoordinator, "parameters", {get: function() {
          return [[assert.type.number], [assert.genericType(List, MdGridTile)]];
        }});
      Object.defineProperty(TileCoordinator.prototype._trackTile, "parameters", {get: function() {
          return [[MdGridTile]];
        }});
      Object.defineProperty(TileCoordinator.prototype._findGapEndIndex, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Position = (function() {
        function Position(row, col) {
          this.row = row;
          this.col = col;
        }
        return ($traceurRuntime.createClass)(Position, {}, {});
      }());
      Object.defineProperty(Position, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.number]];
        }});
      TileStyle = (function() {
        function TileStyle() {}
        return ($traceurRuntime.createClass)(TileStyle, {}, {});
      }());
    }
  };
});

System.register("angular2_material/src/components/input/input", ["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/di", "angular2/src/core/annotations_impl/visibility", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/input/input";
  var Directive,
      onAllChangesDone,
      Attribute,
      Parent,
      ObservableWrapper,
      EventEmitter,
      MdInput,
      MdTextarea,
      MdInputContainer;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      Parent = $__m.Parent;
    }, function($__m) {
      ObservableWrapper = $__m.ObservableWrapper;
      EventEmitter = $__m.EventEmitter;
    }],
    execute: function() {
      MdInput = (function() {
        function MdInput(value, container) {
          this.yes = true;
          this.value = value == null ? '' : value;
          this.mdChange = new EventEmitter();
          this.mdFocusChange = new EventEmitter();
          container.registerInput(this);
        }
        return ($traceurRuntime.createClass)(MdInput, {
          updateValue: function(event) {
            this.value = event.target.value;
            ObservableWrapper.callNext(this.mdChange, this.value);
          },
          setHasFocus: function(hasFocus) {
            ObservableWrapper.callNext(this.mdFocusChange, hasFocus);
          }
        }, {});
      }());
      $__export("MdInput", MdInput);
      Object.defineProperty(MdInput, "annotations", {get: function() {
          return [new Directive({
            selector: 'md-input-container input',
            events: ['mdChange', 'mdFocusChange'],
            hostProperties: {'yes': 'class.md-input'},
            hostListeners: {
              'input': 'updateValue($event)',
              'focus': 'setHasFocus(true)',
              'blur': 'setHasFocus(false)'
            }
          })];
        }});
      Object.defineProperty(MdInput, "parameters", {get: function() {
          return [[String, new Attribute('value')], [MdInputContainer, new Parent()]];
        }});
      Object.defineProperty(MdInput.prototype.setHasFocus, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      MdTextarea = (function($__super) {
        function MdTextarea(value, container) {
          $traceurRuntime.superConstructor(MdTextarea).call(this, value, container);
        }
        return ($traceurRuntime.createClass)(MdTextarea, {}, {}, $__super);
      }(MdInput));
      $__export("MdTextarea", MdTextarea);
      Object.defineProperty(MdTextarea, "annotations", {get: function() {
          return [new Directive({
            selector: 'md-input-container textarea',
            events: ['mdChange', 'mdFocusChange'],
            hostProperties: {'yes': 'class.md-input'},
            hostListeners: {
              'input': 'updateValue($event)',
              'focus': 'setHasFocus(true)',
              'blur': 'setHasFocus(false)'
            }
          })];
        }});
      Object.defineProperty(MdTextarea, "parameters", {get: function() {
          return [[String, new Attribute('value')], [MdInputContainer, new Parent()]];
        }});
      MdInputContainer = (function() {
        function MdInputContainer() {
          this._input = null;
          this.inputHasValue = false;
          this.inputHasFocus = false;
        }
        return ($traceurRuntime.createClass)(MdInputContainer, {
          onAllChangesDone: function() {
            if (this._input == null) {
              throw 'No <input> or <textarea> found inside of <md-input-container>';
            }
          },
          registerInput: function(input) {
            var $__0 = this;
            if (this._input != null) {
              throw 'Only one text input is allowed per <md-input-container>.';
            }
            this._input = input;
            this.inputHasValue = input.value != '';
            ObservableWrapper.subscribe(input.mdChange, (function(value) {
              $__0.inputHasValue = value != '';
            }));
            ObservableWrapper.subscribe(input.mdFocusChange, (function(hasFocus) {
              $__0.inputHasFocus = hasFocus;
            }));
          }
        }, {});
      }());
      $__export("MdInputContainer", MdInputContainer);
      Object.defineProperty(MdInputContainer, "annotations", {get: function() {
          return [new Directive({
            selector: 'md-input-container',
            lifecycle: [onAllChangesDone],
            hostProperties: {
              'inputHasValue': 'class.md-input-has-value',
              'inputHasFocus': 'class.md-input-focused'
            }
          })];
        }});
    }
  };
});

System.register("angular2_material/src/components/progress-circular/progress_circular", ["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/progress-circular/progress_circular";
  var Component,
      View,
      MdProgressCircular;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      View = $__m.View;
    }],
    execute: function() {
      MdProgressCircular = (function() {
        function MdProgressCircular() {}
        return ($traceurRuntime.createClass)(MdProgressCircular, {}, {});
      }());
      $__export("MdProgressCircular", MdProgressCircular);
      Object.defineProperty(MdProgressCircular, "annotations", {get: function() {
          return [new Component({selector: 'md-progress-circular'}), new View({template: "<div class=\"md-spinner-wrapper\">\n  <div class=\"md-inner\">\n    <div class=\"md-gap\"></div>\n    <div class=\"md-left\">\n      <div class=\"md-half-circle\"></div>\n    </div>\n    <div class=\"md-right\">\n      <div class=\"md-half-circle\"></div>\n    </div>\n  </div>\n</div>"})];
        }});
    }
  };
});

System.register("angular2_material/src/components/progress-linear/progress_linear", ["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view", "angular2/src/core/annotations_impl/di", "angular2/src/facade/lang", "angular2/src/facade/math"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/progress-linear/progress_linear";
  var Component,
      onChange,
      View,
      Attribute,
      isPresent,
      isBlank,
      Math,
      MdProgressLinear,
      Mode;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      onChange = $__m.onChange;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      Math = $__m.Math;
    }],
    execute: function() {
      MdProgressLinear = (function() {
        function MdProgressLinear(mode) {
          this.primaryBarTransform = '';
          this.secondaryBarTransform = '';
          this.role = 'progressbar';
          this.ariaValuemin = '0';
          this.ariaValuemax = '100';
          this.mode = isPresent(mode) ? mode : Mode.DETERMINATE;
        }
        return ($traceurRuntime.createClass)(MdProgressLinear, {
          get value() {
            return this.value_;
          },
          set value(v) {
            if (isPresent(v)) {
              this.value_ = MdProgressLinear.clamp(v);
            }
          },
          onChange: function(_) {
            if (this.mode == Mode['QUERY'] || this.mode == Mode['INDETERMINATE'] || isBlank(this.value)) {
              return ;
            }
            this.primaryBarTransform = this.transformForValue(this.value);
            if (this.mode == Mode['BUFFER']) {
              this.secondaryBarTransform = this.transformForValue(this.bufferValue);
            }
          },
          transformForValue: function(value) {
            var scale = value / 100;
            var translateX = (value - 100) / 2;
            return ("translateX(" + translateX + "%) scale(" + scale + ", 1)");
          }
        }, {clamp: function(v) {
            return Math.max(0, Math.min(100, v));
          }});
      }());
      $__export("MdProgressLinear", MdProgressLinear);
      Object.defineProperty(MdProgressLinear, "annotations", {get: function() {
          return [new Component({
            selector: 'md-progress-linear',
            lifecycle: [onChange],
            properties: {
              'value': 'value',
              'bufferValue': 'buffer-value'
            },
            hostProperties: {
              'role': 'attr.role',
              'ariaValuemin': 'attr.aria-valuemin',
              'ariaValuemax': 'attr.aria-valuemax',
              'value': 'attr.aria-valuenow'
            }
          }), new View({
            template: "<div class=\"md-progress-linear-container md-ready\">\n  <div class=\"md-progress-linear-dashed\"></div>\n  <div class=\"md-progress-linear-bar md-progress-linear-bar1\"\n      [style.transform]=\"secondaryBarTransform\"></div>\n  <div class=\"md-progress-linear-bar md-progress-linear-bar2\"\n      [style.transform]=\"primaryBarTransform\"></div>\n</div>\n",
            directives: []
          })];
        }});
      Object.defineProperty(MdProgressLinear, "parameters", {get: function() {
          return [[String, new Attribute('md-mode')]];
        }});
      Mode = {
        'DETERMINATE': 'determinate',
        'INDETERMINATE': 'indeterminate',
        'BUFFER': 'buffer',
        'QUERY': 'query'
      };
    }
  };
});

System.register("angular2_material/src/components/radio/radio_dispatcher", ["angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/radio/radio_dispatcher";
  var List,
      ListWrapper,
      MdRadioDispatcher;
  return {
    setters: [function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      MdRadioDispatcher = (function() {
        function MdRadioDispatcher() {
          this.listeners_ = [];
        }
        return ($traceurRuntime.createClass)(MdRadioDispatcher, {
          notify: function(name) {
            ListWrapper.forEach(this.listeners_, (function(f) {
              return f(name);
            }));
          },
          listen: function(listener) {
            ListWrapper.push(this.listeners_, listener);
          }
        }, {});
      }());
      $__export("MdRadioDispatcher", MdRadioDispatcher);
      Object.defineProperty(MdRadioDispatcher.prototype.notify, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

System.register("angular2_material/src/components/switcher/switch", ["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view", "angular2/src/core/annotations_impl/di", "angular2/src/facade/lang", "angular2_material/src/core/constants", "angular2/src/facade/browser"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/switcher/switch";
  var Component,
      View,
      Attribute,
      isPresent,
      KEY_SPACE,
      KeyboardEvent,
      NumberWrapper,
      MdSwitch;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      isPresent = $__m.isPresent;
      NumberWrapper = $__m.NumberWrapper;
    }, function($__m) {
      KEY_SPACE = $__m.KEY_SPACE;
    }, function($__m) {
      KeyboardEvent = $__m.KeyboardEvent;
    }],
    execute: function() {
      MdSwitch = (function() {
        function MdSwitch(tabindex) {
          this.role = 'checkbox';
          this.checked = false;
          this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
        }
        return ($traceurRuntime.createClass)(MdSwitch, {
          get disabled() {
            return this.disabled_;
          },
          set disabled(value) {
            this.disabled_ = isPresent(value) && value !== false;
          },
          onKeydown: function(event) {
            if (event.keyCode === KEY_SPACE) {
              event.preventDefault();
              this.toggle(event);
            }
          },
          toggle: function(event) {
            if (this.disabled) {
              event.stopPropagation();
              return ;
            }
            this.checked = !this.checked;
          }
        }, {});
      }());
      $__export("MdSwitch", MdSwitch);
      Object.defineProperty(MdSwitch, "annotations", {get: function() {
          return [new Component({
            selector: 'md-switch',
            properties: {
              'checked': 'checked',
              'disabled': 'disabled'
            },
            hostListeners: {'keydown': 'onKeydown($event)'},
            hostProperties: {
              'checked': 'attr.aria-checked',
              'disabled_': 'attr.aria-disabled',
              'role': 'attr.role'
            }
          }), new View({
            template: "\n<div (^click)=\"toggle($event)\">\n  <div class=\"md-switch-container\">\n    <div class=\"md-switch-bar\"></div>\n    <div class=\"md-switch-thumb-container\">\n      <div class=\"md-switch-thumb\"></div>\n    </div>\n  </div>\n  <div class=\"md-switch-label\"><content></content></div>\n</div>",
            directives: []
          })];
        }});
      Object.defineProperty(MdSwitch, "parameters", {get: function() {
          return [[String, new Attribute('tabindex')]];
        }});
      Object.defineProperty(MdSwitch.prototype.onKeydown, "parameters", {get: function() {
          return [[KeyboardEvent]];
        }});
    }
  };
});

System.register("angular2_material/src/components/checkbox/checkbox", ["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view", "angular2/src/core/annotations_impl/di", "angular2/src/facade/lang", "angular2_material/src/core/constants", "angular2/src/facade/browser"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/checkbox/checkbox";
  var Component,
      View,
      Attribute,
      isPresent,
      KEY_SPACE,
      KeyboardEvent,
      NumberWrapper,
      MdCheckbox;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      isPresent = $__m.isPresent;
      NumberWrapper = $__m.NumberWrapper;
    }, function($__m) {
      KEY_SPACE = $__m.KEY_SPACE;
    }, function($__m) {
      KeyboardEvent = $__m.KeyboardEvent;
    }],
    execute: function() {
      MdCheckbox = (function() {
        function MdCheckbox(tabindex) {
          this.role = 'checkbox';
          this.checked = false;
          this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
          this._disabled = false;
        }
        return ($traceurRuntime.createClass)(MdCheckbox, {
          get disabled() {
            return this._disabled;
          },
          set disabled(value) {
            this._disabled = isPresent(value) && value !== false;
          },
          onKeydown: function(event) {
            if (event.keyCode == KEY_SPACE) {
              event.preventDefault();
              this.toggle(event);
            }
          },
          toggle: function(event) {
            if (this.disabled) {
              event.stopPropagation();
              return ;
            }
            this.checked = !this.checked;
          }
        }, {});
      }());
      $__export("MdCheckbox", MdCheckbox);
      Object.defineProperty(MdCheckbox, "annotations", {get: function() {
          return [new Component({
            selector: 'md-checkbox',
            properties: {
              'checked': 'checked',
              'disabled': 'disabled'
            },
            hostListeners: {'keydown': 'onKeydown($event)'},
            hostProperties: {
              'tabindex': 'tabindex',
              'role': 'attr.role',
              'checked': 'attr.aria-checked',
              'disabled': 'attr.aria-disabled'
            }
          }), new View({
            template: "<div (^click)=\"toggle($event)\">\n  <div class=\"md-checkbox-container\">\n    <div class=\"md-checkbox-icon\"></div>\n  </div>\n  <div class=\"md-checkbox-label\"><content></content></div>\n</div>",
            directives: []
          })];
        }});
      Object.defineProperty(MdCheckbox, "parameters", {get: function() {
          return [[String, new Attribute('tabindex')]];
        }});
      Object.defineProperty(MdCheckbox.prototype.onKeydown, "parameters", {get: function() {
          return [[KeyboardEvent]];
        }});
    }
  };
});

System.register("angular2_material/src/components/radio/radio_button", ["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view", "angular2/src/core/annotations_impl/visibility", "angular2/src/core/annotations_impl/di", "angular2/src/di/annotations_impl", "angular2_material/src/components/radio/radio_dispatcher", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2_material/src/core/constants", "angular2/src/facade/browser"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/radio/radio_button";
  var Component,
      onChange,
      View,
      Parent,
      Ancestor,
      Attribute,
      Optional,
      MdRadioDispatcher,
      isPresent,
      StringWrapper,
      NumberWrapper,
      ObservableWrapper,
      EventEmitter,
      ListWrapper,
      KEY_UP,
      KEY_DOWN,
      KEY_SPACE,
      Event,
      KeyboardEvent,
      _uniqueIdCounter,
      MdRadioButton,
      MdRadioGroup;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      onChange = $__m.onChange;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Parent = $__m.Parent;
      Ancestor = $__m.Ancestor;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      Optional = $__m.Optional;
    }, function($__m) {
      MdRadioDispatcher = $__m.MdRadioDispatcher;
    }, function($__m) {
      isPresent = $__m.isPresent;
      StringWrapper = $__m.StringWrapper;
      NumberWrapper = $__m.NumberWrapper;
    }, function($__m) {
      ObservableWrapper = $__m.ObservableWrapper;
      EventEmitter = $__m.EventEmitter;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      KEY_UP = $__m.KEY_UP;
      KEY_DOWN = $__m.KEY_DOWN;
      KEY_SPACE = $__m.KEY_SPACE;
    }, function($__m) {
      Event = $__m.Event;
      KeyboardEvent = $__m.KeyboardEvent;
    }],
    execute: function() {
      _uniqueIdCounter = 0;
      MdRadioButton = (function() {
        function MdRadioButton(radioGroup, id, tabindex, radioDispatcher) {
          var $__0 = this;
          this.radioGroup = radioGroup;
          this.radioDispatcher = radioDispatcher;
          this.value = null;
          this.role = 'radio';
          this.checked = false;
          this.id = isPresent(id) ? id : ("md-radio-" + _uniqueIdCounter++);
          ;
          radioDispatcher.listen((function(name) {
            if (name == $__0.name) {
              $__0.checked = false;
            }
          }));
          if (isPresent(radioGroup)) {
            this.name = radioGroup.getName();
            this.radioGroup.register(this);
          }
          if (!isPresent(radioGroup)) {
            this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
          } else {
            this.tabindex = -1;
          }
        }
        return ($traceurRuntime.createClass)(MdRadioButton, {
          onChange: function(_) {
            if (isPresent(this.radioGroup)) {
              this.name = this.radioGroup.getName();
            }
          },
          isDisabled: function() {
            return this.disabled || (isPresent(this.disabled) && StringWrapper.equals(this.disabled, '')) || (isPresent(this.radioGroup) && this.radioGroup.disabled);
          },
          get disabled() {
            return this.disabled_;
          },
          set disabled(value) {
            this.disabled_ = isPresent(value) && value !== false;
          },
          select: function(event) {
            if (this.isDisabled()) {
              event.stopPropagation();
              return ;
            }
            this.radioDispatcher.notify(this.name);
            this.checked = true;
            if (isPresent(this.radioGroup)) {
              this.radioGroup.updateValue(this.value, this.id);
            }
          },
          onKeydown: function(event) {
            if (event.keyCode == KEY_SPACE) {
              event.preventDefault();
              this.select(event);
            }
          }
        }, {});
      }());
      $__export("MdRadioButton", MdRadioButton);
      Object.defineProperty(MdRadioButton, "annotations", {get: function() {
          return [new Component({
            selector: 'md-radio-button',
            lifecycle: [onChange],
            properties: {
              'id': 'id',
              'name': 'name',
              'value': 'value',
              'checked': 'checked',
              'disabled': 'disabled'
            },
            hostListeners: {'keydown': 'onKeydown($event)'},
            hostProperties: {
              'id': 'id',
              'tabindex': 'tabindex',
              'role': 'attr.role',
              'checked': 'attr.aria-checked',
              'disabled': 'attr.aria-disabled'
            }
          }), new View({
            template: "\n<!-- TODO(jelbourn): render the radio on either side of the content -->\n\n<label role=\"radio\"\n    [class.md-radio-checked]=\"checked\"\n    (^click)=\"select($event)\" >\n  <!-- The actual \`radio\` part of the control. -->\n  <div class=\"md-radio-container\">\n    <div class=\"md-radio-off\"></div>\n    <div class=\"md-radio-on\"></div>\n  </div>\n\n  <!-- The label for radio control. -->\n  <div class=\"md-radio-label\">\n      <content></content>\n  </div>\n</label>\n",
            directives: []
          })];
        }});
      Object.defineProperty(MdRadioButton, "parameters", {get: function() {
          return [[MdRadioGroup, new Optional(), new Parent()], [String, new Attribute('id')], [String, new Attribute('tabindex')], [MdRadioDispatcher]];
        }});
      Object.defineProperty(MdRadioButton.prototype.select, "parameters", {get: function() {
          return [[Event]];
        }});
      Object.defineProperty(MdRadioButton.prototype.onKeydown, "parameters", {get: function() {
          return [[KeyboardEvent]];
        }});
      MdRadioGroup = (function() {
        function MdRadioGroup(tabindex, disabled, radioDispatcher) {
          this.name_ = ("md-radio-group-" + _uniqueIdCounter++);
          this.radios_ = [];
          this.change = new EventEmitter();
          this.radioDispatcher = radioDispatcher;
          this.selectedRadioId = '';
          this.disabled_ = false;
          this.role = 'radiogroup';
          this.disabled = isPresent(disabled);
          this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
        }
        return ($traceurRuntime.createClass)(MdRadioGroup, {
          getName: function() {
            return this.name_;
          },
          get disabled() {
            return this.disabled_;
          },
          set disabled(value) {
            this.disabled_ = isPresent(value) && value !== false;
          },
          onChange: function(_) {
            var $__0 = this;
            this.disabled = isPresent(this.disabled) && this.disabled !== false;
            if (isPresent(this.value) && this.value != '') {
              this.radioDispatcher.notify(this.name_);
              ListWrapper.forEach(this.radios_, (function(radio) {
                if (radio.value == $__0.value) {
                  radio.checked = true;
                  $__0.selectedRadioId = radio.id;
                  $__0.activedescendant = radio.id;
                }
              }));
            }
          },
          updateValue: function(value, id) {
            this.value = value;
            this.selectedRadioId = id;
            this.activedescendant = id;
            ObservableWrapper.callNext(this.change, null);
          },
          register: function(radio) {
            ListWrapper.push(this.radios_, radio);
          },
          onKeydown: function(event) {
            if (this.disabled) {
              return ;
            }
            switch (event.keyCode) {
              case KEY_UP:
                this.stepSelectedRadio(-1);
                event.preventDefault();
                break;
              case KEY_DOWN:
                this.stepSelectedRadio(1);
                event.preventDefault();
                break;
            }
          },
          getSelectedRadioIndex: function() {
            for (var i = 0; i < this.radios_.length; i++) {
              if (this.radios_[i].id == this.selectedRadioId) {
                return i;
              }
            }
            return -1;
          },
          stepSelectedRadio: function(step) {
            var index = this.getSelectedRadioIndex() + step;
            if (index < 0 || index >= this.radios_.length) {
              return ;
            }
            var radio = this.radios_[index];
            if (radio.disabled) {
              this.stepSelectedRadio(step + (step < 0 ? -1 : 1));
              return ;
            }
            this.radioDispatcher.notify(this.name_);
            radio.checked = true;
            ObservableWrapper.callNext(this.change, null);
            this.value = radio.value;
            this.selectedRadioId = radio.id;
            this.activedescendant = radio.id;
          }
        }, {});
      }());
      $__export("MdRadioGroup", MdRadioGroup);
      Object.defineProperty(MdRadioGroup, "annotations", {get: function() {
          return [new Component({
            selector: 'md-radio-group',
            lifecycle: [onChange],
            events: ['change'],
            properties: {
              'disabled': 'disabled',
              'value': 'value'
            },
            hostListeners: {'^keydown': 'onKeydown($event)'},
            hostProperties: {
              'tabindex': 'tabindex',
              'role': 'attr.role',
              'disabled': 'attr.aria-disabled',
              'activedescendant': 'attr.aria-activedescendant'
            }
          }), new View({templateUrl: "<content></content>"})];
        }});
      Object.defineProperty(MdRadioGroup, "parameters", {get: function() {
          return [[String, new Attribute('tabindex')], [String, new Attribute('disabled')], [MdRadioDispatcher]];
        }});
      Object.defineProperty(MdRadioGroup.prototype.updateValue, "parameters", {get: function() {
          return [[assert.type.any], [assert.type.string]];
        }});
      Object.defineProperty(MdRadioGroup.prototype.register, "parameters", {get: function() {
          return [[MdRadioButton]];
        }});
      Object.defineProperty(MdRadioGroup.prototype.onKeydown, "parameters", {get: function() {
          return [[KeyboardEvent]];
        }});
    }
  };
});

System.register("angular2_material/src/components/button/button", ["angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/view", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/button/button";
  var Component,
      onChange,
      View,
      isPresent,
      MdButton,
      MdAnchor;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      onChange = $__m.onChange;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      MdButton = (function() {
        function MdButton() {}
        return ($traceurRuntime.createClass)(MdButton, {}, {});
      }());
      $__export("MdButton", MdButton);
      Object.defineProperty(MdButton, "annotations", {get: function() {
          return [new Component({selector: '[md-button]:not([href])'}), new View({templateUrl: 'angular2_material/src/components/button/button.html'})];
        }});
      MdAnchor = (function() {
        function MdAnchor() {}
        return ($traceurRuntime.createClass)(MdAnchor, {
          onClick: function(event) {
            if (isPresent(this.disabled) && this.disabled !== false) {
              event.preventDefault();
            }
          },
          onChange: function(_) {
            this.tabIndex = this.disabled ? -1 : 0;
          }
        }, {});
      }());
      $__export("MdAnchor", MdAnchor);
      Object.defineProperty(MdAnchor, "annotations", {get: function() {
          return [new Component({
            selector: '[md-button][href]',
            properties: {'disabled': 'disabled'},
            hostListeners: {'click': 'onClick($event)'},
            hostProperties: {'tabIndex': 'tabIndex'},
            lifecycle: [onChange]
          }), new View({template: "<span class=\"md-button-wrapper\"><content></content></span>"})];
        }});
    }
  };
});

System.register("angular2_material/src/components/dialog/dialog", ["angular2/angular2", "angular2/di", "angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/browser", "angular2_material/src/core/constants", "angular2/src/core/annotations_impl/annotations", "angular2/src/core/annotations_impl/visibility", "angular2/src/core/annotations_impl/view"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/src/components/dialog/dialog";
  var DynamicComponentLoader,
      ElementRef,
      ComponentRef,
      onDestroy,
      bind,
      Injector,
      ObservableWrapper,
      Promise,
      PromiseWrapper,
      isPresent,
      Type,
      DOM,
      MouseEvent,
      KeyboardEvent,
      KEY_ESC,
      Component,
      Directive,
      Parent,
      View,
      _nextDialogId,
      MdDialog,
      MdDialogRef,
      MdDialogConfig,
      MdDialogContainer,
      MdBackdrop,
      MdDialogContent;
  return {
    setters: [function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
      ElementRef = $__m.ElementRef;
      ComponentRef = $__m.ComponentRef;
      onDestroy = $__m.onDestroy;
    }, function($__m) {
      bind = $__m.bind;
      Injector = $__m.Injector;
    }, function($__m) {
      ObservableWrapper = $__m.ObservableWrapper;
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      Type = $__m.Type;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      MouseEvent = $__m.MouseEvent;
      KeyboardEvent = $__m.KeyboardEvent;
    }, function($__m) {
      KEY_ESC = $__m.KEY_ESC;
    }, function($__m) {
      Component = $__m.Component;
      Directive = $__m.Directive;
    }, function($__m) {
      Parent = $__m.Parent;
    }, function($__m) {
      View = $__m.View;
    }],
    execute: function() {
      _nextDialogId = 0;
      MdDialog = (function() {
        function MdDialog(loader) {
          this.componentLoader = loader;
        }
        return ($traceurRuntime.createClass)(MdDialog, {
          open: function(type, elementRef, parentInjector) {
            var options = arguments[3] !== (void 0) ? arguments[3] : null;
            var $__0 = this;
            var config = isPresent(options) ? options : new MdDialogConfig();
            var dialogElement = this._createHostElement();
            DOM.appendChild(DOM.query('body'), dialogElement);
            DOM.addClass(dialogElement, 'md-dialog');
            DOM.setAttribute(dialogElement, 'tabindex', '0');
            if (isPresent(config.width)) {
              DOM.setStyle(dialogElement, 'width', config.width);
            }
            if (isPresent(config.height)) {
              DOM.setStyle(dialogElement, 'height', config.height);
            }
            var dialogRef = new MdDialogRef();
            var dialogRefBinding = bind(MdDialogRef).toValue(dialogRef);
            var contentInjector = parentInjector.resolveAndCreateChild([dialogRefBinding]);
            var backdropRefPromise = this._openBackdrop(elementRef, contentInjector);
            return this.componentLoader.loadIntoNewLocation(MdDialogContainer, elementRef, (":document#" + dialogElement.id)).then((function(containerRef) {
              dialogRef.containerRef = containerRef;
              return $__0.componentLoader.loadNextToExistingLocation(type, containerRef.instance.contentRef, contentInjector).then((function(contentRef) {
                dialogRef.contentRef = contentRef;
                containerRef.instance.dialogRef = dialogRef;
                backdropRefPromise.then((function(backdropRef) {
                  dialogRef.whenClosed.then((function(_) {
                    backdropRef.dispose();
                  }));
                }));
                return dialogRef;
              }));
            }));
          },
          _openBackdrop: function(elementRef, injector) {
            var backdropElement = this._createHostElement();
            DOM.addClass(backdropElement, 'md-backdrop');
            DOM.appendChild(DOM.query('body'), backdropElement);
            return this.componentLoader.loadIntoNewLocation(MdBackdrop, elementRef, (":document#" + backdropElement.id), injector);
          },
          _createHostElement: function() {
            var hostElement = DOM.createElement('div');
            hostElement.id = ("mdDialog" + _nextDialogId++);
            return hostElement;
          },
          alert: function(message, okMessage) {
            throw "Not implemented";
          },
          confirm: function(message, okMessage, cancelMessage) {
            throw "Not implemented";
          }
        }, {});
      }());
      $__export("MdDialog", MdDialog);
      Object.defineProperty(MdDialog, "parameters", {get: function() {
          return [[DynamicComponentLoader]];
        }});
      Object.defineProperty(MdDialog.prototype.open, "parameters", {get: function() {
          return [[Type], [ElementRef], [Injector], [MdDialogConfig]];
        }});
      Object.defineProperty(MdDialog.prototype._openBackdrop, "parameters", {get: function() {
          return [[ElementRef], [Injector]];
        }});
      Object.defineProperty(MdDialog.prototype.alert, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(MdDialog.prototype.confirm, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      MdDialogRef = (function() {
        function MdDialogRef() {
          this._contentRef = null;
          this.containerRef = null;
          this.isClosed = false;
          this.contentRefDeferred = PromiseWrapper.completer();
          this.whenClosedDeferred = PromiseWrapper.completer();
        }
        return ($traceurRuntime.createClass)(MdDialogRef, {
          set contentRef(value) {
            this._contentRef = value;
            this.contentRefDeferred.resolve(value);
          },
          get instance() {
            if (isPresent(this._contentRef)) {
              return this._contentRef.instance;
            }
            throw "Cannot access dialog component instance *from* that component's constructor.";
          },
          get whenClosed() {
            return this.whenClosedDeferred.promise;
          },
          close: function() {
            var result = arguments[0] !== (void 0) ? arguments[0] : null;
            var $__0 = this;
            this.contentRefDeferred.promise.then((function(_) {
              if (!$__0.isClosed) {
                $__0.isClosed = true;
                $__0.containerRef.dispose();
                $__0.whenClosedDeferred.resolve(result);
              }
            }));
          }
        }, {});
      }());
      $__export("MdDialogRef", MdDialogRef);
      Object.defineProperty(Object.getOwnPropertyDescriptor(MdDialogRef.prototype, "contentRef").set, "parameters", {get: function() {
          return [[ComponentRef]];
        }});
      Object.defineProperty(MdDialogRef.prototype.close, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      MdDialogConfig = (function() {
        function MdDialogConfig() {
          this.width = null;
          this.height = null;
        }
        return ($traceurRuntime.createClass)(MdDialogConfig, {}, {});
      }());
      $__export("MdDialogConfig", MdDialogConfig);
      MdDialogContainer = (function() {
        function MdDialogContainer() {
          this.contentRef = null;
          this.dialogRef = null;
        }
        return ($traceurRuntime.createClass)(MdDialogContainer, {
          wrapFocus: function() {},
          documentKeypress: function(event) {
            if (event.keyCode == KEY_ESC) {
              this.dialogRef.close();
            }
          }
        }, {});
      }());
      Object.defineProperty(MdDialogContainer, "annotations", {get: function() {
          return [new Component({
            selector: 'md-dialog-container',
            hostListeners: {'body:^keydown': 'documentKeypress($event)'}
          }), new View({
            template: "<style>\n  .md-dialog {\n    position: absolute;\n    z-index: 80;\n\n    /** Center the dialog. */\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n\n    width: 300px;\n    height: 300px;\n\n    background-color: white;\n    border: 1px solid black;\n    box-shadow: 0 4px 4px;;\n\n    padding: 20px;\n  }\n\n  .md-backdrop {\n    position: absolute;\n    top:0 ;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.12);\n  }\n</style>\n\n<md-dialog-content></md-dialog-content>\n<div tabindex=\"0\" (focus)=\"wrapFocus()\"></div>\n\n",
            directives: [MdDialogContent]
          })];
        }});
      Object.defineProperty(MdDialogContainer.prototype.documentKeypress, "parameters", {get: function() {
          return [[KeyboardEvent]];
        }});
      MdBackdrop = (function() {
        function MdBackdrop(dialogRef) {
          this.dialogRef = dialogRef;
        }
        return ($traceurRuntime.createClass)(MdBackdrop, {onClick: function() {
            this.dialogRef.close();
          }}, {});
      }());
      Object.defineProperty(MdBackdrop, "annotations", {get: function() {
          return [new Component({
            selector: 'md-backdrop',
            hostListeners: {'click': 'onClick()'}
          }), new View({template: ''})];
        }});
      Object.defineProperty(MdBackdrop, "parameters", {get: function() {
          return [[MdDialogRef]];
        }});
      MdDialogContent = (function() {
        function MdDialogContent(dialogContainer, elementRef) {
          dialogContainer.contentRef = elementRef;
        }
        return ($traceurRuntime.createClass)(MdDialogContent, {}, {});
      }());
      Object.defineProperty(MdDialogContent, "annotations", {get: function() {
          return [new Directive({selector: 'md-dialog-content'})];
        }});
      Object.defineProperty(MdDialogContent, "parameters", {get: function() {
          return [[MdDialogContainer, new Parent()], [ElementRef]];
        }});
    }
  };
});

System.register("angular2_material/material", ["angular2_material/src/components/button/button", "angular2_material/src/components/checkbox/checkbox", "angular2_material/src/components/dialog/dialog", "angular2_material/src/components/grid_list/grid_list", "angular2_material/src/components/input/input", "angular2_material/src/components/progress-circular/progress_circular", "angular2_material/src/components/progress-linear/progress_linear", "angular2_material/src/components/radio/radio_button", "angular2_material/src/components/radio/radio_dispatcher", "angular2_material/src/components/switcher/switch"], function($__export) {
  "use strict";
  var __moduleName = "angular2_material/material";
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  var $__exportNames = {};
  return {
    setters: [function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }],
    execute: function() {}
  };
});

//# sourceMappingURL=angular2_material.dev.js.map