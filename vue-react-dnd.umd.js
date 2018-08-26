(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('dnd-core'), require('disposables'), require('invariant')) :
  typeof define === 'function' && define.amd ? define(['exports', 'dnd-core', 'disposables', 'invariant'], factory) :
  (factory((global.VueReactDnd = {}),global.dndCore,global.disposables,global.invariant));
}(this, (function (exports,dndCore,disposables,invariant) { 'use strict';

  invariant = invariant && invariant.hasOwnProperty('default') ? invariant['default'] : invariant;

  //

  var script = {
    name: 'DragDropContextProvider',
    inject: {
      window: { default: window }
    },
    props: ['backend', 'backendWindow'],
    provide: function provide () {
      return {
        dragDropManager: new dndCore.DragDropManager(this.getBackend(), {
          window: this.getWindow()
        })
      }
    },
    methods: {
      getBackend: function getBackend () {
        var backend = this.backend;
        if (typeof backend === 'object' && typeof backend.default === 'function') {
          backend = backend.default;
        }

        return backend
      },
      getWindow: function getWindow () {
        if (this.backendWindow) {
          return this.backendWindow
        } else if (this.window) {
          return this.window
        } else {
          return window
        }
      }
    }
  };

  /* script */
              var __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_vm._t("default")], 2)
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(
      template, style, script$$1,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "/media/usb0/dev/js/vue-react-dnd/src/DragDropContextProvider.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) { component.functional = true; }
      }

      component._scopeId = scope;

      return component
    }
    /* style inject */
    function __vue_create_injector__() {
      var head = document.head || document.getElementsByTagName('head')[0];
      var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
      var isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          var code = css.source;
          var index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            var el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) { el.setAttribute('media', css.media); }
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index]) { style.element.removeChild(nodes[index]); }
            if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
            else { style.element.appendChild(textNode); }
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var DragDropContextProvider = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      __vue_create_injector__,
      undefined
    );

  function registerTarget (type, target, manager) {
    var registry = manager.getRegistry();
    var targetId = registry.addTarget(type, target);

    function unregisterTarget () {
      registry.removeTarget(targetId);
    }

    return {
      handlerId: targetId,
      unregister: unregisterTarget
    }
  }

  function createTargetFactory (spec, context) {
    var Target = function Target (monitor) {
      this.monitor = monitor;
    };

    Target.prototype.receiveMonitor = function receiveMonitor (monitor) {
      this.monitor = monitor;
    };

    Target.prototype.canDrop = function canDrop () {
      if (!spec.canDrop) {
        return true
      }

      var f = spec.canDrop.bind(context);

      return f(this.monitor)
    };

    Target.prototype.hover = function hover () {
      if (!spec.hover) {
        return
      }

      var f = spec.hover.bind(context);

      f(this.monitor);
    };

    Target.prototype.drop = function drop () {
      if (!spec.drop) {
        return undefined
      }

      var f = spec.drop.bind(context);

      return f(this.monitor)
    };

    return function createTarget (monitor) {
      return new Target(monitor)
    }
  }

  var TargetMonitor = function TargetMonitor (manager) {
    this.internalMonitor = manager.getMonitor();
  };

  TargetMonitor.prototype.receiveHandlerId = function receiveHandlerId (targetId) {
    this.targetId = targetId;
  };

  TargetMonitor.prototype.canDrop = function canDrop () {
    try {
      return this.internalMonitor.canDropOnTarget(this.targetId)
    } finally {
    }
  };

  TargetMonitor.prototype.isOver = function isOver (options) {
    return this.internalMonitor.isOverTarget(this.targetId, options)
  };

  TargetMonitor.prototype.getItemType = function getItemType () {
    return this.internalMonitor.getItemType()
  };

  TargetMonitor.prototype.getItem = function getItem () {
    return this.internalMonitor.getItem()
  };

  TargetMonitor.prototype.getDropResult = function getDropResult () {
    return this.internalMonitor.getDropResult()
  };

  TargetMonitor.prototype.didDrop = function didDrop () {
    return this.internalMonitor.didDrop()
  };

  TargetMonitor.prototype.getInitialClientOffset = function getInitialClientOffset () {
    return this.internalMonitor.getInitialClientOffset()
  };

  TargetMonitor.prototype.getInitialSourceClientOffset = function getInitialSourceClientOffset () {
    return this.internalMonitor.getInitialSourceClientOffset()
  };

  TargetMonitor.prototype.getSourceClientOffset = function getSourceClientOffset () {
    return this.internalMonitor.getSourceClientOffset()
  };

  TargetMonitor.prototype.getClientOffset = function getClientOffset () {
    return this.internalMonitor.getClientOffset()
  };

  TargetMonitor.prototype.getDifferenceFromInitialOffset = function getDifferenceFromInitialOffset () {
    return this.internalMonitor.getDifferenceFromInitialOffset()
  };

  function createTargetMonitor (manager) {
    return new TargetMonitor(manager)
  }

  var shallowEqual = function (objA, objB) {
    if (objA === objB) {
      return true
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false
    }

    // Test for A's keys different from B.
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var i = 0; i < keysA.length; i += 1) {
      if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false
      }

      var valA = objA[keysA[i]];
      var valB = objB[keysA[i]];

      if (valA !== valB) {
        return false
      }
    }

    return true
  };

  function areOptionsEqual (nextOptions, currentOptions) {
    if (currentOptions === nextOptions) {
      return true
    }

    return (
      currentOptions !== null &&
              nextOptions !== null &&
              shallowEqual(currentOptions, nextOptions)
    )
  }

  function createTargetConnector (backend) {
    var currentHandlerId;

    var currentDropTargetNode;
    var currentDropTargetOptions;
    var disconnectCurrentDropTarget;

    function reconnectDropTarget () {
      if (disconnectCurrentDropTarget) {
        disconnectCurrentDropTarget();
        disconnectCurrentDropTarget = null;
      }

      if (currentHandlerId && currentDropTargetNode) {
        disconnectCurrentDropTarget = backend.connectDropTarget(
          currentHandlerId,
          currentDropTargetNode,
          currentDropTargetOptions
        );
      }
    }

    function receiveHandlerId (handlerId) {
      if (handlerId === currentHandlerId) {
        return
      }

      currentHandlerId = handlerId;
      reconnectDropTarget();
    }

    var hooks = {
      dropTarget: function connectDropTarget (node, options) {
        if (
          node === currentDropTargetNode &&
                      areOptionsEqual(options, currentDropTargetOptions)
        ) {
          return
        }

        currentDropTargetNode = node;
        currentDropTargetOptions = options;

        reconnectDropTarget();
      }
    };

    return {
      receiveHandlerId: receiveHandlerId,
      hooks: hooks
    }
  }

  function arrayEqual (a, b) {
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
      var equal = true;
      for (var i = 0; i < a.length; i++) {
        equal = equal && a[i] === b[i];
      }
      return equal
    } else {
      return a === b
    }
  }

  var DropTarget = {
    inject: ['dragDropManager'],

    data: function data () {
      var targetMonitor = createTargetMonitor(this.dragDropManager);
      var createTarget = createTargetFactory(this.$options.dropTarget.specs, this);

      return {
        dropTargetHandler: createTarget(targetMonitor),
        dropTargetHandlerMonitor: targetMonitor,
        dropTargetHandlerConnector: createTargetConnector(this.dragDropManager.getBackend()),
        dropTargetDisposable: new disposables.SerialDisposable(),
        isDropTargetCurrentlyMounted: false,
        currentDropTargetType: null,
        dropTargetHandlerId: null
      }
    },

    mounted: function mounted () {
      this.isDropTargetCurrentlyMounted = true;
      this.dropTargetDisposable = new disposables.SerialDisposable();
      this.currentDropTargetType = null;

      this.receiveDropTargetProps(this.$props);
      this.handleDropTargetChange();
    },

    beforeUpdate: function beforeUpdate () {
      this.receiveDropTargetProps(this.$props);
      this.handleDropTargetChange();
    },

    beforeDestroy: function beforeDestroy () {
      this.disposeDropTarget();
      this.isDropTargetCurrentlyMounted = false;
    },

    directives: {
      dropTarget: {
        inserted: function (el, binding, vnode) {
          vnode.context.dropTargetHandlerConnector.hooks.dropTarget(el);
        },
        componentUpdated: function (el, binding, vnode) {
          vnode.context.dropTargetHandlerConnector.hooks.dropTarget(el);
        }
      }
    },

    methods: {
      disposeDropTarget: function disposeDropTarget () {
        this.dropTargetDisposable.dispose();
        this.dropTargetHandlerConnector.receiveHandlerId(null);
      },

      handleDropTargetChange: function handleDropTargetChange () {
        if (this.$options && this.$options.dropTarget && this.$options.dropTarget.collect) {
          var f = this.$options.dropTarget.collect.bind(this);
          f(this.dropTargetHandlerConnector.hooks, this.dropTargetHandlerMonitor);
        }
      },

      receiveDropTargetProps: function receiveDropTargetProps () {
        var typeF = this.$options.dropTarget.type.bind(this);
        this.receiveDropTargetType(typeF());
      },

      receiveDropTargetType: function receiveDropTargetType (type) {
        if (arrayEqual(type, this.currentDropTargetType)) {
          return
        }

        this.currentDropTargetType = type;

        var ref = registerTarget(
          type,
          this.dropTargetHandler,
          this.dragDropManager
        );
        var handlerId = ref.handlerId;
        var unregister = ref.unregister;

        this.dropTargetHandlerId = handlerId;
        this.dropTargetHandlerMonitor.receiveHandlerId(handlerId);
        this.dropTargetHandlerConnector.receiveHandlerId(handlerId);

        var globalMonitor = this.dragDropManager.getMonitor();
        var unsubscribe = globalMonitor.subscribeToStateChange(
          this.handleDropTargetChange,
          { handlerIds: [handlerId] }
        );

        this.dropTargetDisposable.setDisposable(
          new disposables.CompositeDisposable(
            new disposables.Disposable(unsubscribe),
            new disposables.Disposable(unregister)
          )
        );
      }
    }
  };

  function registerSource (type, source, manager) {
    var registry = manager.getRegistry();
    var sourceId = registry.addSource(type, source);

    function unregisterSource () {
      registry.removeSource(sourceId);
    }

    return {
      handlerId: sourceId,
      unregister: unregisterSource
    }
  }

  function createSourceFactory (spec, context) {
    var Source = function Source (monitor) {
      this.monitor = monitor;
    };

    Source.prototype.canDrag = function canDrag () {
      if (!spec.canDrag) {
        return true
      }

      var f = spec.canDrag.bind(context);

      return f(this.monitor)
    };

    Source.prototype.isDragging = function isDragging (globalMonitor, sourceId) {
      if (!spec.isDragging) {
        return sourceId === globalMonitor.getSourceId()
      }

      var f = spec.isDragging.bind(context);

      return f(this.monitor)
    };

    Source.prototype.beginDrag = function beginDrag () {
      var f = spec.beginDrag.bind(context);

      return f(this.monitor, this.component)
    };

    Source.prototype.endDrag = function endDrag () {
      if (!spec.endDrag) {
        return
      }

      var f = spec.endDrag.bind(context);

      f(this.monitor);
    };

    return function createSource (monitor) {
      return new Source(monitor)
    }
  }

  var SourceMonitor = function SourceMonitor (manager) {
    this.internalMonitor = manager.getMonitor();
  };

  SourceMonitor.prototype.receiveHandlerId = function receiveHandlerId (sourceId) {
    this.sourceId = sourceId;
  };

  SourceMonitor.prototype.canDrag = function canDrag () {
    try {
      return this.internalMonitor.canDragSource(this.sourceId)
    } finally {
    }
  };

  SourceMonitor.prototype.isDragging = function isDragging () {
    try {
      return this.internalMonitor.isDraggingSource(this.sourceId)
    } finally {
    }
  };

  SourceMonitor.prototype.getItemType = function getItemType () {
    return this.internalMonitor.getItemType()
  };

  SourceMonitor.prototype.getItem = function getItem () {
    return this.internalMonitor.getItem()
  };

  SourceMonitor.prototype.getDropResult = function getDropResult () {
    return this.internalMonitor.getDropResult()
  };

  SourceMonitor.prototype.didDrop = function didDrop () {
    return this.internalMonitor.didDrop()
  };

  SourceMonitor.prototype.getInitialClientOffset = function getInitialClientOffset () {
    return this.internalMonitor.getInitialClientOffset()
  };

  SourceMonitor.prototype.getInitialSourceClientOffset = function getInitialSourceClientOffset () {
    return this.internalMonitor.getInitialSourceClientOffset()
  };

  SourceMonitor.prototype.getSourceClientOffset = function getSourceClientOffset () {
    return this.internalMonitor.getSourceClientOffset()
  };

  SourceMonitor.prototype.getClientOffset = function getClientOffset () {
    return this.internalMonitor.getClientOffset()
  };

  SourceMonitor.prototype.getDifferenceFromInitialOffset = function getDifferenceFromInitialOffset () {
    return this.internalMonitor.getDifferenceFromInitialOffset()
  };

  function createSourceMonitor (manager) {
    return new SourceMonitor(manager)
  }

  function createSourceConnector (backend) {
    var currentHandlerId;

    var currentDragSourceNode;
    var currentDragSourceOptions;
    var disconnectCurrentDragSource;

    var currentDragPreviewNode;
    var currentDragPreviewOptions;
    var disconnectCurrentDragPreview;

    function reconnectDragSource () {
      if (disconnectCurrentDragSource) {
        disconnectCurrentDragSource();
        disconnectCurrentDragSource = null;
      }

      if (currentHandlerId && currentDragSourceNode) {
        disconnectCurrentDragSource = backend.connectDragSource(
          currentHandlerId,
          currentDragSourceNode,
          currentDragSourceOptions
        );
      }
    }

    function reconnectDragPreview () {
      if (disconnectCurrentDragPreview) {
        disconnectCurrentDragPreview();
        disconnectCurrentDragPreview = null;
      }

      if (currentHandlerId && currentDragPreviewNode) {
        disconnectCurrentDragPreview = backend.connectDragPreview(
          currentHandlerId,
          currentDragPreviewNode,
          currentDragPreviewOptions
        );
      }
    }

    function receiveHandlerId (handlerId) {
      if (handlerId === currentHandlerId) {
        return
      }

      currentHandlerId = handlerId;
      reconnectDragSource();
      reconnectDragPreview();
    }

    var hooks = {
      dragSource: function connectDragSource (node, options) {
        if (
          node === currentDragSourceNode &&
                      areOptionsEqual(options, currentDragSourceOptions)
        ) {
          return
        }

        currentDragSourceNode = node;
        currentDragSourceOptions = options;

        reconnectDragSource();
      },

      dragPreview: function connectDragPreview (node, options) {
        if (
          node === currentDragPreviewNode &&
                      areOptionsEqual(options, currentDragPreviewOptions)
        ) {
          return
        }

        currentDragPreviewNode = node;
        currentDragPreviewOptions = options;

        reconnectDragPreview();
      }
    };

    return {
      receiveHandlerId: receiveHandlerId,
      hooks: hooks
    }
  }

  var DragSource = {
    inject: ['dragDropManager'],

    data: function data () {
      var sourceMonitor = createSourceMonitor(this.dragDropManager);
      var createSource = createSourceFactory(this.$options.dragSource.specs, this);

      return {
        dragSourceHandler: createSource(sourceMonitor),
        dragSourceHandlerMonitor: sourceMonitor,
        dragSourceHandlerConnector: createSourceConnector(this.dragDropManager.getBackend()),
        dragSourceDisposable: new disposables.SerialDisposable(),
        isDragSourceCurrentlyMounted: false,
        currentDragSourceType: null,
        dragSourceHandlerId: null
      }
    },

    mounted: function mounted () {
      this.isDragSourceCurrentlyMounted = true;
      this.dragSourceDisposable = new disposables.SerialDisposable();
      this.currentDragSourceType = null;

      this.receiveDragSourceProps();
      this.handleDragSourceChange();
    },

    beforeUpdate: function beforeUpdate () {
      this.receiveDragSourceProps();
      this.handleDragSourceChange();
    },

    beforeDestroy: function beforeDestroy () {
      this.disposeDragSource();
      this.isDragSourceCurrentlyMounted = false;
    },

    directives: {
      dragSource: {
        inserted: function (el, binding, vnode) {
          vnode.context.dragSourceHandlerConnector.hooks.dragSource(el);
        },
        componentUpdated: function (el, binding, vnode) {
          vnode.context.dragSourceHandlerConnector.hooks.dragSource(el);
        }
      },
      dragPreview: {
        inserted: function (el, binding, vnode) {
          vnode.context.dragSourceHandlerConnector.hooks.dragPreview(el);
        },
        componentUpdated: function (el, binding, vnode) {
          vnode.context.dragSourceHandlerConnector.hooks.dragPreview(el);
        }
      }
    },

    methods: {
      disposeDragSource: function disposeDragSource () {
        this.dragSourceDisposable.dispose();
        this.dragSourceHandlerConnector.receiveHandlerId(null);
      },

      handleDragSourceChange: function handleDragSourceChange () {
        if (this.$options && this.$options.dragSource && this.$options.dragSource.collect) {
          var f = this.$options.dragSource.collect.bind(this);
          f(this.dragSourceHandlerConnector.hooks, this.dragSourceHandlerMonitor);
        }
      },

      receiveDragSourceProps: function receiveDragSourceProps () {
        var typeF = this.$options.dragSource.type.bind(this);
        this.receiveDragSourceType(typeF());
      },

      receiveDragSourceType: function receiveDragSourceType (type) {
        if (arrayEqual(type, this.currentDragSourceType)) {
          return
        }

        this.currentDragSourceType = type;

        var ref = registerSource(
          type,
          this.dragSourceHandler,
          this.dragDropManager
        );
        var handlerId = ref.handlerId;
        var unregister = ref.unregister;

        this.dragSourceHandlerId = handlerId;
        this.dragSourceHandlerMonitor.receiveHandlerId(handlerId);
        this.dragSourceHandlerConnector.receiveHandlerId(handlerId);

        var globalMonitor = this.dragDropManager.getMonitor();
        var unsubscribe = globalMonitor.subscribeToStateChange(
          this.handleDragSourceChange,
          { handlerIds: [handlerId] }
        );

        this.dragSourceDisposable.setDisposable(
          new disposables.CompositeDisposable(
            new disposables.Disposable(unsubscribe),
            new disposables.Disposable(unregister)
          )
        );
      }
    }
  };

  function DragDropContext (backendOrModule, context) {
    if ( context === void 0 ) context = {};

    var backend = backendOrModule;
    if (typeof backend === 'object' && typeof backend.default === 'function') {
      backend = backend.default;
    }

    return {
      provide: {
        dragDropManager: new dndCore.DragDropManager(backend, context)
      }
    }
  }

  var DragLayer = {
    inject: ['dragDropManager'],

    data: function data () {
      return {
        dragLayerUnsubscribeFromOffsetChange: null,
        dragLayerUnsubscribeFromStateChange: null,
        dragLayerIsCurrentlyMounted: false
      }
    },

    mounted: function mounted () {
      this.dragLayerIsCurrentlyMounted = true;

      var monitor = this.dragDropManager.getMonitor();
      this.dragLayerUnsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(
        this.dragLayerHandleChange
      );

      this.dragLayerUnsubscribeFromStateChange = monitor.subscribeToStateChange(
        this.dragLayerHandleChange
      );

      this.dragLayerHandleChange();
    },

    beforeDestroy: function beforeDestroy () {
      this.dragLayerIsCurrentlyMounted = false;
      this.dragLayerUnsubscribeFromOffsetChange();
      this.dragLayerUnsubscribeFromStateChange();
    },

    methods: {
      dragLayerHandleChange: function dragLayerHandleChange () {
        if (!this.dragLayerIsCurrentlyMounted) {
          return
        }

        if (this.$options && this.$options.dragLayer && this.$options.dragLayer.collect) {
          var f = this.$options.dragLayer.collect.bind(this);
          f(this.dragDropManager.getMonitor());
        }
      }
    }
  };

  // Import vue component

  // Declare install function executed by Vue.use()
  function install (Vue) {
    if (install.installed) { return }
    install.installed = true;
    Vue.component('DragDropContextProvider', DragDropContextProvider);
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  // To allow use as module (npm/webpack/etc.) export component
  var index = {
    DragDropContextProvider: DragDropContextProvider,
    DropTarget: DropTarget,
    DragSource: DragSource,
    DragDropContext: DragDropContext,
    DragLayer: DragLayer
  };

  exports.install = install;
  exports.default = index;
  exports.DragDropContextProvider = DragDropContextProvider;
  exports.DropTarget = DropTarget;
  exports.DragSource = DragSource;
  exports.DragDropContext = DragDropContext;
  exports.DragLayer = DragLayer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
