/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/objects/System.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/objects/ExecutionStack.js":
/*!**************************************!*\
  !*** ./js/objects/ExecutionStack.js ***!
  \**************************************/
/*! exports provided: ExecutionStack, ActivationContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExecutionStack", function() { return ExecutionStack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivationContext", function() { return ActivationContext; });
/**
 * ExecutionStack
 * ---------------------------------
 * I am an object that manages a stack of
 * ActivationContext objects.
 * I am designed to be used by System as the
 * global execution stack.
 *
 */

class ExecutionStack {
    constructor(){
        this._stack = [];
        this._globals = {};

        // Bound methods
        this.pop = this.pop.bind(this);
        this.push = this.push.bind(this);
        this.setGlobal = this.setGlobal.bind(this);
        this.getGlobal = this.getGlobal.bind(this);
    }

    pop(){
        if(!this._stack.length){
            return null;
        }
        return this._stack.pop();
    }

    push(anActivation){
        this._stack.push(anActivation);
    }

    setGlobal(varName, value){
        this._globals[varName] = value;
    }

    getGlobal(varName){
        return this._globals[varName];
    }

    get current(){
        if(!this._stack.length){
            return null;
        }
        return this._stack[this._stack.length - 1];
    }

    get previous(){
        if(!this._stack.length >= 2){
            return null;
        }
        return this._stack[this._stack.length - 2];
    }
};

class ActivationContext {
    constructor(messageName, part, incomingMessage, handlerFunction){
        this.part = part;
        this.messageName = messageName;
        this.message = incomingMessage;
        this.handlerFunction = handlerFunction;
        this._locals = {};

        // Bound methods
        this.get = this.get.bind(this);
        this.getLocal = this.getLocal.bind(this);
        this.setLocal = this.setLocal.bind(this);
    }

    get(varName){
        let localValue = this.getLocal(varName);
        if(localValue !== undefined){
            return localValue;
        };
        // otherwise try to return a global
        // variable
        return window.System.executionStack.getGlobal(varName);
    }

    getLocal(varName){
        return this._locals[varName];
    }

    setLocal(varName, value){
        this._locals[varName] = value;
    }
}




/***/ }),

/***/ "./js/objects/System.js":
/*!******************************!*\
  !*** ./js/objects/System.js ***!
  \******************************/
/*! exports provided: System, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "System", function() { return System; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return System; });
/* harmony import */ var _parts_Card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts/Card.js */ "./js/objects/parts/Card.js");
/* harmony import */ var _parts_Stack_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts/Stack.js */ "./js/objects/parts/Stack.js");
/* harmony import */ var _parts_Button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parts/Button.js */ "./js/objects/parts/Button.js");
/* harmony import */ var _parts_Field_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parts/Field.js */ "./js/objects/parts/Field.js");
/* harmony import */ var _parts_WorldStack_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parts/WorldStack.js */ "./js/objects/parts/WorldStack.js");
/* harmony import */ var _parts_Window_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parts/Window.js */ "./js/objects/parts/Window.js");
/* harmony import */ var _parts_Drawing_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parts/Drawing.js */ "./js/objects/parts/Drawing.js");
/* harmony import */ var _parts_Audio_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./parts/Audio.js */ "./js/objects/parts/Audio.js");
/* harmony import */ var _parts_Browser_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parts/Browser.js */ "./js/objects/parts/Browser.js");
/* harmony import */ var _parts_Resource_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./parts/Resource.js */ "./js/objects/parts/Resource.js");
/* harmony import */ var _parts_Image_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./parts/Image.js */ "./js/objects/parts/Image.js");
/* harmony import */ var _parts_Area_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./parts/Area.js */ "./js/objects/parts/Area.js");
/* harmony import */ var _views_WorldView_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./views/WorldView.js */ "./js/objects/views/WorldView.js");
/* harmony import */ var _views_StackView_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./views/StackView.js */ "./js/objects/views/StackView.js");
/* harmony import */ var _views_ButtonView_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./views/ButtonView.js */ "./js/objects/views/ButtonView.js");
/* harmony import */ var _views_CardView_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./views/CardView.js */ "./js/objects/views/CardView.js");
/* harmony import */ var _views_WindowView__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./views/WindowView */ "./js/objects/views/WindowView.js");
/* harmony import */ var _views_FieldView_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./views/FieldView.js */ "./js/objects/views/FieldView.js");
/* harmony import */ var _views_drawing_DrawingView_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./views/drawing/DrawingView.js */ "./js/objects/views/drawing/DrawingView.js");
/* harmony import */ var _views_ImageView_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./views/ImageView.js */ "./js/objects/views/ImageView.js");
/* harmony import */ var _views_AreaView_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./views/AreaView.js */ "./js/objects/views/AreaView.js");
/* harmony import */ var _views_AudioView_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./views/AudioView.js */ "./js/objects/views/AudioView.js");
/* harmony import */ var _views_BrowserView_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./views/BrowserView.js */ "./js/objects/views/BrowserView.js");
/* harmony import */ var _views_ResourceView_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./views/ResourceView.js */ "./js/objects/views/ResourceView.js");
/* harmony import */ var _views_Halo_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./views/Halo.js */ "./js/objects/views/Halo.js");
/* harmony import */ var _views_navigator_Navigator_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./views/navigator/Navigator.js */ "./js/objects/views/navigator/Navigator.js");
/* harmony import */ var _views_editors_Editor_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./views/editors/Editor.js */ "./js/objects/views/editors/Editor.js");
/* harmony import */ var ohm_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ohm-js */ "./node_modules/ohm-js/src/main.js");
/* harmony import */ var ohm_js__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(ohm_js__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../ohm/interpreter-semantics.js */ "./js/ohm/interpreter-semantics.js");
/* harmony import */ var _ExecutionStack_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./ExecutionStack.js */ "./js/objects/ExecutionStack.js");
/* harmony import */ var _utils_id_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./utils/id.js */ "./js/objects/utils/id.js");
/* harmony import */ var _utils_clipboard_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./utils/clipboard.js */ "./js/objects/utils/clipboard.js");
/* harmony import */ var _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./properties/PartProperties.js */ "./js/objects/properties/PartProperties.js");
/* harmony import */ var _utils_handInterface_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./utils/handInterface.js */ "./js/objects/utils/handInterface.js");
/* harmony import */ var _utils_merriamInterface_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./utils/merriamInterface.js */ "./js/objects/utils/merriamInterface.js");
/* harmony import */ var _utils_serialization_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./utils/serialization.js */ "./js/objects/utils/serialization.js");
/* harmony import */ var _plugins_plugins_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../plugins/plugins.js */ "./plugins/plugins.js");
/* harmony import */ var _utils_AltSyntaxHighlighter_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./utils/AltSyntaxHighlighter.js */ "./js/objects/utils/AltSyntaxHighlighter.js");
/**
 * System Object
 * -------------------------------------
 * I am an object representing the "top" of the
 * sytem. I am the point of communication between
 * Models and Views.
 */
















































const DOMparser = new DOMParser();




const System = {
    name: "System",
    id: -1,
    isLoaded: false,
    partsById: {},
    _commandHandlers: {},
    _functionHandlers: {},
    _deserializer: null,

    // A dictionary mapping available ST resource (such as plugin) names
    availableResources: {},

    // A dictionary mapping part types like
    // 'button' to their classes (Button)
    availableParts: {},

    // A dictionary mapping part types like
    // 'button' to their view classes (ButtonView)
    availableViews: {},

    // A registry that keeps all system messages from
    // beginnign of time; TODO in the future we might want
    // to note keep all this in memory
    // each log consists of:
    // [aMessage, (sourceName, sourceId), (targetName, targetId)]
    messageLog: [],

    // Will be called when a page loads.
    // Checks for any view elements in the
    // page and attempts to find serialized
    // model state for each of them. If present,
    // deserializes the model and attaches it
    // to the view.
    initialLoad: function(){
        // load the available resources
        // these might be needed down the line
        this.loadResources();

        // If we have a serialization script tag
        // containing JSON of serialized information,
        // attempt to load from it
        let serializationEl = document.getElementById('serialization');
        if(serializationEl && serializationEl.text != ""){
            this.deserialize()
                .then(() => {
                    this.sendInitialOpenMessages();
                    System.navigator.setModel(
                        System.partsById['world']
                    );

                    // By default, we render the World in the
                    // Comprehensive Editor
                    this.editor.render(this.world);
                });
        } else {
            this.loadFromEmpty();
 
            // By default, we render the World in the
            // Comprehensive Editor
            this.editor.render(this.world);
        }

        // Attach a new clipboard instance
        this.clipboard = new _utils_clipboard_js__WEBPACK_IMPORTED_MODULE_31__["default"](this);

        // By this point we should have a WorldView with
        // a model attached.
        this.isLoaded = true;
    },

    loadResources: function() {
        Object.keys(_plugins_plugins_js__WEBPACK_IMPORTED_MODULE_36__["default"]).forEach((k) => {
            this.availableResources[k] = _plugins_plugins_js__WEBPACK_IMPORTED_MODULE_36__["default"][k];
        });
    },

    loadFromEmpty: function(){
        let worldModel = new this.availableParts['world']();
        this.partsById[worldModel.id] = worldModel;
        let worldView = document.createElement(
            this.tagNameForViewNamed('world')
        );
        worldView.setModel(worldModel);
        document.body.appendChild(worldView);

        // Create initial stack model
        let initStack = this.newModel('stack', worldModel.id);

        // Create initial card model for that stack
        let initCard = this.newModel('card', initStack.id);

        // Update current stack and card ids 
        worldModel.partProperties.setPropertyNamed(
            worldModel,
            'current',
            initStack.id
        );
        initStack.partProperties.setPropertyNamed(
            initStack,
            'current',
            initCard.id
        );
        // Update serialization
        this.serialize();

        this.sendInitialOpenMessages();
        System.navigator.setModel(
            System.partsById['world']
        );
    },

    sendInitialOpenMessages: function(){
        // Send the openWorld message to the WorldStack
        let world = this.partsById['world'];
        world.sendMessage({
            type: 'command',
            commandName: 'openWorld',
            args: [],
            shouldIgnore: true
        }, world);
        world.sendMessage({
            type: 'command',
            commandName: 'openStack',
            args: [],
            shouldIgnore: true
        }, world.currentStack);
        world.currentStack.sendMessage({
            type: 'command',
            commandName: 'openCard',
            args: [],
            shouldIgnore: true
        }, world.currentStack.currentCard);
    },

    sendMessage: function(aMessage, source, target){
        if(!target || target == undefined){
            throw new Error('Messages must be sent with target receivers specified!');
        }

        // keep track of all sources which pass this message
        if (!("senders" in aMessage)) {
            aMessage["senders"] = [];
        }
        aMessage.senders.push({
            name: source.name,
            id: source.id,
        });

        return target.receiveMessage(aMessage);
    },

    receiveMessage: function(aMessage){
        switch(aMessage.type){
            case 'newView':
                return this.newView(
                    aMessage.viewType,
                    aMessage.modelId
                );
            case 'compile':
                return this.compile(aMessage);
            case 'command':
                return this.receiveCommand(aMessage);
            default:
                return this.doesNotUnderstand(aMessage);
        }
    },

    doesNotUnderstand: function(aMessage){
        // If the message has the shouldIgnore property
        // set to true, it means we should just swallow
        // this message if we don't understand it. This is
        // useful for messages like mouse events on buttons
        // which are not captured by default and would otherwise
        // end up arriving to this System object via the
        // message delegation chain.
        if(aMessage.shouldIgnore){
            return;
        }
        let originalSender = this.partsById[aMessage.senders[0].id];
        let msg = {
            type: "error",
            name: "MessageNotUnderstood",
            message: aMessage
        };
        originalSender.sendMessage(msg, originalSender);
    },

    compile: function(aMessage){
        let targetObject = this.partsById[aMessage.targetId];
        if(!targetObject || targetObject == undefined){
            throw new Error(`System could not compile target object ${aMessage.targetId}`);
        }


        // Attempt to parse the incoming SimpleTalk script string.
        // If there are grammatical errors, report them and bail.
        // Otherwise, create a new semantics on the targetPart, add
        // the required semantic operations, and interpret the top
        // level of the script, which will create the JS handler functions
        let parsedScript = languageGrammar.match(aMessage.codeString);
        if(parsedScript.failed()){
            // consider using the parse data from trace
            // example: let tracedScript = languageGrammar.trace(aMessage.codeString);
            // let tree = tracedScript.toString();
            let msg = {
                type: "error",
                name: "GrammarMatchError",
                parsedScript: parsedScript,
                partId: aMessage.targetId
            };
            targetObject.sendMessage(msg, targetObject);
        } else {
            // First, clear out any currently compiled handlers
            // since the incoming script might get rid of them
            targetObject._commandHandlers = {};

            // Create a semantics object whose partContext
            // attribute is set to be the target object.
            targetObject._semantics = languageGrammar.createSemantics();
            targetObject._semantics.addOperation(
                'interpret',
                Object(_ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_28__["default"])(targetObject, this)
            );
            targetObject._semantics(parsedScript).interpret();
        }


        // Be sure to then update the
        // serialization for the target
        // part, thus adding the script to
        // its serialization
        if(aMessage.serialize){
            this.serialize();
        }
    },

    receiveCommand: function(aMessage){
        let handler = this._commandHandlers[aMessage.commandName];
        if(handler){
            let boundHandler = handler.bind(this);
            let activation = new _ExecutionStack_js__WEBPACK_IMPORTED_MODULE_29__["ActivationContext"](
                aMessage.commandName,
                this,
                aMessage,
                boundHandler
            );
            this.executionStack.push(activation);
            var result = boundHandler(aMessage.senders, ...aMessage.args);
            this.executionStack.pop();
            return result;
        } else {
            return this.doesNotUnderstand(aMessage);
        }
    },

    newModel: function(kind, ownerId, name, buildView=true){
        // Lookup the instance of the model that
        // matches the owner's id
        let ownerPart = this.partsById[ownerId];
        if(!ownerPart || ownerPart == undefined){
            throw new Error(`System could not locate owner part with id ${ownerId}`);
        }

        // Find the class constructor for the kind of
        // part requested as a new model. If not known,
        // throw an error
        let modelClass = this.availableParts[kind];
        if(!modelClass){
            throw new Error(`Cannot create unknown part type: ${kind}`);
        }
        let model = new modelClass(ownerPart);
        if(name){
            model.partProperties.setPropertyNamed(model, 'name', name);
        }
        this.partsById[model.id] = model;

        // Any created part might initialize its
        // own subparts. We need to let the System know
        // about those too
        model.subparts.forEach(subpart => {
            this.partsById[subpart.id] = subpart;
        });

        // If there is a valid owner part for
        // the newly created part model,
        // add the new model to the owner's
        // subparts list
        if(ownerPart){
            ownerPart.addPart(model);
        }

        // Add the System as a property subscriber to
        // the new model. This will send a message to
        // this System object whenever any of this model's
        // properties have changed
        model.addPropertySubscriber(this);

        if(buildView){
            // See if there is already a view for the model.
            // If not, create and attach it.
            let viewForModel = this.findViewById(model.id);
            if(!viewForModel){
                this.newView(model.type, model.id);
            }
        }

        // Finally if the owner part is either a world or a stack
        // and has only one stack or card child, respectively, set
        // that child to be the current
        if(ownerPart.type == "world" || ownerPart.type == "stack"){
            let currentId = ownerPart.partProperties.getPropertyNamed(ownerPart, "current");
            if(!currentId){
                ownerPart.partProperties.setPropertyNamed(ownerPart, "current", model.id);
            }
        }

        return model;
    },

    newProperty(senders, propName, objectId){
        let target;
        let originalSender = senders[0].id;

        if(objectId){
            // Otherwise, if there is an objectId, we are
            // setting the property of a specific part by
            // id
            target = this.partsById[objectId];
        } else {
            // Otherwise we are setting the property on the part
            // that originally sent the message
            target = this.partsById[originalSender];
        }

        if(!target){
            throw new Error(`Could not find newProperty target!`);
        }

        if(target.partProperties.findPropertyNamed(propName)){
            // TODO this should be a ST error
            throw new Error(`Part ${target.id} already has property "${propName}"`);
        }
        // we only add basic property and the default value is null
        let customProp = target.partProperties.findPropertyNamed("custom-properties");
        let newProp = new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_32__["BasicProperty"](propName, null);
        customProp.add(newProp);
    },

    deleteProperty(senders, propName, objectId){
        let target;
        let originalSender = senders[0].id;

        if(objectId){
            // Otherwise, if there is an objectId, we are
            // setting the property of a specific part by
            // id
            target = this.partsById[objectId];
        } else {
            // Otherwise we are setting the property on the part
            // that originally sent the message
            target = this.partsById[originalSender];
        }

        if(!target){
            throw new Error(`Could not find deleteProperty target!`);
        }

        // Note: this will only delete custom properties which is what we want
        let prop = target.partProperties.findPropertyNamed(propName);

        let customProp = target.partProperties.findPropertyNamed("custom-properties");
        customProp.delete(prop);
    },

    setProperty(senders, propName, value, objectId){
        let target;
        let originalSender = senders[0].id;

        if(objectId){
            // Otherwise, if there is an objectId, we are
            // setting the property of a specific part by
            // id
            target = this.partsById[objectId];
        } else {
            // Otherwise we are setting the property on the part
            // that originally sent the message
            target = this.partsById[originalSender];
        }

        if(!target){
            throw new Error(`Could not find setProperty target!`);
        }

        target.partProperties.setPropertyNamed(
            target,
            propName,
            value
        );

        // If the target part is a Stack, we also
        // set this property on all of its Card
        // subparts
        if(target.type == 'stack'){
            target.subparts.filter(subpart => {
                return subpart.type == 'card';
            }).forEach(card => {
                card.partProperties.setPropertyNamed(
                    card,
                    propName,
                    value
                );
            });
        }
    },

    // Remove the model with the given ID from
    // the System's registry, as well as from the subparts
    // array of any owners
    deleteModel: function(modelId){
        let foundModel = this.partsById[modelId];
        if(!foundModel){
            return false;
        }
        // When removing a card or a stack be sure it is not the only one
        // and if it is the current card or stack we should go to the next one
        // before removing it
        if(foundModel.type == "card" || foundModel.type == "stack"){
            let sameTypeSubparts = foundModel._owner.subparts.filter((p) => {return p.type == foundModel.type;});
            if(sameTypeSubparts.length == 1){
                // TODO this should be a ST error
                throw new Error(`Cannot remove the only ${foundModel.type}`);
            } else if(modelId == this.getCurrentStackModel().id  || modelId == this.getCurrentCardModel().id){
                // TODO this should be a ST error
                throw new Error(`Cannot remove the current ${foundModel.type}`);
            }
        }

        // Make sure to stop all stepping
        // on the Part, otherwise stepping
        // intervals will error infinitely
        foundModel.stopStepping();

        // make sure the editor is closed
        foundModel.closeEditorCmdHandler();

        let ownerModel = foundModel._owner;
        if(ownerModel){
            ownerModel.removePart(foundModel);
        }

        delete this.partsById[modelId];
        this.removeViews(modelId);

        // Serialize the state
        this.serialize();
        return true;
    },

    // Remove all views with the corresponding
    // model id from the DOM
    removeViews: function(modelId){
        let views = Array.from(this.findViewsById(modelId));
        views.forEach(view => {
            let parentEl = view.parentElement;
            view.parentElement.removeChild(view);
            // Dispatch a CustomEvent on the parentElement
            // indicating that this part has been removed, and
            // any view utilities that care can be notified.
            let event = new CustomEvent('st-view-removed', {
                detail: {
                    partType: view.model.type,
                    partId: modelId,
                    ownerId: null
                } 
            });
            parentEl.dispatchEvent(event);
        });
        let lenses = this.findLensViewsById(modelId);
        lenses.forEach(lensView => {
            lensView.parentElement.removeChild(lensView);
        });
    },

    newView: function(partName, modelId, parentId){
        let model = this.partsById[modelId];
        if(!model || model == undefined){
            throw new Error(`System does not know part ${partName}[${modelId}]`);
        }
        if(!partName){
            partName = model.type;
        }

        // Find the parent model id. This will
        // help us find the parent view element for
        // appending the new element.
        if (!parentId){
            parentId = model._owner.id;
        }
        let parentElement = this.findViewById(parentId);
        if(!parentElement){
            throw new Error(`Could not find parent element for ${partName}[${modelId}] (model owner id: ${model._owner.id})`);
        }

        // Create the new view instance,
        // append to parent, and set the model
        let newView = document.createElement(
            this.tagNameForViewNamed(partName)
        );
        newView.setModel(model);
        this.sendMessage({
            type: "viewChanged",
            changeName: "subpart-new",
            args: [newView]
        }, model._owner, parentElement);

        // Dispatch a CustomEvent on the parentElement
        // indicating that this part has been created, and
        // any view utilities that care can be notified.
        let event = new CustomEvent('st-view-added', {
            detail: {
                partType: model.type,
                partId: model.id,
                ownerId: model._owner.id || null
            } 
        });
        parentElement.dispatchEvent(event);

        // See if there are lens views and update
        // those as well
        let lensViews = this.findLensViewsById(parentId);
        lensViews.forEach(lensView => {
            let newLensView = document.createElement(
                this.tagNameForViewNamed(partName)
            );
            newLensView.setModel(model);
            newLensView.removeAttribute('part-id');
            newLensView.setAttribute('lens-part-id', modelId);
            newLensView.setAttribute('role', 'lens');
            lensView.appendChild(newLensView);
        });

        // TODO do we want to allow the possibiliy of a view on an
        // element but no subpart of that view on the element?

        // For all subparts of this model, call
        // the newView method recursively
        model.subparts.forEach(subpart => {
            this.newView(subpart.type, subpart.id);
        });

        return newView;
    },

    registerPart: function(name, cls){
        this.availableParts[name] = cls;
    },

    registerView: function(name, cls){
        this.availableViews[name] = cls;
    },

    tagNameForViewNamed: function(name){
        return `st-${name}`;
    },

    // Find the first matching view element
    // with the given id
    findViewById: function(id){
        return document.querySelector(`[part-id="${id}"]`);
    },

    findLensViewsById: function(id){
        return Array.from(document.querySelectorAll(`[lens-part-id="${id}"]`));
    },

    // Find all matching view elements with
    // the given part id
    findViewsById: function(id){
        return document.querySelectorAll(`[part-id="${id}"]`);
    },

    // return the model corresponding to the current stack
    getCurrentStackModel: function(){
        let world = this.getWorldStackModel();
        return world.currentStack;
    },

    // return the model corresponding to the current card
    getCurrentCardModel: function(){
        let currentStack = this.getCurrentStackModel();
        return currentStack.currentCard;
    },

    // return the model corresponding to the world stack
    getWorldStackModel: function(){
        return this.partsById['world'];
    },

    // return the model corresponding script editor st-field
    // Note: we use the window.model.target to locate the corresponding window
    // but return its st-field subpart
    findScriptEditorByTargetId: function(id){
        let scriptEditorField;
        let windows = document.querySelectorAll("st-window");
        windows.forEach((w) => {
            let target = w.model.target;
            if(target && target.id === id){
                scriptEditorField = w.querySelector("st-field");
            }
        });
        return scriptEditorField;
    },

    serialize: function(){
        let world = this.partsById['world'];
        if(!world){
            throw new Error(`No world found!`);
        }
        let serializer = new _utils_serialization_js__WEBPACK_IMPORTED_MODULE_35__["STSerializer"](this);
        let serialString = serializer.serialize(this.partsById['world'], true);

        // If there is not a script tag in the
        // body for the serialization, create it
        let serializationScriptEl = document.getElementById('serialization');
        if(!serializationScriptEl){
            serializationScriptEl = document.createElement('script');
            serializationScriptEl.id = 'serialization';
            serializationScriptEl.type = 'application/json';
            document.body.append(serializationScriptEl);
        }
        serializationScriptEl.textContent = serialString;
    },

    deserialize: function(){
        let serializationEl = document.getElementById('serialization');
        if(!serializationEl){
            throw new Error(`No serialization found for this page`);
        }
        this._deserializer = new _utils_serialization_js__WEBPACK_IMPORTED_MODULE_35__["STDeserializer"](this);
        return this._deserializer.deserialize(serializationEl.textContent);
    },

    // Return a *complete* HTML
    // representation of the current application
    // that can later be saved to a file
    getFullHTMLString: function(){
        let clonedDocument = document.cloneNode(true);
        let world = clonedDocument.querySelector('st-world');
        let nav = clonedDocument.querySelector('st-navigator');
        if(world){
            world.remove();
        }
        if(nav){
            nav.remove();
        }

        return clonedDocument.documentElement.outerHTML;
    },


    /** Navigation of Current World **/
    goToNextStack: function(){
        let world = this.partsById['world'];
        return world.goToNextStack();
    },

    goToPrevStack: function(){
        let world = this.partsById['world'];
        return world.goToPrevStack();
    },

    goToStackById: function(stackId){
        let world = this.partsById['world'];
        return world.goToStackById(stackId);
    },

    /** Navigation of Current Stack **/
    goToNextCard: function(){
        let currentStack = this.getCurrentStackModel(); 
        return currentStack.goToNextCard();
    },

    goToPrevCard: function(){
        let currentStack = this.getCurrentStackModel();
        return currentStack.goToPrevCard();
    },

    goToCardById: function(cardId){
        let currentStack = this.getCurrentStackModel();
        return currentStack.goToCardById(cardId);
    },

    openEditorForPart: function(partId){
        this.editor.render(
            this.partsById[partId]
        );
        this.editor.open();
    },

    closeEditorForPart: function(partId){
        this.editor.close();
    }
};

/** Add Default System Command Handlers **/
//System._commandHandlers['deleteModel'] = System.deleteModel;
System._commandHandlers['deleteModel'] = function(senders, ...rest){
    System.deleteModel(...rest);
};
//System._commandHandlers['newModel'] = System.newModel;
System._commandHandlers['newModel'] = function(senders, ...rest){
    System.newModel(...rest);
    this.serialize();
};
//System._commandHandlers['newView'] = System.newView;
System._commandHandlers['newView'] = function(senders, ...rest){
    System.newView(...rest);
};
System._commandHandlers['newProperty'] = System.newProperty;
System._commandHandlers['setProperty'] = System.setProperty;
System._commandHandlers['deleteProperty'] = System.deleteProperty;

System._commandHandlers['ask'] = function(senders, question){
    // Use the native JS prompt function to ask the question
    // and return its value.
    // By returning here, we expect the implicit variable
    // "it" to be set inside any calling script
    return prompt(question);
};

System._commandHandlers['putInto'] = function(senders, value, variableName, global){
    if(global){
        System.executionStack.setGlobal(variableName, value);
        return;
    }
    // Because we push all handlers onto the execution stack,
    // the putInto handler is currently at the top of the stack.
    // In order to modify the caller's variables, we need to
    // find the context that is one previous on the stack
    if(System.executionStack.previous){
        System.executionStack.previous.setLocal(variableName, value);
    } else {
        throw new Error(`ExecutionStack Error: #putInto on top of empty stack!`);
    }
};

System._commandHandlers['answer'] = function(senders, value){
    alert(value.toString());
};

System._commandHandlers['go to direction'] = function(senders, directive, objectName){
    switch(objectName) {
        case 'card':
            switch(directive){
                case 'next':
                    this.goToNextCard();
                    break;

                case 'previous':
                    this.goToPrevCard();
                    break;
            }
            break;

        case 'stack':
            switch(directive){
                case 'next':
                    this.goToNextStack();
                    break;

                case 'previous':
                    this.goToPrevStack();
                    break;
            }
            break;

        default:
            alert(`"go to" not implemented for ${objectName}`);

    }
};

System._commandHandlers['go to'] = function(senders, id){
    let model = this.partsById[id];
    if(!model){
        alert(`"go to" target not found`);
    }
    switch(model.type) {
    case 'card':
        this.goToCardById(id);
        break;

    case 'stack':
        this.goToStackById(id);
        break;

    default:
        alert(`"go to" not implemented for ${model.type}`);

    }
};

System._commandHandlers['go to website'] = function(senders, url){
    window.location.href = url;
};

//Import a world, i.e. its stacks from another source
System._commandHandlers['importWorld'] = function(sender, sourceUrl){
    if(!sourceUrl){
        sourceUrl = window.prompt("Choose World location");
    }
    fetch(sourceUrl)
        .then(response => {
            let contentType = response.headers.get('content-type');
            if(!contentType.startsWith('text/html')){
                throw new Error(`Invalid content type: ${contentType}`);
            }
            return response.blob().then(blob => {
                let reader = new FileReader();
                reader.readAsText(blob);
                reader.onloadend = () => {
                    let parsedDocument = DOMparser.parseFromString(reader.result, "text/html");
                    // there is no .getElementById() for a node HTML parsed document!
                    let serializationEl = parsedDocument.querySelector('#serialization');
                    if(!serializationEl){
                        console.log(`No serialization found for ${sourceUrl}`);
                        alert(`World "${sourceUrl}" not found`);
                        return;
                    }
                    this._deserializer = new _utils_serialization_js__WEBPACK_IMPORTED_MODULE_35__["STDeserializer"](this);
                    this._deserializer.targetId = 'world'; // We will insert the stacks into the world
                    return this._deserializer.importFromSerialization(
                        serializationEl.textContent,
                        (part) => {
                            // Return only Stacks that are direct subparts
                            // of the world.
                            let isStack = part.type == 'stack';
                            let isWorldSubpart = part._owner && part._owner.type == 'world';
                            return isStack && isWorldSubpart;
                        }
                    );
                };
            });
        })
        .then(() => {
            // Manually set the _src.
            // This ensures that we don't infinitely
            // call the load operation
            this._src = sourceUrl;
            /*
            // Stop and restart hand interface if it's running.
            if (handInterface.handDetectionRunning) {
                handInterface.stop();
                handInterface.start();
            }
            */
        })
        .catch(err => {
            alert("Could not load world");
            console.error(err);
        });
};

System._commandHandlers['openScriptEditor'] = function(senders, targetId){
    let target = this.partsById[targetId];
    let targetName = target.partProperties.getPropertyNamed(target, "name");
    if(targetName){
        targetName = `"${targetName}"`;
    }
    let name = `Script For ${target.name} ${targetName}`;

    // If there is already a dinwo opened with this name, then
    // we return without creating anything new.
    let found = Object.values(System.partsById).filter(part => {
        let partName;
        if(part.type == 'window'){
            partName = part.partProperties.getPropertyNamed(
                part,
                'title'
            );
        }
        return (part.type == 'window' && name == partName);
    });
    if(found.length){
        return;
    }

    let currentCard = this.getCurrentCardModel();
    let window = this.newModel('window', currentCard.id);
    let area = this.newModel('area', window.id);
    let scriptField = this.newModel('field', area.id);
    let saveButton = this.newModel('button', area.id);


    // setup the window and stack properties
    window.setTarget(target);
    window.partProperties.setPropertyNamed(window, "title", name);
    window.partProperties.setPropertyNamed(window, "height", 200);
    window.partProperties.setPropertyNamed(window, "width", 500);
    window.partProperties.setPropertyNamed(window, 'top', 100);
    window.partProperties.setPropertyNamed(window, 'left', 100);

    area.partProperties.setPropertyNamed(area, "layout", "list");
    area.partProperties.setPropertyNamed(area, "list-direction", "column");
    area.partProperties.setPropertyNamed(area, "width", "fill");
    area.partProperties.setPropertyNamed(area, "height", "fill");

    // script field
    let targetScript = target.partProperties.getPropertyNamed(target, "script"); 
    scriptField.partProperties.setPropertyNamed(scriptField, "text", targetScript);
    scriptField.partProperties.setPropertyNamed(scriptField, "height", "fill");
    scriptField.partProperties.setPropertyNamed(scriptField, "width", "fill");

    // Setup syntax highlight
    scriptField.sendMessage({
        type: "command",
        commandName: "highlightSyntax",
        args: []
    }, scriptField);


    // setup up the save button properties
    saveButton.partProperties.setPropertyNamed(saveButton, "name", "Save Script");
    saveButton.partProperties.setPropertyNamed(saveButton, "width", "fill");
    saveButton.partProperties.setPropertyNamed(saveButton, "text-size", 20);
    saveButton.partProperties.setPropertyNamed(saveButton, "target", `part id ${target.id}`);

    saveButton.partProperties.setPropertyNamed(saveButton, "target", `part id ${target.id}`);
    let saveScript = `on click\n\ttell target to set "script" to the "text" of first field\nend click`; 
    saveButton.partProperties.setPropertyNamed(saveButton, "script", saveScript);
};

System._commandHandlers['SimpleTalk'] = function(senders){
    return System.grammar.source.sourceString;
}

System._commandHandlers['openDebugger'] = function(senders, partId){
    let target = this.partsById[partId];
    // Create the Field model and attach to current card
    let currentCard = this.getCurrentCardModel();
    let fieldModel = this.newModel('field', currentCard.id);
    let text = `Available Commands for ${target.name} (id ${target.id})\n\n`;
    Object.keys(target.commandHandlerRegistry).forEach((name) =>{
        let info = target.commandHandlerRegistry[name];
        text += `${name}: ${JSON.stringify(info)}\n`;
    });
    fieldModel.partProperties.setPropertyNamed(
        fieldModel,
        'text',
        text
    );
    fieldModel.partProperties.setPropertyNamed(
        fieldModel,
        'editable',
        false
    );
};

System._commandHandlers['saveHTML'] = function(senders){
    // Stop hand recognition if it's running.
    let handRecognitionOriginallyRunning = _utils_handInterface_js__WEBPACK_IMPORTED_MODULE_33__["default"].handDetectionRunning;
    if (handRecognitionOriginallyRunning) {
        _utils_handInterface_js__WEBPACK_IMPORTED_MODULE_33__["default"].stop();
    }
    this.serialize();

    let stamp = Date.now().toString();
    let serializedPage = this.getFullHTMLString();
    let typeInfo = "data:text/plain;charset=utf-8";
    let url = `${typeInfo},${encodeURIComponent(serializedPage)}`;

    let anchor = document.createElement('a');
    anchor.style.display = "none";
    document.body.append(anchor);
    anchor.href = url;
    anchor.download = `SimpleTalkSnapshot_${stamp}.html`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.parentElement.removeChild(anchor);
    // Start hand recognition if it was running.
    if (handRecognitionOriginallyRunning) {
        _utils_handInterface_js__WEBPACK_IMPORTED_MODULE_33__["default"].start();
    }
};

System._commandHandlers['tell'] = (senders, targetId, deferredMessage) => {
    let targetPart = System.partsById[targetId];
    if(!targetPart){
        throw new Error(`Attempted to tell part id ${targetId}: no such part!`);
    }
    targetPart.sendMessage(deferredMessage, targetPart);
};

System._commandHandlers['toggleHandDetection'] = () => {
    if (_utils_handInterface_js__WEBPACK_IMPORTED_MODULE_33__["default"].handDetectionModel === null) {
        _utils_handInterface_js__WEBPACK_IMPORTED_MODULE_33__["default"].start();
    } else {
        _utils_handInterface_js__WEBPACK_IMPORTED_MODULE_33__["default"].stop();
    }
};

System._commandHandlers['merriam'] = (senders, docId) => {
    const sender = System.partsById[senders[0].id];
    Object(_utils_merriamInterface_js__WEBPACK_IMPORTED_MODULE_34__["default"])(sender, docId);
};

System._commandHandlers['globalInterrupt'] = () => {
    // cycle through all the parts and set the "stepping" property to false
    Object.values(System.partsById).forEach((part) => {
        if(part.isStepping){
            part.partProperties.setPropertyNamed(part, "stepping", false);
        }
    });
};


/** Register the initial set of parts in the system **/
System.registerPart('card', _parts_Card_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
System.registerPart('stack', _parts_Stack_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
System.registerPart('field', _parts_Field_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
System.registerPart('button', _parts_Button_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
System.registerPart('world', _parts_WorldStack_js__WEBPACK_IMPORTED_MODULE_4__["default"]);
System.registerPart('window', _parts_Window_js__WEBPACK_IMPORTED_MODULE_5__["default"]);
System.registerPart('field', _parts_Field_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
System.registerPart('drawing', _parts_Drawing_js__WEBPACK_IMPORTED_MODULE_6__["default"]);
System.registerPart('image', _parts_Image_js__WEBPACK_IMPORTED_MODULE_10__["default"]);
System.registerPart('area', _parts_Area_js__WEBPACK_IMPORTED_MODULE_11__["default"]);
System.registerPart('audio', _parts_Audio_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
System.registerPart('browser', _parts_Browser_js__WEBPACK_IMPORTED_MODULE_8__["default"]);
System.registerPart('resource', _parts_Resource_js__WEBPACK_IMPORTED_MODULE_9__["default"]);

/** Register the initial set of views in the system **/
System.registerView('button', _views_ButtonView_js__WEBPACK_IMPORTED_MODULE_14__["default"]);
System.registerView('stack', _views_StackView_js__WEBPACK_IMPORTED_MODULE_13__["default"]);
System.registerView('world', _views_WorldView_js__WEBPACK_IMPORTED_MODULE_12__["default"]);
System.registerView('card', _views_CardView_js__WEBPACK_IMPORTED_MODULE_15__["default"]);
System.registerView('window', _views_WindowView__WEBPACK_IMPORTED_MODULE_16__["default"]);
System.registerView('field', _views_FieldView_js__WEBPACK_IMPORTED_MODULE_17__["default"]);
System.registerView('drawing', _views_drawing_DrawingView_js__WEBPACK_IMPORTED_MODULE_18__["default"]);
System.registerView('image', _views_ImageView_js__WEBPACK_IMPORTED_MODULE_19__["default"]);
System.registerView('area', _views_AreaView_js__WEBPACK_IMPORTED_MODULE_20__["default"]);
System.registerView('audio', _views_AudioView_js__WEBPACK_IMPORTED_MODULE_21__["default"]);
System.registerView('browser', _views_BrowserView_js__WEBPACK_IMPORTED_MODULE_22__["default"]);
System.registerView('resource', _views_ResourceView_js__WEBPACK_IMPORTED_MODULE_23__["default"]);


// Convenience method for adding all of the
// available custom elements to the window object's
// customElements registry
System.registerCustomElements = function(){
    Object.keys(System.availableViews).forEach(partName => {
        let viewClass = System.availableViews[partName];
        let elementName = System.tagNameForViewNamed(partName);
        window.customElements.define(elementName, viewClass);
    });
};

// iniitalize the compiler and add it to the system
// Instantiate the grammar.
let languageGrammar;
if (window.grammar){
    // for testing it is sometimes convenient to load the grammar and add to window
    // see ./tests/preload.js for example
    languageGrammar = ohm_js__WEBPACK_IMPORTED_MODULE_27___default.a.grammar(window.grammar);
} else {
    languageGrammar = ohm_js__WEBPACK_IMPORTED_MODULE_27___default.a.grammarFromScriptElement();
}

System.grammar = languageGrammar;

// Set the exection stack on the
// System
System.executionStack = new _ExecutionStack_js__WEBPACK_IMPORTED_MODULE_29__["ExecutionStack"]();

// Add a dynamic getter for the World for convenience
Object.defineProperty(System, 'world', {
    get: function(){
        return this.partsById['world'];
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Add the System object to window so
    // that it is global on the page. We do this
    // for both debugging and testing.
    window.System = System;
    // Add the possible views as webcomponents
    // in the custom element registry
    System.registerCustomElements();

    // Add any other non-part view CustomElements,
    // like the halo
    window.customElements.define('st-halo', _views_Halo_js__WEBPACK_IMPORTED_MODULE_24__["default"]);
    window.customElements.define('st-navigator', _views_navigator_Navigator_js__WEBPACK_IMPORTED_MODULE_25__["default"]);
    window.customElements.define('st-editor', _views_editors_Editor_js__WEBPACK_IMPORTED_MODULE_26__["default"]);

    // Add nav
    System.navigator = document.createElement('st-navigator');
    document.body.appendChild(System.navigator);

    // Add comprehensive editor pane
    // if one is not already present in the markup
    let existingEditors = Array.from(document.querySelectorAll('st-editor'));
    existingEditors.forEach(editorEl => {
        editorEl.remove();
    });
    System.editor = document.createElement('st-editor');
    document.body.appendChild(System.editor);

    // Perform the initial setup of
    // the system
    System.initialLoad();
});

// add a message listener on window
// these can include message from a browser part
// for now filter those not coming from the origin
window.addEventListener("message", (event) => {
    if (event.origin !== window.origin)
        return;
    console.log(`Message to browser`);
    // TODO: maybe we need to deal with quote escapes directly
    // in the grammar
    let script = event.data.replaceAll("'", '"');
    // only statements are accepted for now
    let parsedScript = languageGrammar.match(script, "Statement");
    if(parsedScript.failed()){
        // for now just log that it failed
        console.log("failed to parse script for browser");
    } else {
        let semantics = languageGrammar.createSemantics();
        let world = System.partsById["world"];
        semantics.addOperation(
            'interpret',
            Object(_ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_28__["default"])(world, System)
        );
        let msg = semantics(parsedScript).interpret();
        System.sendMessage(msg, world, System);
    }
});

// global interrupt
document.addEventListener('keydown', (event) => {
    if(event.ctrlKey && event.key == 'c'){
        System.sendMessage({
            type: "command",
            commandName: "globalInterrupt",
            args: []
        }, System, System);
    }
});





/***/ }),

/***/ "./js/objects/parts/Area.js":
/*!**********************************!*\
  !*** ./js/objects/parts/Area.js ***!
  \**********************************/
/*! exports provided: Area, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Area", function() { return Area; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Area; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");
/**
 * Area
 * ----------------------------------
 * I am a Area Part.
 * I represent a 'grouping' of subparts within
 * my owner part.
 * I contain the Layout properties set, and therefore
 * can display my contained subparts according to 
 * different layout properties than my ancestor
 * Card.
 *
 */



const sides = ["top", "bottom", "left", "right"];

class Area extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["Part"] {
    constructor(...args){
        super(...args);

        this.acceptedSubpartTypes = [
            "area",
            "button",
            "field",
            "image",
            "audio",
            "resource",
            "drawing",
            "browser",
            "window"
        ];

        // Add style props
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addPositioningStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addLayoutStyleProps"])(this);

        // Set default width and height
        // for an empty area
        this.partProperties.setPropertyNamed(
            this,
            'width',
            50
        );
        this.partProperties.setPropertyNamed(
            this,
            'height',
            50
        );
        this.partProperties.newBasicProp(
            'clipping',
            false
        );
        this.partProperties.newBasicProp(
            'allow-scrolling',
            false
        );
        this.setupStyleProperties();
        // part specific default style properties
        this.partProperties.setPropertyNamed(
            this,
            'background-transparency',
            0
        );
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-width`,
                1,
            );
        });
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-color`,
                "rgb(238, 238, 238)",
            );
        });
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-transparency`,
                0.5,
            );
        });
    }


    get type(){
        return 'area';
    }
};




/***/ }),

/***/ "./js/objects/parts/Audio.js":
/*!***********************************!*\
  !*** ./js/objects/parts/Audio.js ***!
  \***********************************/
/*! exports provided: Audio, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Audio", function() { return Audio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Audio; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");



class Audio extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["Part"] {
    constructor(owner, src) {
        super(owner);

        // Properties
        this.partProperties.newBasicProp(
            "src",
            null
        );

        this.src = null;

        this.partProperties.newBasicProp(
            'readyState',
            "HAVE_NOTHING"
        );

        this.partProperties.newBasicProp(
            "play",
            false
        );

        this.partProperties.newBasicProp(
            "stop",
            null
        );

        // Private command handlers
        this.setPrivateCommandHandler("loadAudioFromSource", this.loadAudioFromSource);
        this.setPrivateCommandHandler("play", () => {this.play(true);});
        this.setPrivateCommandHandler("pause", () => {this.play(false);});
        this.setPrivateCommandHandler("stop", this.stop);

        // Bind component methods
        this.loadAudioFromSource = this.loadAudioFromSource.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);


        // load the src if provided
        if(src){
            this.partProperties.setPropertyNamed(this, "src", url);
        }
        // Style properties
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addPositioningStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addTextStyleProps"])(this);
        this.setupStyleProperties();
        this.partProperties.setPropertyNamed(
            this,
            'background-transparency',
            0
        );
        ["right", "left", "top", "bottom"].forEach((side) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${side}-width`,
                1
            );
        });
    }

    get type(){
        return 'audio';
    }

    loadAudioFromSource(senders, sourceUrl){
        this.partProperties.setPropertyNamed(this, "src", sourceUrl);
    }

    play(value){
        this.partProperties.setPropertyNamed(this, "play", value);
        this.partProperties.setPropertyNamed(this, "stop", false);
    }

    stop(){
        this.partProperties.setPropertyNamed(this, "play", false);
        this.partProperties.setPropertyNamed(this, "stop", true);
    }
};




/***/ }),

/***/ "./js/objects/parts/Browser.js":
/*!*************************************!*\
  !*** ./js/objects/parts/Browser.js ***!
  \*************************************/
/*! exports provided: Browser, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Browser", function() { return Browser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Browser; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");



class Browser extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["Part"] {
    constructor(owner, src) {
        super(owner);

        // Properties
        this.partProperties.newBasicProp(
            "src",
            null
        );

        this.src = null;
        this.partProperties.newBasicProp(
            'readyState',
            "HAVE_NOTHING"
        );

        this.partProperties.newBasicProp(
            "play",
            false
        );

        this.partProperties.newBasicProp(
            "stop",
            null
        );

        // Private command handlers
        this.setPrivateCommandHandler("setURLTo", this.setURL);
        this.setPrivateCommandHandler("forward", this.sendMessageToBrowser);

        // Bind component methods
        this.setURL = this.setURL.bind(this);
        this.sendMessageToBrowser = this.sendMessageToBrowser.bind(this);


        // load the src if provided
        if(src){
            this.partProperties.setPropertyNamed(this, "src", url);
        }
        // Style properties
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addPositioningStyleProps"])(this);
        this.setupStyleProperties();
        this.partProperties.setPropertyNamed(
            this,
            'background-transparency',
            0
        );
        ["right", "left", "top", "bottom"].forEach((side) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${side}-width`,
                5
            );
        });
        this.partProperties.setPropertyNamed(
            this,
            "width",
            400,
        );
    }

    get type(){
        return 'browser';
    }

    setURL(senders, sourceUrl){
        this.partProperties.setPropertyNamed(this, "src", sourceUrl);
    }

    sendMessageToBrowser(senders, message){
        let views = window.System.findViewsById(this.id);
        views.forEach((v) => {
            let iframe = v._shadowRoot.querySelector("iframe");
            iframe.contentWindow.postMessage(message, window.origin);
        });
    }
};




/***/ }),

/***/ "./js/objects/parts/Button.js":
/*!************************************!*\
  !*** ./js/objects/parts/Button.js ***!
  \************************************/
/*! exports provided: Button, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../properties/PartProperties.js */ "./js/objects/properties/PartProperties.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");
/**
 * Button
 * ----------------------------------
 * I am a Button Part.
 * My owner is always a Card.
 * I am a clickable point of interaction on a Card,
 * whose functionality can be customized by the author.
 */




class Button extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(owner){
        super(owner);

        this.isButton = true;

        // Add Button-specific part properties
        this.partProperties.newDynamicProp(
            'selectedText',
            null, // readOnly (for now)
            this.getSelectedText,
            true, // readOnly,
        );

        // Styling
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addPositioningStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addTextStyleProps"])(this);
        this.setupStyleProperties();
        // part specific default style properties
        this.partProperties.setPropertyNamed(
            this,
            'background-color',
            "rgb(255, 234, 149)", // var(--palette-yellow)
        );
        this.partProperties.setPropertyNamed(
            this,
            'corner-top-left-round',
            3
        );
        this.partProperties.setPropertyNamed(
            this,
            'corner-top-right-round',
            3
        );
        this.partProperties.setPropertyNamed(
            this,
            'corner-bottom-left-round',
            3
        );
        this.partProperties.setPropertyNamed(
            this,
            'corner-bottom-right-round',
            3
        );
        this.partProperties.setPropertyNamed(
            this,
            'border-top-width',
            1
        );
        this.partProperties.setPropertyNamed(
            this,
            'border-bottom-width',
            1
        );
        this.partProperties.setPropertyNamed(
            this,
            'border-left-width',
            1
        );
        this.partProperties.setPropertyNamed(
            this,
            'border-right-width',
            1
        );
        this.partProperties.setPropertyNamed(
            this,
            'shadow-left',
            1
        );
        this.partProperties.setPropertyNamed(
            this,
            'shadow-top',
            1
        );
        this.partProperties.setPropertyNamed(
            this,
            'shadow-blur',
            1
        );
        this.partProperties.setPropertyNamed(
            this,
            'shadow-blur',
            1
        );

    }

    get type(){
        return 'button';
    }

    //TODO: implement this property
    // getter for real
    getSelectedText(propName, propVal){
        return null;
    }
};




/***/ }),

/***/ "./js/objects/parts/Card.js":
/*!**********************************!*\
  !*** ./js/objects/parts/Card.js ***!
  \**********************************/
/*! exports provided: Card, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Card; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../properties/PartProperties.js */ "./js/objects/properties/PartProperties.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");
/**
 * Card
 * --------------------------
 * I am a Card Part.
 * I represent a collection of Parts that is
 * displayed on the screen. My owner is always
 * a Stack Part.
 * I can contain any kind of Part, including
 * buttons and fields.
 */





class Card extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["Part"] {
    constructor(owner, name){
        super(owner);
        this.stack = this._owner;
        this.acceptedSubpartTypes = [
            "window", "button",
            "field", "field", "area", "drawing",
            "image", "audio", "browser", "resource"
        ];
        this.isCard = true;

        // Add Card-specific part
        // properties
        this.partProperties.newBasicProp(
            'marked',
            false
        );
        this.partProperties.newBasicProp(
            'cantDelete',
            false
        );
        this.partProperties.newBasicProp(
            'dontSearch',
            false
        );
        this.partProperties.newBasicProp(
            'showPict',
            false
        );

        // If we are initializing with a name
        // set the name property
        if(name){
            this.partProperties.setPropertyNamed(
                this,
                'name',
                name
            );
        }

        // Styling
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addLayoutStyleProps"])(this);
        this.setupStyleProperties();
        // part specific default style properties
        this.partProperties.setPropertyNamed(
            this,
            'background-color',
            "rgb(0, 75, 103)" // palette-blue
        );
    }

    get type(){
        return 'card';
    }
};




/***/ }),

/***/ "./js/objects/parts/Drawing.js":
/*!*************************************!*\
  !*** ./js/objects/parts/Drawing.js ***!
  \*************************************/
/*! exports provided: Drawing, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drawing", function() { return Drawing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Drawing; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");
/**
 * Basic User Drawing Part
 */



const sides = ["top", "bottom", "left", "right"];

class Drawing extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["Part"] {
    constructor(owner){
        super(owner);

        // Set new properties for this
        // part type
        this.partProperties.newBasicProp(
            'image',
            null
        );
        this.partProperties.newBasicProp(
            'mode',
            'drawing'
        );
        // Style
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addPositioningStyleProps"])(this);
        this.setupStyleProperties();
        // part specific default style properties
        this.partProperties.setPropertyNamed(
            this,
            'background-transparency',
            0
        );
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-width`,
                1,
            );
        });
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-color`,
                "rgb(238, 238, 238)", //grey
            );
        });
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-transparency`,
                0.5,
            );
        });
        this.partProperties.setPropertyNamed(
            this,
            'width',
            300
        );
        this.partProperties.setPropertyNamed(
            this,
            'height',
            200
        );

        // We are using a distinct show-border
        // property to deal with being able to see
        // a drawing that is empty
        this.partProperties.newBasicProp(
            'show-border',
            true
        );

        // When drawing from a script/commands,
        // we will use this as the open canvas
        // whose image bytes will be set to the
        // image property
        this.activeCanvas = null;

        // Set up the drawing commands
        this.setupDrawingCommands();


        // Bind component methods
        this.setupDrawingCommands = this.setupDrawingCommands.bind(this);
        this.stroke = this.stroke.bind(this);
        this.moveTo = this.moveTo.bind(this);
        this.lineTo = this.lineTo.bind(this);
        this.beginDraw = this.beginDraw.bind(this);
        this.endDraw = this.endDraw.bind(this);
        this.clear = this.clear.bind(this);
        this.coordsFromString = this.coordsFromString.bind(this);
    }

    get type(){
        return 'drawing';
    }

    setupDrawingCommands(){
        this.setPrivateCommandHandler('lineTo', (senders, ...args) => {
            this.lineTo(...args);
        });
        this.setPrivateCommandHandler('moveTo', (senders, ...args) => {
            this.moveTo(...args);
        });
        this.setPrivateCommandHandler('beginDraw', (senders, ...args) => {
            this.beginDraw(...args);
        });
        this.setPrivateCommandHandler('finishDraw', (senders, ...args) => {
            this.endDraw(...args);
        });
        this.setPrivateCommandHandler('stroke', (senders, ...args) => {
            this.stroke(...args);
        });
        this.setPrivateCommandHandler('clear', (senders, ...args) => {
            this.clear(...args);
        });
    }

    /* Scriptable Drawing Commands */
    stroke(){
        if(this.isDrawing){
            // Hard-coded. Get from props
            // and link to views
            this.activeContext.strokeWidth = 10;
            this.activeContext.stroke();
        }
    }
    moveTo(x, y){
        if(this.isDrawing){
            //let coords = this.coordsFromString(coordPair);
            this.activeContext.moveTo(
                x,
                y
            );
        }
    }

    lineTo(x, y){
        if(this.isDrawing){
            //let coords = this.coordsFromString(coordPair);
            this.activeContext.lineTo(
                x,
                y
            );
        }
    }

    beginDraw(){
        if(this.isDrawing){
            return;
        }
        this.isDrawing = true;
        this.activeCanvas = document.createElement('canvas');
        this.activeCanvas.width = this.partProperties.getPropertyNamed(
            this,
            'width'
        );
        this.activeCanvas.height = this.partProperties.getPropertyNamed(
            this,
            'height'
        );
        this.activeContext = this.activeCanvas.getContext('2d');

        // If there is currently image data set to the
        // image part property, we need to draw that image
        // onto the canvas first.
        let currentImage = this.partProperties.getPropertyNamed(
            this,
            'image'
        );
        if(currentImage){
            let img = new Image();
            img.onload = () => {
                this.activeContext.drawImage(img, 0, 0);
            };
            img.src = currentImage;
        }

        // Begin a drawing path
        this.activeContext.beginPath();
    }

    endDraw(){
        if(this.isDrawing){
            this.activeContext.closePath();
            this.activeContext.stroke();

            // Update the image property to be the
            // serialized version of the current image.
            // This will update any subscribed views
            this.partProperties.setPropertyNamed(
                this,
                'image',
                this.activeCanvas.toDataURL()
            );
            this.activeCanvas = null;
            this.activeContext = null;
            this.isDrawing = false;
        }
    }

    clear(){
        if(this.isDrawing){
            return;
        }
        this.activeCanvas = document.createElement('canvas');
        this.activeCanvas.width = this.partProperties.getPropertyNamed(
            this,
            'width'
        );
        this.activeCanvas.height = this.partProperties.getPropertyNamed(
            this,
            'height'
        );
        this.activeContext = this.activeCanvas.getContext('2d');
        this.partProperties.setPropertyNamed(
            this,
            'image',
            this.activeCanvas.toDataURL()
        );
        this.activeCanvas = null;
        this.activeContext = null;
    }

    /* Utility Methods for Scriptable Drawing */
    coordsFromString(coordString){
        let pair = coordString.split(",");
        let x = parseInt(pair[0]);
        let y = parseInt(pair[1]);
        return {x, y};
    }
};




/***/ }),

/***/ "./js/objects/parts/Field.js":
/*!***********************************!*\
  !*** ./js/objects/parts/Field.js ***!
  \***********************************/
/*! exports provided: Field, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Field; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../properties/PartProperties.js */ "./js/objects/properties/PartProperties.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");
/**
 * Field
 * -----------------------------------------
 * I am a Field Part.
 * I am a container that holds text. I also allow
 * a user to edit my text.
 */





const sides = ["top", "bottom", "left", "right"];

class Field extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(owner, name){
        super(owner);

        this.acceptedSubpartTypes = ["field"];

        this.isField = true;

        if(name){
            this.partProperties.setPropertyNamed(
                this,
                'name',
                name
            );
        }

        // Set the Field-specific
        // Part Properties
        this.partProperties.newBasicProp(
            'mode',
            'editing' //TODO this should be either "bravo" or "simpletalk"
        );

        this.partProperties.newBasicProp(
            'innerHTML',
            ''
        );

        this.partProperties.newBasicProp(
            'targetRangeId',
            null
        );

        // 'text' is a DynamicProperty configured to also set the innerHTML
        // BasicProperty when changed. The basic idea is that 'text' will be
        // the property that ST will interface with and everytime it
        // is changed the 'innerHTML' property should follow.
        this.partProperties.newDynamicProp(
            'text',
            (owner, prop, value, notify) => {
                prop._value = value;
                if(notify){
                    /*
                    if(!value){
                        value = "<br>";
                    }
                    // replace all newline characters with <br>
                    value = value.replace(/\n/g, "<br>");
                    */
                    owner.partProperties.setPropertyNamed(owner, 'innerHTML', value, notify);
                }
            },
            (owner, prop) => {
                return prop._value;
            },
            false, // not read only
            ''     // default is empty string
        );

        this.partProperties.newBasicProp(
            'editable',
            true
        );


        // A number of the props deal with direct text editing,
        // and so they are like commands. Examples include "undo"
        // "redo" "clear" etc. Here we use dynami props which the
        // view can respond to accordingly, but having these props have
        // no actual 'state'
        /** TODO: these should be private commands
        this.partProperties.newDynamicProp(
            "undo",
            () => {}, // all we is a notification
            () => {} // no getter
        );
        this.partProperties.newDynamicProp(
            "redo",
            () => {}, // all we is a notification
            () => {} // no getter
        );
        this.partProperties.newDynamicProp(
            "remove-format",
            () => {}, // all we is a notification
            () => {} // no getter
        );
        **/

        // Styling
        // setting width and height to null
        // effectively forces to the default size
        // of the button to fit the button name
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addPositioningStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addTextStyleProps"])(this);
        this.setupStyleProperties();
        // part specific default style properties
        this.partProperties.setPropertyNamed(
            this,
            'background-color',
            "rgb(255, 248, 220)", // var(--palette-cornsik)
        );
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-width`,
                "medium",
            );
        });
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-style`,
                "solid",
            );
        });
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-color`,
                "black",
            );
        });
        sides.forEach((s) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${s}-width`,
                "1",
            );
        });
        this.partProperties.setPropertyNamed(
            this,
            "width",
            400,
        );

        // Private command handlers

        this.insertRange = this.insertRange.bind(this);
        this.setSelection = this.setSelection.bind(this);
        this.setPrivateCommandHandler("insertRange", this.insertRange);
        this.setPrivateCommandHandler("setSelection", this.setSelection);
        this.setPrivateCommandHandler("highlightSyntax", this.highlightSyntax);
        this.setPrivateCommandHandler("unhighlightSyntax", this.unhighlightSyntax);
    }

    insertRange(senders, rangeId, html, css){
        window.System.findViewsById(this.id).forEach((view) => {
            view.insertRange(rangeId, html, css);
        });
    }

    setSelection(senders, propertyName, propertyValue){
        // for now just allow properties of type "text-*" to be set
        if(propertyName.startsWith("text-")){
            window.System.findViewsById(this.id).forEach((view) => {
                view.setSelection(propertyName, propertyValue);
            });
        }
    }

    highlightSyntax(){
        let view = window.System.findViewById(this.id);
        if(view){
            view.highlightSyntax();
        }
    }

    unhighlightSyntax(){
        let view = window.System.findViewById(this.id);
        if(view){
            view.unhighlightSyntax();
        }
    }

    get type(){
        return 'field';
    }
};




/***/ }),

/***/ "./js/objects/parts/Image.js":
/*!***********************************!*\
  !*** ./js/objects/parts/Image.js ***!
  \***********************************/
/*! exports provided: Image, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return Image; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Image; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");




class Image extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["Part"] {
    constructor(owner, src) {
        super(owner);

        // Properties
        this.partProperties.newDynamicProp(
            "src",
            this.setSource,
            this.getSource
        );

        this._src = src;

        this.partProperties.newBasicProp(
            "mimeType",
            "unknown"
        );

        this.partProperties.newBasicProp(
            "imageData",
            null
        );

        this.partProperties.newBasicProp(
            'draggable',
            false
        );

        // Style properties
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addPositioningStyleProps"])(this);
        this.setupStyleProperties();
        // part specific default style properties
        this.partProperties.setPropertyNamed(
            this,
            'background-transparency',
            0
        );
        this.partProperties.setPropertyNamed(
            this,
            'background-color',
            "black"
        );

        // Private command handlers
        this.setPrivateCommandHandler("loadImageFrom", this.loadImageFromSource);
        this.setPrivateCommandHandler("loadImageFromFile", this.loadImageFromFile);

        // Bind component methods
        this.loadImageFromSource = this.loadImageFromSource.bind(this);
        this.loadImageFromFile = this.loadImageFromFile.bind(this);
    }


    loadImageFromSource(senders, sourceUrl){
        fetch(sourceUrl)
            .then(response => {
                let contentType = response.headers.get('content-type');
                if(!contentType.startsWith('image')){
                    throw new Error(`Invalid image mimeType: ${contentType}`);
                }
                this.partProperties.setPropertyNamed(
                    this,
                    "mimeType",
                    contentType
                );
                if(contentType.startsWith("image/svg")){
                    return response.text().then(text => {
                        this.partProperties.setPropertyNamed(
                            this,
                            'imageData',
                            text
                        );
                    });
                } else {
                    return response.blob().then(blob => {
                        let reader = new FileReader();
                        reader.onloadend = () => {
                            this.partProperties.setPropertyNamed(
                                this,
                                'imageData',
                                reader.result // will be the base64 encoded data
                            );
                        };
                        reader.readAsDataURL(blob);
                    });
                }
            })
            .then(() => {
                // Manually set the _src.
                // This ensures that we don't infinitely
                // call the load operation
                this._src = sourceUrl;
            })
            .catch(err => {
                console.error(err);
                this.partProperties.setPropertyNamed(
                    this,
                    'imageData',
                    null
                );
            });
    }

    loadImageFromFile(){
        let filePicker = document.createElement('input');
        filePicker.type = 'file';
        filePicker.setAttribute('accept', 'image/*');
        filePicker.style.display = 'none';
        filePicker.addEventListener('change', (event) => {
            // Handle the file here
            let reader = new FileReader();
            reader.onloadend = () => {
                this.partProperties.setPropertyNamed(
                    this,
                    'mimeType',
                    filePicker.files[0].type
                );
                this.partProperties.setPropertyNamed(
                    this,
                    'imageData',
                    reader.result
                );
            };
            let imageFile = filePicker.files[0];
            if(imageFile.type.includes('svg')){
                reader.readAsText(imageFile);
            } else {
                reader.readAsDataURL(imageFile);
            }
            filePicker.remove();
        });
        document.body.append(filePicker);
        filePicker.click();
    }

    setSource(owner, property, value){
        owner._src = value;
        if(value){
            owner.loadImageFromSource([this], value);
        }
    }

    getSource(owner, property){
        return owner._src;
    }

    get type(){
        return 'image';
    }

    get isSvg(){
        let mimeType = this.partProperties.getPropertyNamed(
            this,
            "mimeType"
        );
        if(!mimeType){
            return false;
        }

        return mimeType.startsWith('image/svg');
    }
};




/***/ }),

/***/ "./js/objects/parts/Part.js":
/*!**********************************!*\
  !*** ./js/objects/parts/Part.js ***!
  \**********************************/
/*! exports provided: Part, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Part", function() { return Part; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Part; });
/* harmony import */ var _utils_id_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/id.js */ "./js/objects/utils/id.js");
/* harmony import */ var _utils_errorHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/errorHandler.js */ "./js/objects/utils/errorHandler.js");
/* harmony import */ var _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../properties/PartProperties.js */ "./js/objects/properties/PartProperties.js");
/* harmony import */ var _ExecutionStack_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ExecutionStack.js */ "./js/objects/ExecutionStack.js");
/**
 * Part
 * -------------------------------
 * I represent the prototype object for all
 * SimpleTalk parts.
 */







class Part {
    constructor(anOwnerPart, name, deserializing=false){

        this.name = this.constructor.name;

        // An array of child parts
        this.subparts = [];
        // a list of all accepted subparts by type
        // By default this is null and each Part subclcass should
        // specify if otherwise
        this.acceptedSubpartTypes = [];

        this.partProperties = new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["PartProperties"]();
        this._owner = anOwnerPart;
        this._commandHandlers = {};
        this._privateCommandHandlers = {};
        this._functionHandlers = {};
        this._scriptSemantics = {};
        this._propertySubscribers = new Set();
        this._viewSubscribers = new Set();
        this._stepIntervalId = null;

        this.isPart = true;

        // Bind methods
        this.setupProperties = this.setupProperties.bind(this);
        this.setupStyleProperties = this.setupStyleProperties.bind(this);

        this.addPart = this.addPart.bind(this);
        this.removePart = this.removePart.bind(this);
        this.acceptsSubpart = this.acceptsSubpart.bind(this);
        this.setPrivateCommandHandler = this.setPrivateCommandHandler.bind(this);
        this.removePrivateCommandHandler = this.removePrivateCommandHandler.bind(this);
        this.setFuncHandler = this.setFuncHandler.bind(this);
        this.receiveCmd = this.receiveCmd.bind(this);
        this.receiveFunc = this.receiveFunc.bind(this);
        this.receiveError = this.receiveError.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.delegateMessage = this.delegateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.addPropertySubscriber = this.addPropertySubscriber.bind(this);
        this.removePropertySubscriber = this.removePropertySubscriber.bind(this);
        this.addViewSubscriber = this.addViewSubscriber.bind(this);
        this.removeViewSubscriber = this.removeViewSubscriber.bind(this);
        this.serialize = this.serialize.bind(this);
        this.toJSON = this.toJSON.bind(this);
        this.setPropsFromDeserializer = this.setPropsFromDeserializer.bind(this);
        this.findAncestorOfType = this.findAncestorOfType.bind(this);
        this.openEditorCmdHandler = this.openEditorCmdHandler.bind(this);
        this.closeEditorCmdHandler = this.closeEditorCmdHandler.bind(this);
        this.copyCmdHandler = this.copyCmdHandler.bind(this);
        this.pasteCmdHandler = this.pasteCmdHandler.bind(this);
        this.isSubpartOfCurrentCard = this.isSubpartOfCurrentCard.bind(this);
        this.isSubpartOfCurrentStack = this.isSubpartOfCurrentStack.bind(this);
        this.getOwnerBranch = this.getOwnerBranch.bind(this);
        this.startStepping = this.startStepping.bind(this);
        this.stopStepping = this.stopStepping.bind(this);
        this.setTargetProp = this.setTargetProp.bind(this);
        this.move = this.move.bind(this);
        this.moveSubpartUp = this.moveSubpartUp.bind(this);
        this.moveSubpartDown = this.moveSubpartDown.bind(this);
        this.moveSubpartToFirst = this.moveSubpartToFirst.bind(this);
        this.moveSubpartToLast = this.moveSubpartToLast.bind(this);



        // Finally, we finish initialization
        this.setupProperties();

        // command handlers
        this.setPrivateCommandHandler("openEditor", this.openEditorCmdHandler);
        this.setPrivateCommandHandler("closeEditor", this.closeEditorCmdHandler);
        this.setPrivateCommandHandler("setTargetTo", this.setTargetProp);
        this.setPrivateCommandHandler("copy", this.copyCmdHandler);
        this.setPrivateCommandHandler("paste", this.pasteCmdHandler);
        this.setPrivateCommandHandler("move", this.move);
        this.setPrivateCommandHandler("moveUp", () => {this._owner.moveSubpartUp(this);});
        this.setPrivateCommandHandler("moveDown", () => {this._owner.moveSubpartDown(this);});
        this.setPrivateCommandHandler("moveToFirst", () => {this._owner.moveSubpartToFirst(this);});
        this.setPrivateCommandHandler("moveToLast", () => {this._owner.moveSubpartToLast(this);});
    }

    // Convenience getter to get the id
    // from the partProperties
    get id(){
        return this.partProperties.getPropertyNamed(this, 'id');
    }

    set id(val){
        return this.partProperties.setPropertyNamed(this, 'id', val);
    }


    // Return an array of names of all of my and my ancestors' handlers
    // for the moment this is just names, type, id and whether the handler overrides
    // an owner's, but could be richer info, such as arguments, documentation etc
    get commandHandlerRegistry(){
        let handlersInfo = {};
        let ownerBranch = this.getOwnerBranch();
        for(let i = 1; i <= ownerBranch.length; i++){
            let part = ownerBranch[ownerBranch.length - i];
            let partType = part.type;
            if(part.id === -1){
                partType = "System";
            } else {
                // System doesn't have private command handlers
                Object.keys(part._privateCommandHandlers).forEach((h) => {
                    let override = false;
                    if(handlersInfo[h]){
                        override = true;
                    }
                    handlersInfo[h] = {partId: part.id, partType: partType, override: override, private: true};
                });
            }
            Object.keys(part._commandHandlers).forEach((h) => {
                let override = false;
                if(handlersInfo[h]){
                    override = true;
                }
                handlersInfo[h] = {partId: part.id, partType: partType, override: override, private: false};
            });
        }
        return handlersInfo;
    }

    // returns the this.part -> System branch by part id
    getOwnerBranch(branch){
        if(!branch){
            branch = [this];
        }
        if(this.type === "world"){
            branch.push(window.System);
            return branch;
        } else {
            branch.push(this._owner);
        };
        return this._owner.getOwnerBranch(branch);
    }

    // Configures the specific properties that the
    // given part can expect, along with any default
    // values.
    // Descendant Parts should override this method
    // in their own constructor after calling super,
    // so that they get the parent's general properties
    // too.
    setupProperties(){
        // Here, we set up properties common
        // to ALL Parts in the system.
        let basicProps = [
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'target',
                null,
            ),
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'contents',
                null,
            ),
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'enabled',
                true
            ),
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'wants-move',
                false
            ),
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'id',
                _utils_id_js__WEBPACK_IMPORTED_MODULE_0__["idMaker"].new()
            ),
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'name',
                `New ${this.type}`
            ),
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'rectangle',
                "0, 0, 0, 0",
                true,
                ['rect']
            ),
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'script',
                null // For now
            ),

            // Styling
            // css (really JS style) key-values
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'cssStyle',
                {},
                false,
            ),
            // css (really JS style) key-values
            new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](
                'cssTextStyle',
                {},
                false,
            )
        ];
        basicProps.forEach(prop => {
            this.partProperties.addProperty(prop);
        });

        // the index number of the part in part._owner.subpart
        // array. Note: this is 1-indexed
        this.partProperties.newDynamicProp(
            'number',
            null, // no setter
            function(propOwner, propObject){
                if(propOwner.type == "world"){
                    return 1;
                }
                return propOwner._owner.subparts.indexOf(propOwner) + 1;
            },
            true // readonly
        );

        this.partProperties.newDynamicProp(
            'target',
            function(propOwner, propObject, val){
                // check to see if the target is a non-ID
                let id = Object(_utils_id_js__WEBPACK_IMPORTED_MODULE_0__["isValidId"])(val);
                if(id){
                    // if it is an ID insert "part" since our
                    // grammar doesn't handle ID without system object
                    // prefixes
                    propObject._value = `part id ${val}`;
                } else {
                    propObject._value = val;
                }
            },
            function(propOwner, propObject){
                return propObject._value;
            },
            false,
            null,
        ),

        // Custom Properties store props defined within the
        // ST environment
        this.partProperties.newCustomProp(
        ),

        // Stepping related props

        this.partProperties.newDynamicProp(
            // The time in milliseconds between
            // sends of the step command if the
            // stepping property is set to true
            'stepTime',
            // Dynamic setter
            function(propOwner, propObject, value){
                if(propOwner.isStepping){
                    // Interrupt the current interval
                    // and restart with new stepTime
                    propOwner.stopStepping();
                    this._value = value;
                    propOwner.startStepping();
                } else{
                    this._value = value;
                }
            },
            // Dynamic getter
            function(propOwner, propObject){
                return this._value;
            },
            false, // can read and write
            500 // Default to half a second
        );

        this.partProperties.newDynamicProp(
            'stepping',
            // Dynamic setter
            function(propOwner, propObject, value){
                if(value === false && propOwner.isStepping){
                    propOwner.stopStepping();
                } else if(value === true && !propOwner.isStepping){
                    propOwner.startStepping();
                }
            },
            // Dynamic getter
            function(propOwner, propObject){
                // If the intervalId is set, then
                // the Part is currently stepping
                return propOwner.isStepping;
            },
        );

    }

    // To be called in each sub-class that has StyleProperties
    // called after the style props are configured
    setupStyleProperties(){
        this.partProperties._properties.forEach((prop) => {
            if(prop.constructor.name === "StyleProperty"){
                // setting the value on itself ensures that the cssStyle
                // BasicProperty is updated with the appropriate styler
                // conversion css key-val
                prop.setValue(this, prop._value);
            }
        });
    }

    /** Subpart Access **/
    /**
     * Each subclass will implement its own set of checks,
     * and throw an approprite error if the subpart type is invalid.
     */
    acceptsSubpart(aPartType){
        if (this.acceptedSubpartTypes[0] === "*"){
            return true;
        }
        return this.acceptedSubpartTypes.includes(aPartType.toLowerCase());
    }

    /**
     * Adds a part to this part's subparts
     * collection, if not already present.
     * It will also set the owner of the
     * added part to be this part.
     */
    addPart(aPart){
        if(!this.acceptsSubpart(aPart.type)){
            throw new Error(`${this.type} does not accept subparts of type ${aPart.type}`);
        }

        let found = this.subparts.indexOf(aPart);
        if(found < 0){
            this.subparts.push(aPart);
            aPart._owner = this;
        }
    }

    /**
     * Removes the given part from this
     * part's list of subparts (if present).
     * It will also unset the owner of the
     * given part.
     */
    removePart(aPart){
        let partIndex = this.subparts.indexOf(aPart);
        if(partIndex >= 0){
            this.subparts.splice(partIndex, 1);
            aPart._owner = null;
        }
    }

    /** Checks whether the Part instance is a subpart of the current
     * Card.
     */
    isSubpartOfCurrentCard(){
    }

    /** Checks whether the Part instance is a subpart of the current
     * Stack.
     */
    isSubpartOfCurrentStack(){
    }

    /** Logging and Reporting **/
    shouldBeImplemented(functionName){
        let msg = `${this.constructor.name} should implement ${functionName}`;
        throw new Error(msg);
    }

    /** Message Handling and Delegation **/
    delegateMessage(aMessage){
        return this.sendMessage(
            aMessage,
            this._owner
        );
    }

    sendMessage(aMessage, target){
        return window.System.sendMessage(aMessage, this, target);
    }

    receiveMessage(aMessage){
        // By default, Parts will only handle
        // messages of type 'command' and 'function'
        switch(aMessage.type){
            case 'command':
                return this.receiveCmd(aMessage);
                //break;
            case 'function':
                return this.receiveFunc(aMessage);
                //break;
            case 'error':
                return this.receiveError(aMessage);
            default:
                return this.delegateMessage(aMessage);
        }
    }

    receiveError(aMessage){
        return _utils_errorHandler_js__WEBPACK_IMPORTED_MODULE_1__["default"].handle(aMessage);
    }

    receiveCmd(aMessage){
        let handler = this._commandHandlers[aMessage.commandName];
        if(handler){
            // If this Part has a handler for
            // the given command, we run it.
            // We also late-bind the current part
            // instance as the 'this' context for
            // the handler
            let boundHandler = handler.bind(this);
            var activation = new _ExecutionStack_js__WEBPACK_IMPORTED_MODULE_3__["ActivationContext"](
                aMessage.commandName,
                this,
                aMessage,
                boundHandler
            );
            window.System.executionStack.push(activation);
            var result = boundHandler(aMessage.senders, ...aMessage.args);
            window.System.executionStack.pop();
            return result;
        }

        let privateHandler = this._privateCommandHandlers[aMessage.commandName];
        if(privateHandler){
            // If this Part has a handler for
            // the given command, we run it.
            // We also late-bind the current part
            // instance as the 'this' context for
            // the handler
            let boundHandler = privateHandler.bind(this);
            var activation = new _ExecutionStack_js__WEBPACK_IMPORTED_MODULE_3__["ActivationContext"](
                aMessage.commandName,
                this,
                aMessage,
                boundHandler
            );
            window.System.executionStack.push(activation);
            var result = boundHandler(aMessage.senders, ...aMessage.args);
            window.System.executionStack.pop();
            return result;
        }

        // Otherwise, we have no handler for
        // it. Unless the message indicates shouldNotDelegate
        // we delegate along the
        // message delegation chain. It is up
        // to Parts to properly implement delegation
        // for themselves!
        if(aMessage.shouldNotDelegate){
            return aMessage;
        }
        return this.delegateMessage(aMessage);
    }

    receiveFunc(aMessage){
        let handler = this._functionHandlers[aMessage.functionName];

        if(handler){
            let boundHandler = handler.bind(this);
            return boundHandler();
        } else {
            return this.delegateMessage(aMessage);
        }
    }

    setPrivateCommandHandler(commandName, handler){
        this._privateCommandHandlers[commandName] = handler;
    }

    removePrivateCommandHandler(commandName){
        delete this._privateCommandHandlers[commandName];
    }

    setFuncHandler(funcName, handler){
        this._functionHandlers[funcName] = handler;
    }

    /** Command Handlers
        ----------------
        Command handlers which are invoked at the Part level
        which are not immediately delegaed to the Part._owner
    **/

    openEditorCmdHandler(){
        let editor = document.querySelector('st-editor');
        editor.render(this);
        if(!editor.isOpen){
            editor.open();
        }
    }

    closeEditorCmdHandler(){
        let editor = document.querySelector('st-editor.open');
        if(editor){
            editor.close();
        }
    }

    setTargetProp(senders, ...args){
        let target = args.join(" ");
        this.partProperties.setPropertyNamed(this, "target", target);
    }

    copyCmdHandler(){
        window.System.clipboard.copyPart(this);
    }

    pasteCmdHandler(){
        if(!window.System.clipboard.isEmpty){
            let item = window.System.clipboard.contents[0];
            if(item.type == 'simpletalk/json' && this.acceptsSubpart(item.partType)){
                window.System.clipboard.pasteContentsInto(this);
            }
        }
    }

    move(senders, movementX, movementY){
        if(!this.partProperties.getPropertyNamed(this, "wants-move")){
            throw Error(`Part ${this.id} trying to move with 'wants-move' property false`);
        }
        let top = this.partProperties.getPropertyNamed(this, "top");
        top += movementY;
        this.partProperties.setPropertyNamed(this, "top", top);
        let left = this.partProperties.getPropertyNamed(this, "left");
        left += movementX;
        this.partProperties.setPropertyNamed(this, "left", left);
    }

    moveSubpartDown(part){
        let currentIndex = this.subparts.indexOf(part);
        if(currentIndex < this.subparts.length - 1){
            this.subpartOrderChanged(part.id, currentIndex, currentIndex + 1);
        }
    }

    moveSubpartUp(part){
        let currentIndex = this.subparts.indexOf(part);
        if(currentIndex > 0){
            this.subpartOrderChanged(part.id, currentIndex, currentIndex - 1);
        }
    }

    // Note: moveSubpartToFirst means move to first in the view
    // i.e. last as a subaprt
    moveSubpartToFirst(part){
        let currentIndex = this.subparts.indexOf(part);
        this.subpartOrderChanged(part.id, currentIndex, 0);
    }

    moveSubpartToLast(part){
        let currentIndex = this.subparts.indexOf(part);
        this.subpartOrderChanged(part.id, currentIndex, this.subparts.length - 1);
    }

    /** Property Subscribers
        ------------------------
        Objects added as property subscribers
        will be 'notified' whenever one of this
        Part's properties changes
    **/
    addPropertySubscriber(anObject){
        this._propertySubscribers.add(anObject);
    }

    removePropertySubscriber(anObject){
        this._propertySubscribers.delete(anObject);
    }

    propertyChanged(propertyName, newValue){
        let message = {
            type: 'propertyChanged',
            propertyName: propertyName,
            value: newValue,
            partId: this.id
        };
        this._propertySubscribers.forEach(subscriber => {
            this.sendMessage(message, subscriber);
        });
    }

    /** View Subscribers
        ------------------------
        Objects added as view subscribers
        will be 'notified' whenever this Part
        incurrs a view change (add, delete subparts, reorder etc)
    **/
    addViewSubscriber(anObject){
        this._viewSubscribers.add(anObject);
    }

    removeViewSubscriber(anObject){
        this._viewSubscribers.delete(anObject);
    }

    viewChanged(changeName, ...args){
        let message = {
            type: 'viewChanged',
            changeName: changeName,
            partId: this.id,
            args: args
        };
        this._viewSubscribers.forEach(subscriber => {
            this.sendMessage(message, subscriber);
        });
    }

    subpartOrderChanged(id, currentIndex, newIndex){
        let subpart = this.subparts.splice(currentIndex, 1)[0];
        this.subparts.splice(newIndex, 0, subpart);
        this.viewChanged("subpart-order", id, currentIndex, newIndex);
    }

    startStepping(){
        if(this._stepIntervalId){
            this.stopStepping();
        }
        let stepTime = this.partProperties.getPropertyNamed(
            this,
            'stepTime'
        );
        if(stepTime > 0){
            this._stepIntervalId = setInterval(() => {
                this.sendMessage({
                    type: 'command',
                    commandName: 'step',
                    args: []
                }, this);
            }, stepTime);
        }
    }

    stopStepping(){
        clearInterval(this._stepIntervalId);
        this._stepIntervalId = null;
    }

    get isStepping(){
        // We know the Part is currently stepping
        // of the stored intervalId is set to
        // something besides null
        return this._stepIntervalId !== null;
    }

    /**
     * Serialize this Part's state as JSON.
     * By default, we do not serialize specific
     * PartCollection information (recursively),
     * and only include basics including the current
     * state of all properties.
     */
    serialize(){
        let ownerId = null;
        if(this._owner){
            ownerId = this._owner.id;
        }
        let result = {
            type: this.type,
            id: this.id,
            properties: {},
            subparts: this.subparts.map(subpart => {
                return subpart.id;
            }),
            ownerId: ownerId
        };
        this.partProperties._properties.forEach(prop => {
            let name = prop.name;
            let value = prop.getValue(this);
            result.properties[name] = value;
        });
        return result;
    }

    /**
     * Set the properties and other
     * attributes of this Part model
     * from a deserialized JSON object.
     */
    setPropsFromDeserializer(incomingProps, deserializer){
        Object.keys(incomingProps).forEach(propName => {
            let property = this.partProperties.findPropertyNamed(propName);
            if(!property){
                // If some old or invalid property is
                // present in the deserialization, simply provide
                // a warning and then skip this one.
                console.warn(`Deserialized property "${propName}" is not a valid property name for ${this.type} (id ${this.id}) and will be ignored`);
            } else if(propName == "custom-properties"){
                // custom properties are serialized as an object like other props
                // and we need to create properties from these and set their respective
                // values. Then we need to set the value of "custom-properties" prop
                // itself to be the object containing all of these
                let customPropsData = incomingProps[propName];
                let newCustomPropsObject = {};
                Object.values(customPropsData).forEach((propData) => {
                    let newProp = new _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__["BasicProperty"](propData.name, null);
                    newProp.setValue(this, propData._value, false); // no need to notify
                    newCustomPropsObject[propData.name] = newProp;
                });
                property.setValue(this, newCustomPropsObject, false); // no need to notify
            } else if(!property.readOnly){
                // Last arg is false, which tells the property
                // not to notify its owner's subscribers of
                // property changes. We don't need that when
                // deserializing
                property.setValue(this, incomingProps[propName], false);
            }
        });
    }

    toJSON(){
        return this.serialize();
    }

    findAncestorOfType(aPartType){
        let owner = this._owner;
        while(owner){
            if(owner.type == aPartType){
                return owner;
            }
            owner = owner._owner;
        }
        return null;
    }
};




/***/ }),

/***/ "./js/objects/parts/Resource.js":
/*!**************************************!*\
  !*** ./js/objects/parts/Resource.js ***!
  \**************************************/
/*! exports provided: Resource, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resource", function() { return Resource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Resource; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");



class Resource extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["Part"] {
    constructor(owner, src) {
        super(owner);
        this.resource = null;

        // Properties
        this.partProperties.newBasicProp(
            "src",
            null
        );

        this.src = null;

        this.partProperties.newBasicProp(
            'readyState',
            "notReady"
        );

        this.partProperties.newBasicProp(
            "prerequisite",
            null
        );

        this.partProperties.newBasicProp(
            "resourceName",
            null
        );

        this.partProperties.newBasicProp(
            "response",
            null
        );

        // Private command handlers
        this.setPrivateCommandHandler("loadResource", this.loadResource);
        this.setPrivateCommandHandler("setSourceTo", this.setSourceTo);
        this.setPrivateCommandHandler("get", this.get);

        // Bind component methods
        this.loadResource = this.loadResource.bind(this);
        this.get = this.get.bind(this);
        this.reset = this.reset.bind(this);

        // load the src if provided
        if(src){
            this.partProperties.setPropertyNamed(this, "src", url);
        }
        // Style properties
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addPositioningStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_1__["addTextStyleProps"])(this);
        this.setupStyleProperties();
        this.partProperties.setPropertyNamed(
            this,
            'background-transparency',
            0
        );
        ["right", "left", "top", "bottom"].forEach((side) => {
            this.partProperties.setPropertyNamed(
                this,
                `border-${side}-width`,
                1
            );
        });
    }

    get type(){
        return 'resource';
    }

    loadResource(senders, resourceName){
        if(!window.System.availableResources || !window.System.availableResources[resourceName]){
            // TODO this should be a ST error
            throw Error(`resource ${resourceName} not found`);
        }
        this.resource = window.System.availableResources[resourceName];
        this.partProperties.setPropertyNamed(this, "resourceName", resourceName);
        // we can't guarantee the state of a resource and so it should be re-set every time
        this.reset();
    }

    setSourceTo(senders, sourceUrl){
        if(!this.resource){
            // TODO this should be a ST error
            throw Error(`no resource loaded for resource part id ${this.id}`);
        }
        this.partProperties.setPropertyNamed(this, "src", sourceUrl);
        this.resource.load(sourceUrl);
        // we can't guarantee the state of a resource and so it should be re-set every time
        this.reset();

    }

    get(senders, ...args){
        this.partProperties.setPropertyNamed(this, "readyState", "fetching");
        let prerequisite = this.partProperties.getPropertyNamed(this, "prerequisite");
        this.resource.get(prerequisite, ...args).then((response) => {
            this.partProperties.setPropertyNamed(this, "response", response);
            this.partProperties.setPropertyNamed(this, "readyState", "ready");
            this.sendMessage({
                type: "command",
                commandName: "responded",
                args: [this.id, this.resource.name],
                shouldIgnore: true
            }, this);
        }, (error) => {
            this.partProperties.setPropertyNamed(this, "readyState", "error");
            this.partProperties.setPropertyNamed(this, "response", null);
            this.sendMessage({
                type: "command",
                commandName: "errored",
                args: [this.id, this.resource.name, error.message],
                shouldIgnore: true
            }, this);
        });
    }

    reset(){
        this.partProperties.setPropertyNamed(this, "readyState", "notReady");
        this.partProperties.setPropertyNamed(this, "response", null);
    }
};




/***/ }),

/***/ "./js/objects/parts/Stack.js":
/*!***********************************!*\
  !*** ./js/objects/parts/Stack.js ***!
  \***********************************/
/*! exports provided: Stack, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stack", function() { return Stack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stack; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Card.js */ "./js/objects/parts/Card.js");
/* harmony import */ var _properties_PartProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../properties/PartProperties.js */ "./js/objects/properties/PartProperties.js");
/**
 * Stack
 * ----------------------------
 * I am the Stack Part.
 * I represent a collection of Card parts,
 * along with some extra configurability.
 */




class Stack extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(owner, name, deserializing=false){
        super(owner);
        this.acceptedSubpartTypes = [
            "card", "window", "button", "area", "field",
            "drawing", "image", "audio", "browser"
        ];

        // Set up Stack specific
        // PartProperties
        this.partProperties.newBasicProp(
            'cantPeek',
            false
        );
        this.partProperties.newBasicProp(
            'resizable',
            false
        );


        // Will hold the card-based index,
        // which here is zero-indexed, of the
        // card that is the current card for this
        // Stack.
        this.partProperties.newBasicProp(
            'current',
            null
        );

        // Bind general methods
        this.sendOpenCardTo = this.sendOpenCardTo.bind(this);
        this.sendCloseCardTo = this.sendCloseCardTo.bind(this);

        // Bind stack navigation methods
        this.goToNextCard = this.goToNextCard.bind(this);
        this.goToPrevCard = this.goToPrevCard.bind(this);
        this.goToCardById = this.goToCardById.bind(this);
        this.goToNthCard = this.goToNthCard.bind(this);
    }

    goToNextCard(){
        let cards = this.subparts.filter(subpart => {
            return subpart.type == 'card';
        });
        if(cards.length < 2){
            return;
        }
        let currentCardId = this.currentCardId;
        let currentCard = this.currentCard;
        let currentIdx = cards.indexOf(currentCard);
        let nextIdx = currentIdx + 1;
        if(nextIdx >= cards.length){
            nextIdx = (nextIdx % cards.length);
        }
        let nextCard = cards[nextIdx];
        this.partProperties.setPropertyNamed(
            this,
            'current',
            nextCard.id
        );
        if(currentCardId != nextCard.id){
            this.sendCloseCardTo(currentCard);
            this.sendOpenCardTo(nextCard);
        }
    }

    goToCardById(anId){
        let currentCardId = this.currentCardId;
        let currentCard = this.currentCard;
        let cards = Object.values(window.System.partsById).filter((part) => {
            return part.type == "card";
        });
        let nextCard = cards.find(card => {
            return card.id == anId;
        });
        if(!nextCard){
            throw new Error(`The card id: ${anId} cant be found stack`);
        }
        // if the card is not on this stack we should go to the corresponding stack
        if(nextCard._owner != this){
            this._owner.goToStackById(nextCard._owner.id);
        }
        this.partProperties.setPropertyNamed(
            this,
            'current',
            nextCard.id
        );
        if(currentCardId != nextCard.id){
            this.sendCloseCardTo(currentCard);
            this.sendOpenCardTo(nextCard);
        }
    }

    goToPrevCard(){
        let cards = this.subparts.filter(subpart => {
            return subpart.type == 'card';
        });
        if(cards.length < 2){
            return;
        }
        let currentCardId = this.currentCardId;
        let currentCard = this.currentCard;
        let currentIdx = cards.indexOf(currentCard);

        let nextIdx = currentIdx - 1;
        if(nextIdx < 0){
            nextIdx = cards.length + nextIdx;
        }
        let nextCard = cards[nextIdx];
        this.partProperties.setPropertyNamed(
            this,
            'current',
            nextCard.id
        );
        if(currentCardId != nextCard.id){
            this.sendCloseCardTo(currentCard);
            this.sendOpenCardTo(nextCard);
        }
    }

    goToNthCard(anIndex){
        // NOTE: We are using 1-indexed values
        // per the SimpleTalk system
        let trueIndex = anIndex - 1;
        let cards = this.subparts.filter(subpart => {
            return subpart.type == 'card';
        });
        if(trueIndex < 0 || trueIndex > cards.length -1){
            console.warn(`Cannot navigate to card number ${anIndex} -- out of bounds`);
            return;
        }
        let currentCardId = this.currentCardId;
        let currentCard = this.currentCard;
        let nextCard = cards[trueIndex];
        this.partProperties.setPropertyNamed(
            this,
            'current',
           nextCard.id
        );
        if(currentCardId != nextCard.id){
            this.sendCloseCardTo(currentCard);
            this.sendOpenCardTo(nextCard);
        }
    }

    sendCloseCardTo(aCard){
        this.sendMessage(
            {
                type: 'command',
                commandName: 'closeCard',
                args: [],
                shouldIgnore: true
            },
            aCard
        );
    }

    sendOpenCardTo(aCard){
        this.sendMessage(
            {
                type: 'command',
                commandName: 'openCard',
                args: [],
                shouldIgnore: true
            },
            aCard
        );
    }

    get type(){
        return 'stack';
    }

    get currentCardId(){
        return this.partProperties.getPropertyNamed(
            this,
            'current'
        );
    }

    get currentCard(){
        return window.System.partsById[this.currentCardId];
    }

    // override the base class methods
    moveSubpartDown(part){
        let currentIndex = this.subparts.indexOf(part);
        let lastValidPartIndex = this.subparts.length - 1;
        if(part.type == "card"){
            let allCards = this.subparts.filter((part) => {
                return part.type == "card";
            });
            lastValidPartIndex = allCards.length - 1;
        }
        if(currentIndex < lastValidPartIndex){
            this.subpartOrderChanged(part.id, currentIndex, currentIndex + 1);
        }
    }

    moveSubpartToLast(part){
        let currentIndex = this.subparts.indexOf(part);
        let lastValidPartIndex = this.subparts.length - 1;
        if(part.type == "card"){
            let allCards = this.subparts.filter((part) => {
                return part.type == "card";
            });
            lastValidPartIndex = allCards.length - 1;
        }
        if(currentIndex < lastValidPartIndex){
            this.subpartOrderChanged(part.id, currentIndex, lastValidPartIndex);
        }
    }

    moveSubpartUp(part){
        let currentIndex = this.subparts.indexOf(part);
        let firstValidPartIndex = 0;
        if(part.type != "card"){
            let allCards = this.subparts.filter((part) => {
                return part.type == "card";
            });
            firstValidPartIndex = allCards.length;
        }
        if(currentIndex > firstValidPartIndex){
            this.subpartOrderChanged(part.id, currentIndex, currentIndex - 1);
        }
    }

    moveSubpartToFirst(part){
        let currentIndex = this.subparts.indexOf(part);
        let firstValidPartIndex = 0;
        if(part.type != "card"){
            let allCards = this.subparts.filter((part) => {
                return part.type == "card";
            });
            firstValidPartIndex = allCards.length;
        }
        if(currentIndex > firstValidPartIndex){
            this.subpartOrderChanged(part.id, currentIndex, firstValidPartIndex);
        }
    }

    addPart(aPart){
        if(!this.acceptsSubpart(aPart.type)){
            throw new Error(`${this.type} does not accept subparts of type ${aPart.type}`);
        }

        let found = this.subparts.indexOf(aPart);
        if(found < 0){
            // if the part is a card then append after the last card
            if(aPart.type == "card"){
                let allCards = this.subparts.filter((part) => {
                    return part.type == "card";
                });
                this.subparts.splice(allCards.length, 0, aPart);
            } else {
                this.subparts.push(aPart);
            }
            aPart._owner = this;
        }
    }
};




/***/ }),

/***/ "./js/objects/parts/Window.js":
/*!************************************!*\
  !*** ./js/objects/parts/Window.js ***!
  \************************************/
/*! exports provided: Window, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Window", function() { return Window; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Window; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/* harmony import */ var _Stack_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Stack.js */ "./js/objects/parts/Stack.js");
/* harmony import */ var _utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/styleProperties.js */ "./js/objects/utils/styleProperties.js");
/**
 * Window Part
 * ------------------------
 * A Window is a Part that wraps another
 * Part of type Card, Stack, or WorldStack
 * in a moveable window.
 * I can also optionally hold a reference
 * to a target Part that I do not own. I call
 * this JS property target and I store the
 * target part's id as a HyperTalk property
 * called targetId.
 * When my owner part is the current view, I
 * will be visible on top of everything else.
 */




class Window extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(owner, name, target, deserializing=false){
        super(owner, name);

        this.acceptedSubpartTypes = [
            "area",
            "button",
            "field",
            "image",
            "audio",
            "resource",
            "drawing",
        ];

        // If we pass in a target,
        // set it.
        if(target){
            this.setTarget(target);
        }

        // Set up Window specific
        // part ptoperties
        this.partProperties.newBasicProp(
            'targetId',
            null
        );

        this.partProperties.newBasicProp(
            'title',
            "New Window Title"
        );

        this.partProperties.newBasicProp(
            'isResizable',
            true
        );
        // Style
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addBasicStyleProps"])(this);
        Object(_utils_styleProperties_js__WEBPACK_IMPORTED_MODULE_2__["addPositioningStyleProps"])(this);
        this.setupStyleProperties();
        // part specific default style properties
        this.partProperties.setPropertyNamed(
            this,
            'background-transparency',
            0
        );

        // Bind methods
        this.setTarget = this.setTarget.bind(this);
        this.onWindowClose = this.onWindowClose.bind(this);

        // Add private handlers
        this.setPrivateCommandHandler('windowClose', this.onWindowClose);
    }

    setTarget(aPart){
        this.target = aPart;
        this.partProperties.setPropertyNamed(
            this,
            'targetId',
            this.target.id
        );
    }

    unsetTarget(){
        this.target = null;
        this.partProperties.setPropertyNamed(
            this,
            'targetId',
            null
        );
    }

    /**
     * Override
     * Unlike other kinds of Parts, a window
     * has only one subpart, which should be
     * Card, Stack, or WorldStack.
     */
    addPart(aPart){
        let isValid = this.acceptsSubpart(aPart.type);
        if(!isValid){
            // Consider replacing this generic exception
            // with a message based approach that sends
            // these sorts of non-fatal errors to System
            // as a kind of message. This way we can display
            // errors in SimpltTalk objects.
            throw new Error(`Windows cannot wrap parts of type ${aPart.type}`);
        }
        this.subparts.forEach(subpart => {
            this.removePart(subpart);
        });
        this.subparts.push(aPart);
        aPart._owner = this;
    }

    onWindowClose(senders, ...args){
        // Default behavior is to delete
        // the window model from the System.
        // Scripts can override this handler
        this.sendMessage(
            {
                type: 'command',
                commandName: 'deleteModel',
                args: [ this.id ]
            },
            window.System
        );
    }

    get type(){
        return 'window';
    }
}




/***/ }),

/***/ "./js/objects/parts/WorldStack.js":
/*!****************************************!*\
  !*** ./js/objects/parts/WorldStack.js ***!
  \****************************************/
/*! exports provided: WorldStack, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldStack", function() { return WorldStack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WorldStack; });
/* harmony import */ var _Part_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part.js */ "./js/objects/parts/Part.js");
/**
 * WorldStack
 * ---------------------------------------------------
 * I am a Stack part that represents the root of a
 * hierarchy of parts. I am the end of the ownership
 * chain for any given configuration of Parts.
 * I am also the final resolver of all unhandled
 * messages sent along the delegation chain for parts.
 * All parts can eventually resolve to me via the delegation
 * chain or ownership hierarchy.
 * There should only be one instance of me in any given
 * SimpleTalk environment.
 */



class WorldStack extends _Part_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super(null);

        this.acceptedSubpartTypes = ["stack", "image"];

        this.isWorld = true;

        // This property specifies the stack
        // id of the current stack
        this.partProperties.newBasicProp(
            'current',
            null
        );

        // Set the id property to always
        // be 'world'
        this.id = 'world';

        // Bind general methods
        this.sendOpenStackTo = this.sendOpenStackTo.bind(this);
        this.sendCloseStackTo = this.sendCloseStackTo.bind(this);

        // Bind navigation methods
        this.goToNextStack = this.goToNextStack.bind(this);
        this.goToPrevStack = this.goToPrevStack.bind(this);
        this.goToNthStack = this.goToNthStack.bind(this);
        this.goToStackById = this.goToStackById.bind(this);

        // remove command handlers which are not needed for world
        this.removePrivateCommandHandler("moveUp");
        this.removePrivateCommandHandler("moveDown");
        this.removePrivateCommandHandler("moveToFirst");
        this.removePrivateCommandHandler("moveToLast");
    }

    goToNextStack(){
        let stacks = this.subparts.filter(subpart => {
            return subpart.type == 'stack';
        });
        if(stacks.length < 2){
            return;
        }
        let currentStack = this.currentStack;
        let currentStackId = this.currentStackId;
        let currentIdx = stacks.indexOf(currentStack);
        let nextIdx = currentIdx + 1;
        if(nextIdx >= stacks.length){
            nextIdx = (nextIdx % stacks.length);
        }
        let nextStack = stacks[nextIdx];
        this.partProperties.setPropertyNamed(
            this,
            'current',
            nextStack.id
        );
        if(currentStackId != nextStack.id){
            this.sendCloseStackTo(currentStack);
            this.sendOpenStackTo(nextStack);
        }
    }

    goToStackById(anId){
        let stacks = this.subparts.filter(subpart => {
            return subpart.type == 'stack';
        });
        let nextStack = stacks.find(stack => {
            return stack.id == anId;
        });
        if(!nextStack){
            throw new Error(`The stack id: ${anId} cant be found on this stack`);
        }
        let currentStack = this.currentStack;
        let currentStackId = this.currentStackId;
        this.partProperties.setPropertyNamed(
            this,
            'current',
            nextStack.id
        );
        if(currentStackId != nextStack.id){
            this.sendCloseStackTo(currentStack);
            this.sendOpenStackTo(nextStack);
        }
    }

    goToPrevStack(){
        let stacks = this.subparts.filter(subpart => {
            return subpart.type == 'stack';
        });
        if(stacks.length < 2){
            return;
        }
        let currentStack = this.currentStack;
        let currentStackId = this.currentStackId;
        let currentIdx = stacks.indexOf(currentStack);
        let nextIdx = currentIdx - 1;
        if(nextIdx < 0){
            nextIdx = stacks.length + nextIdx;
        }
        let nextStack = stacks[nextIdx];
        this.partProperties.setPropertyNamed(
            this,
            'current',
            nextStack.id
        );
        if(currentStackId != nextStack.id){
            this.sendCloseStackTo(currentStack);
            this.sendOpenStackTo(nextStack);
        }
    }

    goToNthStack(anIndex){
        // NOTE: We are using 1-indexed values
        // per the SimpleTalk system
        let trueIndex = anIndex - 1;
        let stacks = this.subparts.filter(subpart => {
            return subpart.type == 'stack';
        });
        if(trueIndex < 0 || trueIndex > stacks.length -1){
            throw new Error(`Cannot navigate to stack number ${anIndex} -- out of bounds`);
        }
        let currentStack = this.currentStack;
        let currentStackId = this.currentStackId;
        let nextStack = stacks[trueIndex];
        this.partProperties.setPropertyNamed(
            this,
            'current',
            nextStack.id
        );
        if(currentStackId != nextStack.id){
            this.sendCloseStackTo(currentStack);
            this.sendOpenStackTo(nextStack);
        }
    }

    sendCloseStackTo(aStack){
        this.sendMessage({
            type: 'command',
            commandName: 'closeStack',
            args: [],
            shouldIgnore: true
        }, aStack);
        let currentCard = aStack.currentCard;
        if(currentCard){
            aStack.sendMessage({
                type: 'command',
                commandName: 'closeCard',
                args: [],
                shouldIgnore: true
            }, aStack.currentCard);
        }
    }

    sendOpenStackTo(aStack){
        this.sendMessage({
            type: 'command',
            commandName: 'openStack',
            args: [],
            shouldIgnore: true
        }, aStack);
        let currentCard = aStack.currentCard;
        if(currentCard){
            aStack.sendMessage({
                type: 'command', 
                commandName: 'openCard',
                args: [],
                shouldIgnore: true
            }, aStack.currentCard);
        }
    }

    get type(){
        return 'world';
    }

    get loadedStacks(){
        return this.subparts.filter(subpart => {
            return subpart.type == 'stack';
        });
    }

    // Override normal Part serialization.
    // Here we need to also include an array of ids of
    // loaded stacks and the id of the current stack
    serialize(){
        let result = {
            type: this.type,
            id: this.id,
            properties: {},
            subparts: this.subparts.map(subpart => {
                return subpart.id;
            }),
            ownerId: null,
            loadedStacks: (this.loadedStacks.map(stack => {
                return stack.id;
            })),
        };

        // Serialize current part properties
        // values
        this.partProperties._properties.forEach(prop => {
            let name = prop.name;
            let value = prop.getValue(this);
            result.properties[name] = value;
        });
        return result;
    }

    // Override for delegation.
    // We send any messages that should be delegated
    // to the global System object, which has any
    // 'handlers of last resort'
    delegateMessage(aMessage){
        return this.sendMessage(aMessage, window.System);
    }

    get currentStackId(){
        return this.partProperties.getPropertyNamed(
            this,
            'current'
        );
    }

    get currentStack(){
        return window.System.partsById[this.currentStackId];
    }

    // override the base class methods
    addPart(aPart){
        if(!this.acceptsSubpart(aPart.type)){
            throw new Error(`${this.type} does not accept subparts of type ${aPart.type}`);
        }

        let found = this.subparts.indexOf(aPart);
        if(found < 0){
            // if the part is a stack then append after the last stack
            if(aPart.type == "stack"){
                let allStacks = this.subparts.filter((part) => {
                    return part.type == "stack";
                });
                this.subparts.splice(allStacks.length, 0, aPart);
            } else {
                this.subparts.push(aPart);
            }
            aPart._owner = this;
        }
    }

    moveSubpartDown(part){
        let currentIndex = this.subparts.indexOf(part);
        let lastValidPartIndex = this.subparts.length - 1;
        if(part.type == "stack"){
            let allStacks = this.subparts.filter((part) => {
                return part.type == "stack";
            });
            lastValidPartIndex = allStacks.length - 1;
        }
        if(currentIndex < lastValidPartIndex){
            this.subpartOrderChanged(part.id, currentIndex, currentIndex + 1);
        }
    }

    moveSubpartToLast(part){
        let currentIndex = this.subparts.indexOf(part);
        let lastValidPartIndex = this.subparts.length - 1;
        if(part.type == "stack"){
            let allStacks = this.subparts.filter((part) => {
                return part.type == "stack";
            });
            lastValidPartIndex = allStacks.length - 1;
        }
        if(currentIndex < lastValidPartIndex){
            this.subpartOrderChanged(part.id, currentIndex, lastValidPartIndex);
        }
    }

    moveSubpartUp(part){
        let currentIndex = this.subparts.indexOf(part);
        let firstValidPartIndex = 0;
        if(part.type != "stack"){
            let allStacks = this.subparts.filter((part) => {
                return part.type == "stack";
            });
            firstValidPartIndex = allStacks.length;
        }
        if(currentIndex > firstValidPartIndex){
            this.subpartOrderChanged(part.id, currentIndex, currentIndex - 1);
        }
    }

    moveSubpartToFirst(part){
        let currentIndex = this.subparts.indexOf(part);
        let firstValidPartIndex = 0;
        if(part.type != "stack"){
            let allStacks = this.subparts.filter((part) => {
                return part.type == "stack";
            });
            firstValidPartIndex = allStacks.length;
        }
        if(currentIndex > firstValidPartIndex){
            this.subpartOrderChanged(part.id, currentIndex, firstValidPartIndex);
        }
    }

};




/***/ }),

/***/ "./js/objects/properties/PartProperties.js":
/*!*************************************************!*\
  !*** ./js/objects/properties/PartProperties.js ***!
  \*************************************************/
/*! exports provided: PartProperties, BasicProperty, CustomProperty, DynamicProperty, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PartProperties", function() { return PartProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicProperty", function() { return BasicProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomProperty", function() { return CustomProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicProperty", function() { return DynamicProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PartProperties; });
/* harmony import */ var _utils_styler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils//styler.js */ "./js/objects/utils/styler.js");


/**
 * PartProperties
 * ------------------------------------
 * I am an object representing the base
 * Part Properties for all Parts.
 * I also include some convenience methods
 * on my prototype that should be used by
 * other Parts when they inherit from me.
 * For now, we use Object.create() for inheritance.
 */

class BasicProperty {
    constructor(name, defaultValue, readOnly=false, aliases=[]){
        this.name = name;
        this._value = defaultValue;
        this.readOnly = readOnly;
        this.aliases = aliases;

        // Bound methods
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.hasAlias = this.hasAlias.bind(this);
        this.matches = this.matches.bind(this);
        this.matchesNameOrAlias = this.matchesNameOrAlias.bind(this);
    }

    // For basic properties, we return
    // the set/stored value
    getValue(owner){
        return this._value;
    }

    // For the basic properties, we set
    // based on the incoming desired value
    // alone (nothing is computed)
    setValue(owner, val, notify=true){
        if(!this.readOnly){
            this._value = val;
            if(notify){
                owner.propertyChanged(
                    this.name,
                    val
                );
            }
        }
    }

    // Returns true if this property
    // goes by the given alias
    hasAlias(anAlias){
        return this.aliases.includes(anAlias);
    }

    // Returns true if the given name is
    // either an alias or the exact name
    // for this property
    matchesNameOrAlias(aNameOrAlias){
        if(this.hasAlias(aNameOrAlias)){
            return true;
        } else if(aNameOrAlias == this.name){
            return true;
        }
        return false;
    }

    // Returns true if the incoming Property
    // has the same name and/or one of the same
    // aliases as this Property
    matches(aProperty){
        if(aProperty.name == this.name){
            return true;
        } else {
            for(let i = 0; i < this.aliases.length; i++){
                let myAlias = this.aliases[i];
                if(aProperty.hasAlias(myAlias)){
                    return true;
                }
            }
        }
        return false;
    }
};


/** Custom Properties are similar to dynamic props, except that
  * under the hood they store an object of properties
  * storing props defined within the ST environment. The find()
  * add() delete() methods find, add, or remove properties from the
  * this.customProperties object.
 **/
class CustomProperty extends BasicProperty {
    constructor(name="custom-properties", defaultValue={}, readOnly=false, aliases=[]){
        super(name, defaultValue, readOnly=false, aliases);
    }

    find(name){
        let prop = this._value[name];
        if(prop){
            return prop;
        }
        return null;
    }

    add(aProperty){
        // NOTE: aliases are completed ignored for now
        if(!this.find(aProperty.name)){
            this._value[aProperty.name] = aProperty;
        }
    }

    delete(aProperty){
        delete this._value[aProperty.name];
    }



};

class DynamicProperty extends BasicProperty {
    constructor(name, setter, getter, readOnly=false, defaultValue=null, aliases=[]){
        super(name, defaultValue, readOnly, aliases);
        this.valueSetter = setter;
        this.valueGetter = getter;
    }

    // In this override, we use the getter
    // if available, to dynamically get the
    // incoming value.
    getValue(owner){
        return this.valueGetter(owner, this);
    }

    // In this override, we use the setter
    // if available, to dynamically set the
    // incoming value
    setValue(owner, val, notify=true){
        if(!this.readOnly){
            this.valueSetter(owner, this, val, notify);
            if(notify){
                owner.propertyChanged(
                    this.name,
                    val
                );
            }
        }
    }
};


/** I am a special property which handles interfacing with the
  * the cssStyle basic property. Whenever I am updated I make
  * sure to update the cssStyle property via the styler utility
  * function. I can be used to create different and indepent
  * styling options.
  **/
class StyleProperty extends BasicProperty {
    constructor(name, defaultValue,  propName='cssStyle', styler=_utils_styler_js__WEBPACK_IMPORTED_MODULE_0__["default"], readOnly=false, aliases=[]){
        super(name, defaultValue, readOnly, aliases);
        this.propName = propName;
        this.styler = styler;
    }

    // In this override, we update the cssStyle property
    setValue(owner, val, notify=true){
        if(!this.readOnly){
            let styleProperty = owner.partProperties.findPropertyNamed(this.propName);
            let style = styleProperty.getValue(owner);
            let newStyle = this.styler(style, this.name, val);
            styleProperty.setValue(owner, newStyle, notify);

            // set my value as well
            this._value = val;
            if(notify){
                owner.propertyChanged(
                    this.name,
                    val
                );
            }
        }
    }
};

class PartProperties {
    constructor(){
        this._properties = [];

        // Bound methods
        this.hasProperty = this.hasProperty.bind(this);
        this.addProperty = this.addProperty.bind(this);
        this.removeProperty = this.removeProperty.bind(this);
        this.findPropertyNamed = this.findPropertyNamed.bind(this);
        this.setPropertyNamed = this.setPropertyNamed.bind(this);
        this.getPropertyNamed = this.getPropertyNamed.bind(this);
        this.newBasicProp = this.newBasicProp.bind(this);
        this.newStyleProp = this.newStyleProp.bind(this);
        this.newDynamicProp = this.newDynamicProp.bind(this);
        this._indexOfProperty = this._indexOfProperty.bind(this);
    }

    get all(){
        return this._properties;
    }

    // This collection 'has' a property if it contains
    // a Property object with matching name or alias
    // of the incoming property.
    hasProperty(aProperty){
        for(let i = 0; i < this._properties.length; i++){
            let prop = this._properties[i];
            if(aProperty.matches(prop)){
                return true;
            }
        }
        return false;
    }

    // Find one of my Properties by
    // a name or alias. Returns null
    // if no match found. Perhaps we should
    // throw an error
    findPropertyNamed(aName){
        let found = null;
        let customPropertiesProp;
        for(let i = 0; i < this._properties.length; i++){
            let prop = this._properties[i];
            if(prop.matchesNameOrAlias(aName)){
                found = prop;
            }
            // grab the custom properties prop, as we might need it
            // for later
            if(prop.matchesNameOrAlias("custom-properties")){
                customPropertiesProp = prop;
            }
        }
        // see if the property is custom
        if(!found && customPropertiesProp){
            found = customPropertiesProp.find(aName);
        }
        return found;
    }

    // Attempts to get the *value* of the property
    // with the given name or alias.
    // If the property is not found, we throw an
    // error
    getPropertyNamed(owner, aName){
        let found = this.findPropertyNamed(aName);
        if(!found){
            throw new Error(`${owner} does not have property "${aName}"`);
        }
        return found.getValue(owner);
    }

    // Attempts to set the *value* of the property
    // with the given name or alias.
    // If the property is not found, we throw an
    // error
    setPropertyNamed(owner, aName, aValue, notify=true){
        let found = this.findPropertyNamed(aName);
        if(!found){
            throw new Error(`${owner} does not have property "${aName}"`);
        }
        return found.setValue(owner, aValue, notify);
    }

    // If you add a property with a name or alias
    // that is already present in the collection,
    // then we 'overwrite' it by removing the exising
    // property and replacing it with the incoming one.
    // Otherwise, we just add the property
    addProperty(aProperty){
        if(this.hasProperty(aProperty)){
            this.removeProperty(aProperty);
        }
        this._properties.push(aProperty);
    }

    // Removing a property here means removing
    // it from the stored array. If the property
    // is not in the array, we do NOT throw an error.
    // We just go on with our lives, because who cares?
    removeProperty(aProperty){
        let propIndex = this._indexOfProperty(aProperty);
        if(propIndex >= 0){
            this._properties.splice(propIndex, 1);
        }
    }

    // Convenience method for creating a new basic
    // property.
    newBasicProp(...args){
        let newProp = new BasicProperty(...args);
        this.addProperty(newProp);
    }

    // Convenience method for creating a new custom
    // property.
    newCustomProp(...args){
        let newProp = new CustomProperty(...args);
        this.addProperty(newProp);
    }

    // Convenience method for creating a new style
    // property.
    newStyleProp(...args){
        let newProp = new StyleProperty(...args);
        this.addProperty(newProp);
    }

    // Convenience method for creating a new
    // dynamic prop
    newDynamicProp(...args){
        let newProp = new DynamicProperty(...args);
        this.addProperty(newProp);
    }

    // Private method. Finds the first occurring
    // index of the given Property in the array
    // of properties in this collection. Returns
    // -1 if not found, per JS implementation.
    _indexOfProperty(aProperty){
        for(let i = 0; this._properties.length; i++){
            let prop = this._properties[i];
            if(aProperty.matches(prop)){
                return i;
            }
        }
        return -1;
    }
};




/***/ }),

/***/ "./js/objects/utils/AltSyntaxHighlighter.js":
/*!**************************************************!*\
  !*** ./js/objects/utils/AltSyntaxHighlighter.js ***!
  \**************************************************/
/*! exports provided: createHighlighter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHighlighter", function() { return createHighlighter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createHighlighter; });
/** Second pass at syntax highlighter semantics **/
const syntaxSpan = (ruleName) => {
    let span = document.createElement('span');
    span.classList.add('st-syntax');
    span.setAttribute('data-st-rule', ruleName);
    return span;
}

const createHighlighter = (fieldElement) => {
    return {
        MessageHandlerOpen: function(literalOn, messageName, optionalParamList){
            let span = syntaxSpan("MessageHandlerOpen");
            let onSpan = syntaxSpan("keyword");
            onSpan.append("on ");
            span.append(onSpan);

            // Append sub-rules
            span.append(messageName.highlightSyntax());
            span.append(...optionalParamList.highlightSyntax());

            return span;
        },

        MessageHandlerClose(literalEnd, messageName){
            let span = syntaxSpan("MessageHandlerClose");
            let endSpan = syntaxSpan("keyword");
            endSpan.append("end ");
            span.append(endSpan);

            // Add the parts
            span.append(messageName.highlightSyntax());

            return span;
        },

        ParameterList: function(paramString){
            let outer = syntaxSpan("ParameterList");
            let innerItems = paramString.asIteration().children.map(paramName => {
                let span = syntaxSpan("ParameterList-item");
                span.append(paramName.sourceString);
                return span.outerHTML;
            });
            outer.innerHTML = innerItems.join(", ");
            return outer;
            
        },

        messageName: function(string){
            let span = document.createElement('span');
            span.classList.add('st-syntax');
            span.setAttribute('data-st-rule', 'messageName');
            span.append(string.sourceString + " ");
            return span;
        },

        keyword: function(string){
            let span = document.createElement('span');
            span.classList.add('st-syntax');
            span.setAttribute('data-st-rule', 'keyword');
            span.append(string.sourceString);
            return span;
        }
    };
};




/***/ }),

/***/ "./js/objects/utils/clipboard.js":
/*!***************************************!*\
  !*** ./js/objects/utils/clipboard.js ***!
  \***************************************/
/*! exports provided: STClipboard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STClipboard", function() { return STClipboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return STClipboard; });
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id.js */ "./js/objects/utils/id.js");
/* harmony import */ var _serialization_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serialization.js */ "./js/objects/utils/serialization.js");
/**
 * Utilities for Clipboard Functionality
 * ------------------------------------------
 * For the moment we use a very primitive stand-in
 * since the Clipboard API is not standardized across
 * browser implementations.
 **/



class STClipboard {
    constructor(aSystem){
        this.system = aSystem;
        this.contents = [];

        // Bound methods
        this.copyPart = this.copyPart.bind(this);
        this.pasteContentsInto = this.pasteContentsInto.bind(this);
        this._createLensedChildren = this._createLensedChildren.bind(this);
    }

    copyPart(aPart){
        let serializer = new _serialization_js__WEBPACK_IMPORTED_MODULE_1__["STSerializer"](this.system);
        let rootSerialization = serializer.serialize(aPart, false);
        let item = new STClipboardItem(
            'simpletalk/json',
            rootSerialization,
            aPart.type
        );
        this.contents = [item];
    }

    pasteContentsInto(aTargetPart){
        let promises = this.contents.map(clipboardContent => {
            let serializedContent = clipboardContent.data;
            let deserializer = new _serialization_js__WEBPACK_IMPORTED_MODULE_1__["STDeserializer"](this.system);
            deserializer.targetId = aTargetPart.id;
            return deserializer.deserialize(serializedContent)
                .then(() => {
                    // Reset the top and left values to that
                    // the pasted part doesn't run outside of the new
                    // relative bounds in which it has been pasted
                    let newPart = deserializer.rootParts[0];
                    let hasTop = newPart.partProperties.findPropertyNamed('top');
                    let hasLeft = newPart.partProperties.findPropertyNamed('left');
                    if(hasTop){
                        newPart.partProperties.setPropertyNamed(
                            newPart,
                            'top',
                            10
                        );
                    }
                    if(hasLeft){
                        newPart.partProperties.setPropertyNamed(
                            newPart,
                            'left',
                            10
                        );
                    }
                    
                    // Open Halo on the new view
                    deserializer.rootViews[0].openHalo();

                    // Dispatch the CustomEvent that notifies listeners
                    // that a new view was added (used by Nav etc)
                    let event = new CustomEvent('st-view-added', {
                        detail: {
                            partType: newPart.type,
                            partId: newPart.id,
                            ownerId: newPart._owner.id
                        }
                    });
                    deserializer.rootViews[0].dispatchEvent(event);

                    // Add any lensed views that might be needed
                    let rootLensViews = this.system.findLensViewsById(newPart._owner.id);
                    rootLensViews.forEach(lensView => {
                        let newLensView = document.createElement(
                            this.system.tagNameForViewNamed(newPart.type)
                        );
                        newLensView.setModel(newPart);
                        newLensView.removeAttribute('part-id');
                        newLensView.setAttribute('lens-part-id', newPart.id);
                        newLensView.setAttribute('role', 'lens');
                        lensView.appendChild(newLensView);
                        this._createLensedChildren(newLensView, newPart.subparts);
                    });
                    
                    return;
                })
                .catch(err => {
                    throw err;
                });
        });
        return Promise.all(promises);
    }

    _createLensedChildren(aLensView, subparts){
        subparts.forEach(subpart => {
            let newLensView = document.createElement(
                this.system.tagNameForViewNamed(subpart.type)
            );
            newLensView.setModel(subpart);
            newLensView.removeAttribute('part-id');
            newLensView.setAttribute('lens-part-id', subpart.id);
            newLensView.setAttribute('role', 'lens');
            aLensView.appendChild(newLensView);
            this._createLensedChildren(newLensView, subpart.subparts);
        });
    }
    
    get isEmpty(){
        return this.contents.length <= 0;
    }
}

class STClipboardItem {
    constructor(mimeType, data, partType){
        if(mimeType){
            this.type = mimeType;
        }
        if(partType){
            this._partType = partType;
        }
        if(data){
            this.data = data;
        }
    }

    get partType(){
        if(this.type == 'simpletalk/json'){
            return this._partType;
        }
        return null;
    }

    set partType(val){
        this._partType = val;
    }
};




/***/ }),

/***/ "./js/objects/utils/errorHandler.js":
/*!******************************************!*\
  !*** ./js/objects/utils/errorHandler.js ***!
  \******************************************/
/*! exports provided: errorHandler, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorHandler", function() { return errorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return errorHandler; });
/**
 * Error Handler
 * ------------------------------------
 * I am responsible for handler all
 * System-wide errors
 */

const errorHandler = {

    handle: function(aMessage){
        switch(aMessage.name){
            case 'GrammarMatchError':
                return this.handleGrammarMatchError(aMessage);
            case 'MessageNotUnderstood':
                return this.handleMessageNotUnderstood(aMessage);
            default:
                // if I don't know what to do with this message
                // I send it along to the System
                return window.System.receiveMessage(aMessage);
        }
    },

    handleGrammarMatchError: function(aMessage){
        // TODO is there a more structured way to get this out of ohm?
        let regex = /Line (?<line>\d), col (?<column>\d)/;
        let match = aMessage.parsedScript.message.match(regex);
        let errorLineNum = parseInt(match.groups["line"]) - 1; // ohm lines start with 1 
        // see if the grammar rule has been identified
        let ruleName;
        let rightMostFailures = aMessage.parsedScript.getRightmostFailures();
        if(rightMostFailures[1]){
            ruleName = rightMostFailures[1].pexpr.ruleName;
        }
        // get some more info about what the parser expected
        let expectedText = aMessage.parsedScript.getExpectedText();
        // get the original script
        let text = aMessage.parsedScript.input;
        let textLines = text.split("\n");
        // replace said text line with an error marker
        textLines[errorLineNum] += ` --<<<[Expected:${expectedText}; ruleName: "${ruleName}"]`;
        text = textLines.join("\n");
        // if the first message in the parsed script is "doIt" then the statementLines are
        // located in the corresponding field text, not the script, property and
        // we want the error to be marked up in the field textarea
        if(aMessage.parsedScript.input.startsWith("on doIt")){
            let originalSenderModel = window.System.partsById[aMessage.partId];
            // we need to get the original text so as not to completely replace it
            // then insert the markup in the appropriate line
            let fieldText = originalSenderModel.partProperties.getPropertyNamed(originalSenderModel, "text");
            let script = aMessage.parsedScript.input;
            script = this._cleanDoItSCript(script);
            // we don't want the "doIt" handler inserted back in, since it's just a hidden wrapper for the
            // statement lines
            text = this._cleanDoItSCript(text);
            fieldText = fieldText.replace(script, text);
            originalSenderModel.partProperties.setPropertyNamed(originalSenderModel, "text", fieldText);
        } else {
            // first locate the script editor in question
            let scriptEditor = window.System.findScriptEditorByTargetId(aMessage.partId);
            if(!scriptEditor){
                this._openScriptEditor(aMessage.partId);
                scriptEditor = window.System.findScriptEditorByTargetId(aMessage.partId);
            }
            scriptEditor.model.partProperties.setPropertyNamed(scriptEditor.model, "text", text);
        }
        // open the grammar if there is not one open already
        let currentCard = window.System.getCurrentCardModel();
        let grammar = currentCard.subparts.filter((part) => {
            return (part.type == "field") && (part.partProperties.getPropertyNamed(part, "name") == "SimpleTalk");
        });
        if(grammar.length == 0){
            this._openGrammar(aMessage.partId, ruleName);
        }
    },

    handleMessageNotUnderstood(aMessage){
        let offendingMessage = aMessage.message;
        let originalSender = offendingMessage.senders[0];
        // Are we ever going to have MNU errors on messages that
        // are not type: command?
        if(offendingMessage.type === "command"){
            let commandName = offendingMessage.commandName;
            let originalSenderModel = window.System.partsById[originalSender.id];
            let regex = new RegExp(`\\s*${commandName}(\s|\n|$)`, 'g');
            let text;
            let target;
            let executionStack = window.System.executionStack._stack;
            // if the first message in the execution stack is "doIt" then the statementLines are
            // located in the corresponding field text, not the script, property and
            // we want the error to be marked up in the field textarea
            if(executionStack[0] && executionStack[0].messageName == "doIt"){
                target = executionStack[0].part;
                text = target.partProperties.getPropertyNamed(originalSenderModel, 'text');
            } else {
                text = originalSenderModel.partProperties.getPropertyNamed(originalSenderModel, 'script');
                let scriptEditor = window.System.findScriptEditorByTargetId(originalSender.id);
                if(!scriptEditor){
                    this._openScriptEditor(originalSender.id);
                    scriptEditor = window.System.findScriptEditorByTargetId(originalSender.id);
                }
                if(scriptEditor){
                    target = scriptEditor.model;
                }
            }
            // TODO Sort this out
            if(target){
                let textLines = text.split("\n");
                // offending command text line with an error marker
                for(let i = 0; i < textLines.length; i++){
                    let line = textLines[i];
                    if(line.match(regex)){
                        textLines[i] = line += ` --<<<[MessageNotUnderstood: command; commandName: "${commandName}"]`;
                    }
                }
                text = textLines.join("\n");
                target.partProperties.setPropertyNamed(target, "text", text);

            }
            // finally open the debugger (or current version thereof)
            // NOTE: this is a bit dangerous, b/c if the System doesn't
            // handle the `openDebugger` command anywhere it will throw
            // a MNU error, which will then invoke this handler cuasing
            // an infinite loop!
            this._openDebugger(originalSender.id);
        }
    },

    _cleanDoItSCript(script){
        // clean up the DoIt script by removing the handler
        // newlines, tabs and spaces
        script = script.replace("on doIt", "");
        script = script.replace("end doIt", "");
        script = script.replace(/^[\n\t ]+/, "");
        script = script.replace(/[\n\t ]+$/, "");
        return script;
    },

    _openScriptEditor: function(partId){
        let target = window.System.partsById[partId];
        let msg = {
            type: "command",
            "commandName": "openScriptEditor",
            args: [partId]
        };
        target.sendMessage(msg, target);
    },

    _openGrammar: function(partId, ruleName){
        let target = window.System.partsById[partId];
        let statementLines = [
            'if there is not a field "SimpleTalk" of current card',
            'then',
            'add field "SimpleTalk" to current card',
            'tell field "SimpleTalk" of current card to set "editable" to false',
            'SimpleTalk',
            'tell field "SimpleTalk"of current card to set "text" to it',
            'end if'
        ];
        let script = `on doIt\n   ${statementLines.join('\n')}\nend doIt`;
        target.sendMessage(
            {
                type: "compile",
                codeString: script,
                targetId: target.id
            },
            target
        );
        target.sendMessage(
            {
                type: "command",
                commandName: "doIt",
                args: [],
                shouldIgnore: true // Should ignore if System DNU
            },
            target
        );
    },

    // At the moment this simply opens a st-window st-field with
    // information about the available commands for said parts
    _openDebugger: function(partId){
        let target = window.System.partsById[partId];
        let msg = {
            type: "command",
            "commandName": "openDebugger",
            args: [partId]
        };
        target.sendMessage(msg, target);
    }
};




/***/ }),

/***/ "./js/objects/utils/handInterface.js":
/*!*******************************************!*\
  !*** ./js/objects/utils/handInterface.js ***!
  \*******************************************/
/*! exports provided: Testables, handInterface, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Testables", function() { return Testables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handInterface", function() { return handInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handInterface; });
const video = document.createElement('video');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const scaleDim = (dim) => {
    const scale = 0.7;
    const stride = 16;
    const evenRes = dim * scale - 1;
    return evenRes - (evenRes % stride) + 1;
};

const detectHands = async () => {
    if (!handInterface.handDetectionRunning) {
        return;
    }
    const scaledWidth = scaleDim(canvas.width);
    const scaledHeight = scaleDim(canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = tf.tidy(() => {
        return tf.fromPixels(canvas).resizeBilinear([scaledHeight, scaledWidth]).expandDims(0);
    });
    const [scores, tboxes] = await handInterface.handDetectionModel.executeAsync(image);
    image.dispose();
    const handsDetected = tf.tidy(() => {
        const indices = tf.image.nonMaxSuppression(
            tboxes.reshape([tboxes.shape[1], tboxes.shape[3]]),
            scores.reshape([scores.shape[1]]),
            20,
            0.5,
            0.85).dataSync();
        var boxes = [];
        var idx;
        for (let i = 0; i < indices.length; i++) {
            idx = indices[i];
            var score = scores.get(0, idx, 0);
            // Original order is [minY, minX, maxY, maxX] so we reorder.
            var box = {
                upperLeft: [tboxes.get(0, idx, 0, 1), tboxes.get(0, idx, 0, 0)],
                lowerRight: [tboxes.get(0, idx, 0, 3), tboxes.get(0, idx, 0, 2)]
            };
            boxes.push({score: score, box: box});
        }
        return {boxes: boxes, timestamp: Date.now()};
    });
    scores.dispose();
    tboxes.dispose();
    if (handsDetected.boxes.length !== 1) {
        if (handInterface.handDetectionRunning) {
            window.requestAnimationFrame(detectHands);
        }
        return;
    }
    const box = handsDetected.boxes[0].box;
    const [x1, y1] = box.upperLeft;
    const [x2, y2] = box.lowerRight;
    const area = {area: (x2 - x1) * (y2 - y1), timestamp: Date.now()};
    handInterface.handDetectionAreas = [].concat(handInterface.handDetectionAreas.slice(-2), [area]);
    // Update hand location
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const p = [0.5 * (x1 + x2) * vw, 0.5 * (y1 + y2) * vh];
    handInterface.positions = [].concat(handInterface.positions.slice(-2), [p]);
    var target = handInterface.targetElement;
    if (target === null) {
        target = handInterface.leninHand;
    }
    // Compute average position
    const [p1, p2, p3] = handInterface.positions;
    const [ap1, ap2] = [(1/3)*(p1[0] + p2[0] + p3[0]), (1/3)*(p1[1] + p2[1] + p3[1])];
    target.partProperties.setPropertyNamed(target, "left", ap1);
    target.partProperties.setPropertyNamed(target, "top", ap2);
    // Extract area information without any timestamps
    var justAreas = [];
    for (var i = 0; i < handInterface.handDetectionAreas.length; ++i) {
        justAreas.push(handInterface.handDetectionAreas[i].area);
    }
    var justAreas = [].concat(Array(3 - justAreas.length).fill(0), justAreas);
    // Check if hand is pushing in
    const [a1, a2, a3] = justAreas;
    const aveArea = (1/3) * (a1 + a2 + a3);
    if (aveArea > 0.25) {
        if (!handInterface.handMasked) {
            handInterface.handMasked = true;
            setTimeout(() => { handInterface.handMasked = false; }, 3000);
            if (handInterface.targetElement === null) {
                let closestView = findClosestView([p1, p2]);
                if (closestView !== null) {
                    handInterface.leninHand.partProperties.setPropertyNamed(handInterface.leninHand, "hide", true);
                    handInterface.targetElement = closestView.model;
                }
            } else {
                handInterface.leninHand.partProperties.setPropertyNamed(handInterface.leninHand, "hide", false);
                handInterface.targetElement = null;
            }
        }
    }
    if (handInterface.handDetectionRunning) {
        window.requestAnimationFrame(detectHands);
    }
};

const findClosestView = (point) => {
    let views = [];
    window.System.getCurrentCardModel().subparts.forEach((part) => {
        let partViews = window.System.findViewsById(part.id);
        partViews.forEach((view) => {
            views.push(view);
        })
    });
    var [closestDist, closestView] = [Infinity, null];
    views.forEach((view) => {
        let viewDist = dist(point, getVertices(view));
        if (viewDist < closestDist) {
            closestDist = viewDist;
            closestView = view;
        }
    });
    return closestView;
}

// https://aaronsmith.online/easily-load-an-external-script-using-javascript/
const loadScript = src => {
    return new Promise((resolve, reject) => {
        if (typeof window.tf !== 'undefined') {
            console.log("tensorflowjs already loaded");
            resolve();
            return;
        }
        console.log("loading tensorflowjs");
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        script.src = src;
        document.head.append(script);
    });
};

const loadHandDetectionModel = () => {
    handInterface.handDetectionAreas = [];
    loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.13.5/dist/tf.js").then(() => {
        window.tf.loadFrozenModel(
            "https://cdn.jsdelivr.net/npm/handtrackjs/models/web/ssdlitemobilenetv2/tensorflowjs_model.pb",
            "https://cdn.jsdelivr.net/npm/handtrackjs/models/web/ssdlitemobilenetv2/weights_manifest.json"
        ).then(model => {
            console.log("hand detection model loaded");
            handInterface.handDetectionModel = model;
        }).then(() => {
            return navigator.mediaDevices.getUserMedia({ video: true });
        }).then(stream => {
            video.srcObject = stream;
            return video.play();
        }).then(() => {
            console.log("video started");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.setTransform(-1, 0, 0, 1, canvas.width, 0); // Mirror incoming video
            handInterface.handDetectionRunning = true;
            handInterface.leninHand = window.System.newModel('image', window.System.getWorldStackModel().id, "/images/leninHand.png");
            handInterface.targetElement = null;
            window.requestAnimationFrame(detectHands);
        }).catch(err => {
            console.log("error loading hand detection model");
            console.log(err);
        });
    });
}

const unloadHandDetectionModel = () => {
    handInterface.handDetectionRunning = false;
    window.System.deleteModel(handInterface.leninHand.id)
    handInterface.leninHand = null;
    video.pause();
    const tracks = video.srcObject.getTracks();
    for (var i = 0; i < tracks.length; i++) {
        tracks[i].stop();
    }
    video.srcObject = null;
    console.log("video stopped");
    handInterface.handDetectionModel = null;
    console.log("unloading hand detection model");
}

const getVertices = (element) => {
    const rect = element.getBoundingClientRect();
    const upperLeft = [rect.x, rect.y];
    const upperRight = [rect.x + rect.width, rect.y];
    const lowerLeft = [rect.x, rect.y + rect.height];
    const lowerRight = [rect.x + rect.width, rect.y + rect.height];
    return {
        upperLeft: upperLeft,
        upperRight: upperRight,
        lowerLeft: lowerLeft,
        lowerRight: lowerRight
    };
}

const dist = (point, vertices) => {
    const [p1, p2] = point;
    const [ul1, ul2] = vertices.upperLeft;
    const [ll1, ll2] = vertices.lowerLeft;
    const [ur1, ur2] = vertices.upperRight;
    const [lr1, lr2] = vertices.lowerRight;
    // First check if the point is inside the rectangle
    // Next we compute the vector pointing from the point to the closest point
    // on the rectangle. There are 9 cases. The first is when the poinst is
    // inside the rectangle. The next four cases are if the point in one of
    // the four corners and the final four cases are when the point is on one
    // of the four sides.
    var [v1, v2] = [null, null];
    if ((ul1 <= p1) && (p1 <= lr1) && (ul2 <= p2) && (p2 <= lr2)) {
        // Case 0: inside the rectangle
        [v1, v2] = [0, 0];
    } else if ((p1 <= ul1) && (p2 <= ul2)) {
        // Case 1: upper left
        [v1, v2] = [ul1 - p1, ul2 - p2];
    } else if ((p1 >= ur1) && (p2 <= ur2)) {
        // Case 2: upper right
        [v1, v2] = [ur1 - p1, ur2 - p2];
    } else if ((p1 <= ll1) && (p2 >= ll2)) {
        // Case 3: lower left
        [v1, v2] = [ll1 - p1, ll2 - p2];
    } else if ((p1 >= lr1) && (p2 >= lr2)) {
        // Case 4: lower right
        [v1, v2] = [lr1 - p1, lr2 - p2];
    } else if (p1 <= ul1) {
        // Case 5: side left
        [v1, v2] = [ul1 - p1, 0];
    } else if (p1 >= lr1) {
        // Case 6: side right
        [v1, v2] = [lr1 - p1, 0];
    } else if (p2 <= ul2) {
        // Case 7: side top
        [v1, v2] = [0, ul2 - p2];
    } else if (p2 >= lr2) {
        // Case 8: side bottom
        [v1, v2] = [0, lr2 - p2];
    } else {
        // Case 9: inside
        [v1, v2] = [0, 0];
    }
    return Math.sqrt(v1*v1 + v2*v2);
}

class HandInterface {
    constructor() {
        this.handDetectionModel = null;
        this.handDetectionRunning = false;
        this.leninHand = null;
        this.handMasked = false;
        this.targetElement = null;
        this.handDetectionAreas = [];
        this.positions = [[0, 0], [0, 0], [0, 0]];
        // XXX - Only here to ignore the tensorflow warnings
        console.warn = () => {};
    }

    start() {
        loadHandDetectionModel();
    }

    stop() {
        unloadHandDetectionModel();
    }
}

const Testables = {
    dist: dist
}

const handInterface = new HandInterface();




/***/ }),

/***/ "./js/objects/utils/icons.js":
/*!***********************************!*\
  !*** ./js/objects/utils/icons.js ***!
  \***********************************/
/*! exports provided: partIcons, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partIcons", function() { return partIcons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return partIcons; });
let partIcons = {};

partIcons.world = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <line x1="3.6" y1="9" x2="20.4" y2="9" />
  <line x1="3.6" y1="15" x2="20.4" y2="15" />
  <path d="M11.5 3a17 17 0 0 0 0 18" />
  <path d="M12.5 3a17 17 0 0 1 0 18" />
</svg>
`;

partIcons.stack = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-stack" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="12 4 4 8 12 12 20 8 12 4" />
  <polyline points="4 12 12 16 20 12" />
  <polyline points="4 16 12 20 20 16" />
</svg>
`;

partIcons.card = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="4" y="4" width="16" height="16" rx="2" />
</svg>
`;

partIcons.button = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-hand-finger" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
  <path d="M11 11.5v-2a1.5 1.5 0 1 1 3 0v2.5" />
  <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
  <path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
</svg>
`;

partIcons.window = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-window" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 3c-3.866 0 -7 3.272 -7 7v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1v-10c0 -3.728 -3.134 -7 -7 -7z" />
  <line x1="5" y1="13" x2="19" y2="13" />
  <line x1="12" y1="3" x2="12" y2="21" />
</svg>
`;

partIcons.area = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shape" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="5" cy="5" r="2" />
  <circle cx="19" cy="5" r="2" />
  <circle cx="5" cy="19" r="2" />
  <circle cx="19" cy="19" r="2" />
  <line x1="5" y1="7" x2="5" y2="17" />
  <line x1="7" y1="5" x2="17" y2="5" />
  <line x1="7" y1="19" x2="17" y2="19" />
  <line x1="19" y1="7" x2="19" y2="17" />
</svg>
`;

partIcons.field = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-forms" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
  <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
  <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
  <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
  <path d="M17 12h.01" />
  <path d="M13 12h.01" />
</svg>
`;

partIcons.drawing = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-palette" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
  <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
  <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
  <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
</svg>
`;

partIcons.image = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="15" y1="8" x2="15.01" y2="8" />
  <rect x="4" y="4" width="16" height="16" rx="3" />
  <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
  <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
</svg>
`;

partIcons.generic = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
</svg>
`;




/***/ }),

/***/ "./js/objects/utils/id.js":
/*!********************************!*\
  !*** ./js/objects/utils/id.js ***!
  \********************************/
/*! exports provided: idMaker, isValidId, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idMaker", function() { return idMaker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidId", function() { return isValidId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return idMaker; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
// ID related utilities



/**
 * ID Maker
 * ------------------------------------
 * I am responsible for creating globally
 * unique ID values for Parts in the SimpleTalk
 * world.
 * HC requires that all Parts have unique ids and
 * that these should not be repeated in any given
 * "application" instance.
 * We need to determine what an "application" is
 * in our context, but regardless we can use this
 * module as a drop in replacement, implementing
 * UUIDs or URLs or whatever we want.
 * For now we just increment an integer.
 */
const idMaker = {
    new: function(){
        let id = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])();
        return id.replace(/-/g, '');
    }
};

/* ID checker
 * --------------------------------------
 * I am responsible for checking whether an id is
 * is valid and returning it if so
 */
const isValidId = function(id) {
    if(id === null || id === undefined || id === ""){
        return false;
    }
    if(id.length != 32 || id.match('[a-z0-9]*')[0].length != 32) {
        return false;
    }
    return id;
};




/***/ }),

/***/ "./js/objects/utils/merriamInterface.js":
/*!**********************************************!*\
  !*** ./js/objects/utils/merriamInterface.js ***!
  \**********************************************/
/*! exports provided: merriamSimScore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merriamSimScore", function() { return merriamSimScore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return merriamSimScore; });
const merriamSimScore = async (sender, docId) => {
    const url = "https://patents.merriamtech.com/_api/merriam/"
    const payload = {
        "fields": [
            "title",
            "date_publ"
        ],
        "weights": {
            "merriam":0.7,
            "date":0.3,
            "hierarchy":0.1
        },
        "doc_ids": [
            docId
        ],
        "limit": 5}
    const params = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(payload)
    }
    fetch(url, params).then(data => {
        return data.json();
    }).then(json => {
        const msg = {
            type: 'command',
            commandName: 'merriamresult',
            args: [
                JSON.stringify(json)
            ]
        };
        sender.sendMessage(msg, sender);
    });
}




/***/ }),

/***/ "./js/objects/utils/serialization.js":
/*!*******************************************!*\
  !*** ./js/objects/utils/serialization.js ***!
  \*******************************************/
/*! exports provided: STSerializer, STDeserializer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STSerializer", function() { return STSerializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STDeserializer", function() { return STDeserializer; });
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id.js */ "./js/objects/utils/id.js");
/**
 * Serialization and Deserialization Utility Classes
 */


const version = "0.0.2";

class STDeserializer {
    constructor(aSystem){
        this.system = aSystem;

        // These caches are used during the process
        // as optimizations
        this._modelCache = {};
        this._subpartMapCache = {};
        this._idCache = {};
        this._instanceCache = [];
        this._propsCache = {};
        this._viewsCache = {};
        this._scriptCache = {};
        this._rootsCache = [];

        // The targetId is the id of
        // the Part that we wish to append any
        // deserialized subpart tree into.
        // By default we assume the whole system,
        // ie full deserialization.
        this.targetId = 'system';
        // the root id is the id of the root part instance
        // being attached
        this.rootId = null;

        // Bound methods
        this.deserialize = this.deserialize.bind(this);
        this.deserializeData = this.deserializeData.bind(this);
        this.deserializePart = this.deserializePart.bind(this);
        this.attachSubparts = this.attachSubparts.bind(this);
        this.setProperties = this.setProperties.bind(this);
        this.createView = this.createView.bind(this);
        this.attachView = this.attachView.bind(this);
        this.setViewModel = this.setViewModel.bind(this);
        this.compilePartScript = this.compilePartScript.bind(this);
        this.refreshWorld = this.refreshWorld.bind(this);
        this.appendWorld = this.appendWorld.bind(this);
        this.addPartsToSystem = this.addPartsToSystem.bind(this);
        this.compileScripts = this.compileScripts.bind(this);
        this.getFlattenedPartTree = this.getFlattenedPartTree.bind(this);
        this.getModelClass = this.getModelClass.bind(this);
        this.handleId = this.handleId.bind(this);
        this.throwError = this.throwError.bind(this);
        this.flushCaches = this.flushCaches.bind(this);
        this.dispatchViewAdded = this.dispatchViewAdded.bind(this);
    }

    deserialize(aJSONString){
        this.data = JSON.parse(aJSONString);
        let target = this.system.partsById[this.targetId];
        return this.deserializeData()
            .then(() => {
                // Add all deserialized Parts to the System dict,
                // including the new World.
                this.addPartsToSystem(this._instanceCache);
            })
            .then(() => {
                // Compile the scripts on *all* deserialized
                // parts
                this.compileScripts(this._instanceCache);
            })
            .then(() => {
                // Insert the root Part into whatever
                // target it should go into.
                let rootPart = this.rootParts[0];
                let rootView = this.rootViews[0];
                if(this.targetId == 'system'){
                    this.refreshWorld();
                } else {
                    target.addPart(rootPart);
                }

                // Finally, append the PartView root node
                // where it should go in the view tree.
                if(this.targetId == 'system'){
                    this.appendWorld();
                } else {
                    let targetView = document.querySelector(`[part-id="${this.targetId}"]`);
                    targetView.appendChild(rootView);
                    this.dispatchViewAdded(rootView);
                }
                return this;
            });
    }

    deserializeData(){
        return new Promise((resolve, reject) => {
            this.flushCaches();
            // First, we ensure that the target we
            // should be deserializing into actually exists
            let target = this.system.partsById[this.targetId];
            if(!target && this.targetId != 'system'){
                this.throwError(`Target id ${this.targetId} does not exist in System`);
            }

            // Second, we create instances of all models in the serialization
            // but we do not yet attach their subparts.
            Object.values(this.data.parts).forEach(partData => {
                this.deserializePart(Object.assign({}, partData));
            });

            // Translate targets
            for (let modelId in this._propsCache) {
                let props = this._propsCache[modelId];
                if (props.target !== null) {
                    for (let oldId in this._idCache) {
                        let newId = this._idCache[oldId];
                        if (props.target === 'part id ' + oldId) {
                            props.target = 'part id ' + newId;
                            break;
                        }
                    }
                }
            }
            // Translate scripts
            for (let modelId in this._scriptCache) {
                let script = this._scriptCache[modelId];
                if (script !== null && script.match('part id') !== null) {
                    for (let oldId in this._idCache) {
                        let newId = this._idCache[oldId];
                        let oldRe = 'part id ' + oldId;
                        let newRe = 'part id ' + newId;
                        if (this._scriptCache[modelId].match(oldRe) !== null) {
                            console.log(modelId);
                            let re = new RegExp(oldRe, "g");
                            this._scriptCache[modelId] = script.replace(re, newRe);
                        }
                    }
                }
            }

            // Third, we go through each created Part instance
            // and add any subparts to it. Note that this is not
            // recursive
            this._instanceCache.forEach(partInstance => {
                this.attachSubparts(partInstance);
            });

            // Forth and fifth. Create and attach views
            // Note this is recursive to preserve the subpart + view children order
            let root = this._instanceCache.filter((part) => {
                return part.partProperties.getPropertyNamed(part, "id") == this.rootId;
            })[0];
            this.createAndAttachViews(root);

            // Sixth, we set all properties on each created
            // Part model from the deserialized data.
            // We do this using a visitor method on the instances
            // themselves.
            // This gives the in-memory views the ability to
            // react to any initial changes to their models.
            this._instanceCache.forEach(partInstance => {
                this.setProperties(partInstance);
                // We need to translate new ids to old ones
                if (partInstance.name == "WorldStack") {
                    let world = partInstance;
                    world.partProperties.setPropertyNamed(
                        world,
                        "current",
                        this._idCache[world.currentStackId]
                    );
                }
                if (partInstance.name == "Stack") {
                    let stack = partInstance;
                    stack.partProperties.setPropertyNamed(
                        stack,
                        "current",
                        this._idCache[stack.currentCardId]
                    );
                }
                this.setViewModel(partInstance);
            });

            // We determine which of the instances is a "root",
            // meaning that it has, at this point, no owner in
            // the deserialized data. There can be multiple roots
            // (and therefore multiple trees) in a single deserialization
            this._rootsCache = this._instanceCache.filter(instance => {
                return instance._owner == null || instance._owner == undefined;
            });

            // Insertion should be handled by composed
            // promises elsewhere (see imports and deserialize()
            // for examples)

            return resolve(this);
        });
    }

    createAndAttachViews(partInstance){
        this.createView(partInstance);
        this.attachView(partInstance);
        if(partInstance.subparts.length){
            partInstance.subparts.forEach((subpartInstance) => {
                this.createAndAttachViews(subpartInstance);
            });
        }
    }

    importFromSerialization(aJSONString, filterFunction){
        this.data = JSON.parse(aJSONString);
        let target = this.system.partsById[this.targetId];
        let targetView = document.querySelector(`[part-id="${this.targetId}"]`);
        return this.deserializeData()
            .then(() => {
                // The caller will provide a filter function over
                // all deserialized part instances, returning only
                // those that should be inserted into the target.
                // For example, all Stacks in the WorldStack.
                return this._instanceCache.filter(filterFunction);
            })
            .then((rootParts) => {
                rootParts.forEach(rootPart => {
                    let allTreeParts = this.getFlattenedPartTree(rootPart);
                    this.addPartsToSystem(allTreeParts);
                });
                return rootParts;

            })
            .then((rootParts) => {
                rootParts.forEach(rootPart => {
                    let allTreeParts = this.getFlattenedPartTree(rootPart);
                    this.compileScripts(allTreeParts);
                });
                return rootParts;
            })
            .then((rootParts) => {
                rootParts.forEach(rootPart => {
                    let view = this._viewsCache[rootPart.id];
                    target.addPart(rootPart);
                    targetView.appendChild(view);
                    this.dispatchViewAdded(view);
                });
            });
    }

    deserializePart(partData){
        let partClass = this.getModelClass(partData.type);
        let instance = new partClass();

        // We create a new ID for this part, since we cannot
        // guarantee ID clashes with the existing System.
        // Exception is if the useOriginalids flag is set,
        // such as at load time
        let {newId, oldId} = this.handleId(instance, partData);
        instance.id = newId;
        // cache the new root ID if this is a root instance
        if(this.data.rootId == oldId){
            this.rootId = newId;
        }

        // Add to our caches and also to the System
        this._idCache[oldId] = newId;
        this._scriptCache[newId] = partData.properties.script;
        this._propsCache[newId] = partData.properties;
        this._modelCache[newId] = instance;
        this._subpartMapCache[newId] = partData.subparts;
        this._instanceCache.push(instance);
    }

    handleId(aPart, partData){
        let newId, oldId;
        oldId = partData.id;
        newId = aPart.id;
        if(aPart.type !== 'world'){
            newId = _id_js__WEBPACK_IMPORTED_MODULE_0__["default"].new();
        }
        return {
            newId,
            oldId
        };
    }

    addPartsToSystem(aListOfParts){
        aListOfParts.forEach(part => {
            this.system.partsById[part.id] = part;
        });
    }

    compileScripts(aListOfParts){
        aListOfParts.forEach(part => {
            this.compilePartScript(part);
        });
    }

    attachSubparts(aPart){
        // At this point, the _subpartMapCache should
        // have an entry mapping from this aPart's (new)
        // id to an array of ids of also-initialized
        // subpart models
        let subpartIds = this._subpartMapCache[aPart.id];
        subpartIds.forEach(subpartId => {
            let newId = this._idCache[subpartId];
            let subpartModel = this._modelCache[newId];
            if(!subpartModel){
                debugger;
            }
            aPart.addPart(subpartModel);
        });
    }

    setProperties(aPart){
        let props = this._propsCache[aPart.id];
        delete props['id'];
        aPart.setPropsFromDeserializer(props, this);
    }

    createView(aPart){
        let newView = document.createElement(
            this.system.tagNameForViewNamed(aPart.type)
        );
        // we need to set the part-id attribute since these
        // are used for queries needed for things like
        // current stack and card
        newView.setAttribute("part-id", aPart.id);
        this._viewsCache[aPart.id] = newView;
    }

    setViewModel(aPart){
        let view = this._viewsCache[aPart.id];
        view.setModel(aPart);
    }
    
    attachView(aPart){
        let owner = aPart._owner;
        if(owner){
            let ownerView = this._viewsCache[owner.id];
            let partView = this._viewsCache[aPart.id];
            owner.sendMessage({
                type: "viewChanged",
                changeName: "subpart-new",
                args: [partView]
            }, ownerView);
        }
    }

    compilePartScript(aPart){
        let scriptString = this._scriptCache[aPart.id];
        if(scriptString && scriptString != ""){
            this.system.compile({
                type: 'compile',
                targetId: aPart.id,
                codeString: scriptString,
                serialize: false
            });
        }
    }

    refreshWorld(){
        // We assume a single root part was deserialized and
        // attach it as the World accordingly
        let newWorld = this.rootParts[0];
        if(newWorld.type !== 'world'){
            this.throwError(`Found ${this.rootParts.length} roots, but no world!`);
        }
        this.system.partsById['world'] = this.rootParts[0];
    }

    appendWorld(){
        // We assume a single root view that is an st-world.
        let found = document.querySelector('st-world');
        if(found){
            document.body.replaceChild(this.rootViews[0], found);
        } else {
            document.body.prepend(this.rootViews[0]);
        }
        this.dispatchViewAdded(document.querySelector('st-world'));
    }

    getFlattenedPartTree(aPart, list=[]){
        list.push(aPart);
        aPart.subparts.forEach(subpart => {
            this.getFlattenedPartTree(subpart, list);
        });
        return list;
    }

    throwError(message){
        throw new Error(`Deserialization Error: ${message}`);
    }

    getModelClass(aPartTypeStr){
        let cls = this.system.availableParts[aPartTypeStr];
        if(!cls){
            this.throwError(`Part type "${aPartTypeStr}" does not exist in system`);
        }
        return cls;
    }

    flushCaches(){
        this._modelCache = {};
        this._subpartMapCache = {};
        this._idCache = {};
        this._instanceCache = [];
        this._propsCache = {};
        this._viewsCache = {};
        this._scriptCache = {};
        this._rootsCache = [];
    }

    dispatchViewAdded(aView){
        let event = new CustomEvent('st-view-added', {
            detail: {
                partType: aView.model.type,
                partId: aView.model.id,
                //ownerId: aView.model._owner.id || null
            } 
        });
        aView.parentElement.dispatchEvent(event);
    }

    get rootParts(){
        return this._rootsCache;
    }

    get rootViews(){
        return this.rootParts.map(part => {
            return this._viewsCache[part.id];
        });
    }
}


class STSerializer {
    constructor(aSystem){
        this.system = aSystem;
        this._objectCache = {};

        // Bound methods
        this.serializePart = this.serializePart.bind(this);
        this.flushCaches = this.flushCaches.bind(this);
    }

    serialize(aRootPart, pretty=true){
        this.flushCaches();
        let result = {
            version: version,
            rootId: aRootPart.id,
            type: aRootPart.type,
            id: aRootPart.id
        };

        // Recursively serialize Parts and
        // store in flat list
        this.serializePart(aRootPart);

        // We set the result objects parts
        // dict to be the same as the cache
        result.parts = this._objectCache;

        // Finally, we convert to a string and
        // return
        if(pretty){
            return JSON.stringify(result, null, 4);
        } else {
            return JSON.stringify(result);
        }
    }

    serializePart(aPart){
        // We use the serialize method available on
        // base Parts, passing in this serializer instance
        // as the sole arg
        this._objectCache[aPart.id] = aPart.serialize(this);
        aPart.subparts.forEach(subpart => {
            this.serializePart(subpart);
        });
    }

    flushCaches(){
        this._objectCache = {};
    }
}




/***/ }),

/***/ "./js/objects/utils/styleProperties.js":
/*!*********************************************!*\
  !*** ./js/objects/utils/styleProperties.js ***!
  \*********************************************/
/*! exports provided: addBasicStyleProps, addPositioningStyleProps, addTextStyleProps, addLayoutStyleProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBasicStyleProps", function() { return addBasicStyleProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addPositioningStyleProps", function() { return addPositioningStyleProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTextStyleProps", function() { return addTextStyleProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLayoutStyleProps", function() { return addLayoutStyleProps; });
/**
 * Helpers for setting up various
 * style properties
 */


/**
 * Basic style properties are those
 * common to all (visual) Parts
 */
const sides = ["top", "bottom", "left", "right"];

const addBasicStyleProps = (target) => {
    target.partProperties.newStyleProp(
        'background-transparency',
        1,
    );
    target.partProperties.newStyleProp(
        'background-color',
        "rgb(255, 255, 255)", // white 
    );
    target.partProperties.newStyleProp(
        'transparency',
        1.0,
    );
    sides.forEach((s) => {
        target.partProperties.newStyleProp(
            `border-${s}-style`,
            'solid'
        );
    });
    sides.forEach((s) => {
        target.partProperties.newStyleProp(
            `border-${s}-width`,
            0,
        );
    });
    sides.forEach((s) => {
        target.partProperties.newStyleProp(
            `border-${s}-color`,
            "rgb(0, 0, 0)", // black
        );
    });
    sides.forEach((s) => {
        target.partProperties.newStyleProp(
            `border-${s}-transparency`,
            1
        );
    });
    target.partProperties.newStyleProp(
        'shadow-left',
        0
    );
    target.partProperties.newStyleProp(
        'shadow-top',
        0
    );
    target.partProperties.newStyleProp(
        'shadow-blur',
        0
    );
    target.partProperties.newStyleProp(
        'shadow-spread',
        0
    );
    target.partProperties.newStyleProp(
        'shadow-color',
        "rgb(238, 238, 238)", // grey
    );
    target.partProperties.newStyleProp(
        'shadow-transparency',
        1
    );
    target.partProperties.newStyleProp(
        'corner-top-left-round',
        0
    );
    target.partProperties.newStyleProp(
        'corner-top-right-round',
        0
    );
    target.partProperties.newStyleProp(
        'corner-bottom-left-round',
        0
    );
    target.partProperties.newStyleProp(
        'corner-bottom-right-round',
        0
    );
};

/**
 * Style properties for Parts that can
 * be moved and that can have explicit
 * dimensions. Examples: buttons, fields.
 * Examples of those that can't: Cards, Stacks
 */
const addPositioningStyleProps = (target) => {
    target.partProperties.newStyleProp(
        'hide',
        false,
    );
    // setting width and height to null
    // effectively forces to the default size
    // of the button to fit the button name
    target.partProperties.newStyleProp(
        'width',
        100,
    );
    target.partProperties.newStyleProp(
        'height',
        null,
    );
    target.partProperties.newStyleProp(
        'top',
        0,
    );
    target.partProperties.newStyleProp(
        'left',
        0,
    );
    target.partProperties.newStyleProp(
        'rotate',
        null,
    );

    // horizontal-resizing specifies a strategy
    // for how this Part should adjust its
    // horizontal axis relative to the parent.
    // Possible values are:
    // * rigid - Stick to the top, left, width
    // and height properties as they are explicitly
    // set;
    // * shrink-wrap - Become large enough on the hori-
    // zontal axis only to fit any child contents;
    // * space-fill - Fill as much as we can in the
    // horizontal axis in the parent Part.
    target.partProperties.newStyleProp(
        'horizontal-resizing',
        'rigid'
    );

    // vertical-resizing specifies a strategy
    // for how this Part should adjust its
    // vertical axis relative to the parent.
    // Possible values are:
    // * rigid - Stick to the top, left, width
    // and height properties as they are explicitly
    // set;
    // * shrink-wrap - Become large enough on the hori-
    // zontal axis only to fit any child contents;
    // * space-fill - Fill as much as we can in the
    // vertical axis in the parent Part.
    target.partProperties.newStyleProp(
        'vertical-resizing',
        'rigid'
    );

    // Margin specifies some space between the
    // target Part and any other Parts that might
    // be adjacent to it in a common Owner. It will
    // not be in effect when the owner is using a
    // strict layout.
    target.partProperties.newStyleProp(
        'top-margin',
        null
    );
    target.partProperties.newStyleProp(
        'right-margin',
        null
    );
    target.partProperties.newStyleProp(
        'bottom-margin',
        null
    );
    target.partProperties.newStyleProp(
        'left-margin',
        null
    );

    // Pinning specifies whether or not
    // a given part should "stick" to a
    // particular side of its owner Part.
    // Pinning properties only have effect
    // inside of Parts with a strict layout
    target.partProperties.newDynamicProp(
        'pinning-top',
        pinningSetter,
        function(propOwner, propObject){
            return propObject._value;
        },
        false, // not read only
        false // default value

    );
    target.partProperties.newDynamicProp(
        'pinning-left',
        pinningSetter,
        function(propOwner, propObject){
            return propObject._value;
        },
        false, // not read only
        false // default value

    );
    target.partProperties.newDynamicProp(
        'pinning-bottom',
        pinningSetter,
        function(propOwner, propObject){
            return propObject._value;
        },
        false, // not read only
        false // default value
    );
    target.partProperties.newDynamicProp(
        'pinning-right',
        pinningSetter,
        function(propOwner, propObject){
            return propObject._value;
        },
        false, // not read only
        false // default value
    );
    target.partProperties.newDynamicProp(
        // Possible values for the compound
        // 'pinning' property are:
        // *"none" or null
        // *top
        // *top-right
        // *top-left
        // *bottom
        // *bottom-right
        // *bottom-left
        // *left
        // *right
        'pinning',
        // Setter
        function(propOwner, propObject, value){
            if(!value || value == "none"){
                ['top', 'left', 'right', 'bottom'].forEach(side => {
                    let pin = `pinning-${side}`;
                    propOwner.partProperties.setPropertyNamed(
                        propOwner,
                        pin,
                        false
                    );
                });
                return;
            }
            pinningAdjust(propOwner, value);
        },

        // Getter
        function(propOwner, propObject){
            let top = propOwner.partProperties.getPropertyNamed(
                propOwner,
                'pinning-top'
            );
            let bottom = propOwner.partProperties.getPropertyNamed(
                propOwner,
                'pinning-bottom'
            );
            let left = propOwner.partProperties.getPropertyNamed(
                propOwner,
                'pinning-left'
            );
            let right = propOwner.partProperties.getPropertyNamed(
                propOwner,
                'pinning-right'
            );
            let result = [];
            if(top){
                result.push('top');
            } else if(bottom){
                result.push('bottom');
            }
            if(left){
                result.push('left');
            } else if(right){
                result.push('right');
            }

            return result.join('-');
        }
    );
};

/**
 * Style properties for Parts that display
 * text
 */
const addTextStyleProps = (target) => {
    target.partProperties.newStyleProp(
        'text-align',
        'left',
        'cssTextStyle'
    );
    target.partProperties.newStyleProp(
        'text-font',
        'default',
        'cssTextStyle'
    );
    target.partProperties.newStyleProp(
        'text-color',
        "rgb(0, 0, 0)", // black
        'cssTextStyle'
    );
    target.partProperties.newStyleProp(
        'text-transparency',
        1,
        'cssTextStyle'
    );
    target.partProperties.newStyleProp(
        'text-style',
        'plain',
        'cssTextStyle'
    );
    target.partProperties.newStyleProp(
        'text-bold',
        false,
        'cssTextStyle'
    );
    target.partProperties.newStyleProp(
        'text-italic',
        false,
        'cssTextStyle'
    );
    target.partProperties.newStyleProp(
        'text-size',
        15,
        'cssTextStyle'
    );
};

/**
 * Basic layout styles are those pertaining
 * to the positioning and resizing of subparts.
 * Examples include Cards and Area
 */
const addLayoutStyleProps = (target) => {
    // The 'layout' property is
    // one of two strings:
    // strict - Equivalent to the absolute
    // layout based strictly on coordinates
    // list - Will force items into either a row
    // or column list, based on the pairing with
    // the 'listDirection' property
    target.partProperties.newBasicProp(
        'layout',
        'strict'
    );

    // list-direction specifies row or column
    // and will only have an effect whent the
    // layout property is set to 'list'
    target.partProperties.newBasicProp(
        'list-direction',
        'row'
    );

    // Wrapping specifies whether a list should
    // wrap along its dominant dimension (row or column)
    target.partProperties.newBasicProp(
        'list-wrapping',
        false
    );

    // Padding specifies some space from the
    // border of the target Part to the beginning
    // of the layout of any subparts.
    target.partProperties.newStyleProp(
        'top-padding',
        null
    );
    target.partProperties.newStyleProp(
        'right-padding',
        null
    );
    target.partProperties.newStyleProp(
        'bottom-padding',
        null
    );
    target.partProperties.newStyleProp(
        'left-padding',
        null
    );

    // List alignment describes how elements in
    // a list layout should align themselves along
    // the dominant dimension (row or column)
    // They are essentially proxies for align-items
    target.partProperties.newBasicProp(
        'list-alignment',
        null
    );

    // List distribution describes how elements
    // in a list layout should distribute themselves
    // across or along the dominant dimension
    // (row or column)
    // This is essentially a wrapper for justify-content
    target.partProperties.newBasicProp(
        'list-distribution',
        null
    );
};

/**
  * HELPERS
 **/

const pinningSetter = (propOwner, propObject, value) => {
    let side = propObject.name.split("-")[1];
    let topLeft;
    switch (side){
    case "right":
        topLeft = "left";
        break;
    case "bottom":
        topLeft = "top";
        break;
    default:
        topLeft = side;
    }
    // we'll need to fix and un-fix the corresponding top or left property depending
    // on whether value is true of false, respectively
    let prop = propOwner.partProperties.findPropertyNamed(
        topLeft 
    );
    let oppositeSide;
    switch (side){
    case "left":
        oppositeSide = "right";
        break;
    case "right":
        oppositeSide = "left";
        break;
    case "top":
        oppositeSide = "bottom";
        break;
    case "bottom":
        oppositeSide = "top";
        break;
    }
    if(value){
        // first make sure that pinning-bottom is false
        propOwner.partProperties.setPropertyNamed(
            propOwner,
            `pinning-${oppositeSide}`,
            false
        );
        prop.readOnly = true;
    } else {
        // reset the value back to trigger a notification
        prop.setValue(propOwner, prop._value);
        prop.readOnly = false;
    }
    propObject._value = value;
};

const pinningAdjust = (owner, value) => {
    let sides = ['top', 'left', 'right', 'bottom'];
    sides.forEach(side => {
        if(value.startsWith(side)){
            owner.partProperties.setPropertyNamed(
                owner,
                `pinning-${side}`,
                true
            );
        } else {
            owner.partProperties.setPropertyNamed(
                owner,
                `pinning-${side}`,
                false
            );
        }
    });

    if(value.includes("-")){
        if(value.endsWith('left')){
            owner.partProperties.setPropertyNamed(
                owner,
                'pinning-left',
                true
            );
            owner.partProperties.setPropertyNamed(
                owner,
                'pinning-right',
                false
            );
        } else if(value.endsWith('right')){
            owner.partProperties.setPropertyNamed(
                owner,
                'pinning-left',
                false
            );
            owner.partProperties.setPropertyNamed(
                owner,
                'pinning-right',
                true
            );
        }
    }
};




/***/ }),

/***/ "./js/objects/utils/styler.js":
/*!************************************!*\
  !*** ./js/objects/utils/styler.js ***!
  \************************************/
/*! exports provided: cssStyler, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssStyler", function() { return cssStyler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cssStyler; });
/**
 * Styler
 * ------------------------------------
 * I am responsible for converting
 * SimpleTalk visual styling to a dict
 * Object of CSS JavaScript type key-value pairs
 */

/** I style the styleObj
 * styleObj: css JavaScript key:value pairs
 * propertyName: (SimpleTalk) styling property name
 * propertyValue: (SimpleTalk) styling property value
 */

const cssStyler = (styleObj, propertyName, propertyValue) => {
    switch(propertyName){

    case "background-color":
        _setOrNot(styleObj, "backgroundColor",  _colorToRGBA(styleObj["backgroundColor"], propertyValue));
        break;

    case "background-transparency":
        // here we set the Alpha value of the current styleObj["backgroundColor"] rgba
        _setOrNot(styleObj, "backgroundColor",  _colorTransparencyToRGBA(styleObj["backgroundColor"], propertyValue));
        break;

    case "border-top-style":
    case "border-bottom-style":
    case "border-left-style":
    case "border-right-style": {
        let s = propertyName.split("-")[1];
        _setOrNot(styleObj, `border-${s}-style`,  propertyValue);
        break;
    }

    case "border-top-width":
    case "border-bottom-width":
    case "border-left-width":
    case "border-right-width": {
        let s = propertyName.split("-")[1];
        _setOrNot(styleObj, `border-${s}-width`,  _intToPx(propertyValue));
        break;
    }

    case "border-top-color":
    case "border-bottom-color":
    case "border-top-color":
    case "border-right-color": {
        let s = propertyName.split("-")[1];
        _setOrNot(styleObj, `border-${s}-color`,  _colorToRGBA(styleObj[`border-${s}-color`], propertyValue));
        break;
    }

    case "border-top-transparency":
    case "border-bottom-transparency":
    case "border-left-transparency":
    case "border-right-transparency": {
        let s = propertyName.split("-")[1];
        _setOrNot(styleObj, `border-${s}-color`,  _colorTransparencyToRGBA(styleObj[`border-${s}-color`], propertyValue));
        break;
    }

    case "corner-top-left-round":
    case "corner-top-right-round":
    case "corner-bottom-left-round":
    case "corner-bottom-right-round":{
        let c1 = propertyName.split("-")[1];
        let c2 = propertyName.split("-")[2];
        _setOrNot(styleObj, `border-${c1}-${c2}-radius`,  _intToPx(propertyValue));
        break;
    }

    case "shadow-left":
    case "shadow-top":
    case "shadow-blur":
    case "shadow-spread":
    case "shadow-color":
    case "shadow-transparency":
        let shadowProp = propertyName.split("-")[1];
        let [left, top, blur, spread, color] = _cssBoxShadow(styleObj["box-shadow"]);
        switch(shadowProp){
        case "color":
            color = _colorToRGBA(color, propertyValue);
            break;
        case "transparency":
            color = _colorTransparencyToRGBA(color, propertyValue);
            break;
        case "left":
            left = _intToPx(propertyValue);
            break;
        case "top":
            top = _intToPx(propertyValue);
            break;
        case "blur":
            blur = _intToPx(propertyValue);
            break;
        case "spread":
            spread = _intToPx(propertyValue);
            break;
        }
        _setOrNot(styleObj, "box-shadow", `${left} ${top} ${blur} ${spread} ${color}`);
        break;

    case "text-color":
        _setOrNot(styleObj, "color",  _colorToRGBA(styleObj["color"], propertyValue));
        break;

    case "text-font":
        _setOrNot(styleObj, "fontFamily",  propertyValue);
        break;

    case "text-size":
        _setOrNot(styleObj, "fontSize", propertyValue);
        break;

    case "text-align":
        _setOrNot(styleObj, "textAlign",  propertyValue);
        break;

    case "text-bold":
        if(propertyValue === true){
            _setOrNot(styleObj, "font-weight",  "bold");
        } else if(propertyValue === false){
            _setOrNot(styleObj, "font-weight",  "normal");
        }
        break;

    case "text-italic":
        if(propertyValue === true){
            _setOrNot(styleObj, "font-style",  "italic");
        } else if(propertyValue === false){
            _setOrNot(styleObj, "font-style",  "normal");
        }
        break;

    case "text-underline":
        if(propertyValue === true){
            _setOrNot(styleObj, "textDecoration",  "underline");
        }
        break;

    case "text-strikethrough":
        if(propertyValue === true){
            _setOrNot(styleObj, "textDecoration",  "line-through");
        }
        break;

    case "text-transparency":
        // here we set the Alpha value of the current styleObj["color"] rgba
        _setOrNot(styleObj, "color",  _colorTransparencyToRGBA(styleObj["color"], propertyValue));
        break;

    case "top":
        _setOrNot(styleObj, "top",  _intToPx(propertyValue));
        break;

    case "left":
        _setOrNot(styleObj, "left",  _intToPx(propertyValue));
        break;

    case "width":
        _setOrNot(styleObj, "width",  _intToPx(propertyValue));
        break;

    case "height":
        _setOrNot(styleObj, "height",  _intToPx(propertyValue));
        break;

    case "left-margin":
    case "right-margin":
    case "bottom-margin":
    case "top-margin":
        let marginSide = propertyName.split("-")[0];
        marginSide = `${marginSide[0].toUpperCase()}${marginSide.slice(1)}`;
        _setOrNot(styleObj, `margin${marginSide}`, _intToPx(propertyValue));
        break;

    case "left-padding":
    case "right-padding":
    case "bottom-padding":
    case "top-padding":
        let paddingSide = propertyName.split("-")[0];
        paddingSide = `${paddingSide[0].toUpperCase()}${paddingSide.slice(1)}`;
        _setOrNot(styleObj, `padding${paddingSide}`, _intToPx(propertyValue));
        break;

    case "text-style":
        _setOrNot(styleObj, "textStyle",  propertyValue);
        break;

    case "rotate":
        _setOrNot(styleObj, "transform",  _intToRotateDeg(propertyValue));
        break;

    case "transparency":
        _setOrNot(styleObj, "opacity",  propertyValue);
        break;

    case "hide":
        if(propertyValue === true){
            styleObj["display"] = "none";
        } else if(propertyValue === false){
            styleObj["display"] = null;
        }
        break;


    default:
        // for the default we simply allow ST style names to map 1-1
        // to CSS/JS style names. This is only somewhat safe, since the DOM
        // will simply ignore nonsense names without throwing an error. But it
        // does allow us to avoid writing a rule for every term (example: width,
        // height, top, left etc)
        _setOrNot(styleObj, propertyName,  propertyValue);
    }
    return styleObj;

};

// In order to avoid clashing with views interacting
// the style attribute directly we ignore everything that
// is either null or undefined
// TODO review this decision!
const _setOrNot = (styleObj, name, value) => {
    if(value !== null && value !== undefined){
        styleObj[name] = value;
    }
};

const _intToRotateDeg = (n) => {
    if(n !== null && n !== undefined){
        if(typeof(n) === "string"){
            n = n.split("deg")[0];
        }
        return `rotate(${n}deg)`;
    }
};


const _intToPx = (n) => {
    if(n !== null && n !== undefined){
        if(typeof(n) === "string"){
            if(n == "fill"){
                return "100%";
            } else if(["thin", "medium", "thick"].indexOf(n) > -1){
                return n;
            }
            n = n.split("px")[0];
        }
        return `${n}px`;
    }
};

// Convert colors to rgba
// change a css color RGB values, preserving the A(lpha) value
const _colorToRGBA = (cssColor, STColor) => {
    if(!STColor){
        return;
    }
    let r, g, b, a, _;
    // ST colors are RGB
    if(STColor.startsWith("rgb")){
        [r, g, b] = STColor.match(/\d+/g);
    } else {
        let colorInfo = basicCSSColors[STColor];
        if(colorInfo){
            r = colorInfo["r"];
            g = colorInfo["g"];
            b = colorInfo["b"];
        } else {
            return;
        }
    }
    if(cssColor){
        [_, _, _, a] = cssColor.match(/[\d\.]+/g);
        // if Alpha is not defined then we set it to 1
        // default for browsers
    }
    if(!a){
        a = 1;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// change the A(alpha) value, preserving the RGB values
const _colorTransparencyToRGBA = (cssColor, tValue) => {
    if(!cssColor){
        return;
    }

    let r, g, b;
    let mappedColor = basicCSSColors[cssColor];
    if(mappedColor){
        r = mappedColor.r;
        g = mappedColor.g;
        b = mappedColor.b;
    } else {
        [r, g, b] = cssColor.match(/\d+/g);
    }
    
    return `rgba(${r}, ${g}, ${b}, ${tValue})`;
}

// Add more colors as needed
const basicCSSColors = {
    black: {hex: "#000000", r: 0, g: 0, b: 0},
		silver: {hex: "#C0C0C0", r: 192, g: 192, b: 192},
		gray: {hex: "#808080", r: 128, g: 128, b: 128},
		white: {hex: "#FFFFFF", r: 255, g: 255, b: 255},
		maroon: {hex: "#800000", r: 128, g: 0, b: 0},
		red: {hex: "#FF0000", r: 255, g: 0, b: 0},
		purple: {hex: "#800080", r: 128, g: 0, b: 128},
		fuchsia: {hex: "#FF00FF", r: 255, g: 0, b: 255},
		green: {hex: "#008000", r: 0, g: 128, b: 0},
		lime: {hex: "#00FF00", r: 0, g: 255, b: 0},
		olive: {hex: "#808000", r: 128, g: 128, b: 0},
		yellow: {hex: "#FFFF00", r: 255, g: 255, b: 0},
		navy: {hex: "#000080", r: 0, g: 0, b: 128},
		blue: {hex: "#0000FF", r: 0, g: 0, b: 255},
		teal: {hex: "#008080", r: 0, g: 128, b: 128},
		aqua: {hex: "#00FFFF", r: 0, g: 255, b: 255},
};

// take the css box-shadow property and return its
// components (offset-y, offset-x, blur, spread and color)
// if the value is not defined return a default
const _cssBoxShadow = (cssPropValue) =>{
    if(!cssPropValue){
        return ["0px", "0px", "0px", "0px", "rgba(0, 0, 0, 1)"];
    }
    let [intValues, rgba] = cssPropValue.split(" rgba");
    let [left, top, blur, spread] = intValues.split(" ");
    return [left, top, blur, spread, `rgba${rgba}`];
}




/***/ }),

/***/ "./js/objects/views/AreaView.js":
/*!**************************************!*\
  !*** ./js/objects/views/AreaView.js ***!
  \**************************************/
/*! exports provided: AreaView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaView", function() { return AreaView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AreaView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");
/**
 * AreaView
 * -------------------------------
 * I am a webcomponent representation
 * of an Area, which is a grouping of
 * Parts that have some kind of layout
 * specified
 */


const templateString = `
                <style>
                #area-wrapper {
                    display: inherit;
                    flex-direction: inherit;
                    flex-wrap: inherit;
                    align-items: inherit;
                    align-content: inherit;
                    justify-content: inherit;
                    position: relative; 
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                }
                .clip {
                    overflow: hidden;  
                }
                .allow-scroll {
                    overflow: auto;
                }
                </style>
                <div id="area-wrapper">
                <slot></slot>
                </div>
`;

class AreaView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Bound methods
        this.clippingChanged = this.clippingChanged.bind(this);
        this.allowScrollingChanged = this.allowScrollingChanged.bind(this);

        // Prop change handlers
        this.onPropChange('clipping', this.clippingChanged);
        this.onPropChange('allow-scrolling', this.allowScrollingChanged);
    }

    afterModelSet(){
        let clipping = this.model.partProperties.getPropertyNamed(
            this.model,
            "clipping"
        );
        let allowScrolling = this.model.partProperties.getPropertyNamed(
            this.model,
            "allow-scrolling"
        );
        this.clippingChanged(clipping, this.model.id);
        this.allowScrollingChanged(allowScrolling, this.model.id);
    }

    clippingChanged(newVal, id){
        let wrapper = this._shadowRoot.getElementById('area-wrapper');
        if(newVal == true){
            wrapper.classList.remove('allow-scroll');
            wrapper.classList.add('clip');
        } else {
            wrapper.classList.remove('clip');
        }
    }

    allowScrollingChanged(newVal, id){
        let wrapper = this._shadowRoot.getElementById('area-wrapper');
        if(newVal == true){
            wrapper.classList.remove('clip');
            wrapper.classList.add('allow-scroll');
        } else {
            wrapper.classList.remove('allow-scroll');
        }
    }

    addContextMenuItems(contextMenu){
        contextMenu.addSpacer();
        let layout = this.model.partProperties.getPropertyNamed(
            this.model,
            'layout'
        );
        let direction = this.model.partProperties.getPropertyNamed(
            this.model,
            'list-direction'
        );
        if(layout != 'list'){
            contextMenu.addListItem(
                "Set Layout to List",
                (event) => {
                    this.model.partProperties.setPropertyNamed(
                        this.model,
                        'layout',
                        'list'
                    );
                }
            );
        } else {
            contextMenu.addListItem(
                "Set Layout to Strict",
                (event) => {
                    this.model.partProperties.setPropertyNamed(
                        this.model,
                        'layout',
                        'strict'
                    );
                }
            );
            if(direction == 'row'){
                contextMenu.addListItem(
                    "Set List Direction to Column",
                    (event) => {
                        this.model.partProperties.setPropertyNamed(
                            this.model,
                            'list-direction',
                            'column'
                        );
                    }
                );
            } else {
                contextMenu.addListItem(
                    "Set List Direction to Column",
                    (event) => {
                        this.model.partProperties.setPropertyNamed(
                            this.model,
                            'list-direction',
                            'row'
                        );
                    }
                );
            }
        }
    }
};




/***/ }),

/***/ "./js/objects/views/AudioView.js":
/*!***************************************!*\
  !*** ./js/objects/views/AudioView.js ***!
  \***************************************/
/*! exports provided: AudioView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioView", function() { return AudioView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AudioView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");


const linkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
</svg>
`;

const templateString = `
<style>
:host {
    box-sizing: border-box;
    display: block;
    position: absolute;
    padding: 1px;
    user-select: none;
    cursor: pointer;
}

.wrapper{
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
}
</style>
<div class="wrapper">
    <audio></audio>
    <span class="name"></span>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-music" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx="6" cy="17" r="3"></circle>
    <circle cx="16" cy="17" r="3"></circle>
    <polyline points="9 17 9 4 19 4 19 17"></polyline>
    <line x1="9" y1="8" x2="19" y2="8"></line>
    </svg>
</div>
`;

// HTMLMediaElementStates copied from
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
const mediaStates = {
    0: "HAVE_NOTHING",
    1: "HAVE_METADATA",
    2: "HAVE_CURRENT_DATA",
    3: "HAVE_FUTURE_DATA",
    4: "HAVE_ENOUGH_DATA"
};

class AudioView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // Setup template and shadow dom
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(this.template.content.cloneNode(true));

        // Bind component methods
        this.onClick = this.onClick.bind(this);
        this.initCustomHaloButton = this.initCustomHaloButton.bind(this);
        this.updateAudioLink = this.updateAudioLink.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
    }

    afterConnected(){
        let audio = this._shadowRoot.querySelector("audio");
        audio.addEventListener('loadeddata', () => {
            let stateCode = audio.readyState;
            this.model.partProperties.setPropertyNamed(
                this.model,
                "readyState",
                mediaStates[stateCode]
            );
        });

        if(!this.haloButton){
            this.initCustomHaloButton();
        }
    }

    afterDisconnected(){
    }

    afterModelSet(){
        let nameSpan = this._shadowRoot.querySelector(".name");
        nameSpan.innerText = this.model.partProperties.getPropertyNamed(this.model, "name");
        this.model.partProperties.setPropertyNamed(
            this.model,
            "readyState",
           "HAVE_NOTHING"
        );
        let audio = this._shadowRoot.querySelector("audio");
        let src = this.model.partProperties.getPropertyNamed(this.model, "src");
        if(src){
            audio.src = src;
        }
        // prop changes
        this.onPropChange("name", (value) => {
            nameSpan.innerText = value;
        });
        this.onPropChange("readyState", (value) => {
            let borderColor = "red";
            if(value == "HAVE_FUTURE_DATA" || value == "HAVE_ENOUGH_DATA"){
                borderColor = "green";
            };
            ["right", "left", "top", "bottom"].forEach((side) => {
                this.model.partProperties.setPropertyNamed(this.model, `border-${side}-color`, borderColor);
            });
        });
        this.onPropChange("play", (value) => {
            if(value === true){
                this.play();
            } else if (value === false){
                this.pause();
            }
        });
        this.onPropChange("stop", (value) => {
            if(value === true){
                audio.currentTime = 0;
            }
        });
        this.onPropChange("src", (url) => {
            try{
                // resource load is auto-loaded by the <audio> element
                audio.src = url;
            } catch(error){
                let errorMsg = {
                    type: "error",
                    name: "ResourceNotFound",
                    resourceType: "audio",
                    partId: this.model.id,
                    details: {source: url, type: "url"}

                };
                this.model.sendMessage({errorMsg}, this.model);
            }
        });
    }

    play(){
        // first make sure that the resource is ready
        let audio = this._shadowRoot.querySelector("audio");
        let readyState = this.model.partProperties.getPropertyNamed(this.model, "readyState");
        if(readyState == "HAVE_FUTURE_DATA" || readyState == "HAVE_ENOUGH_DATA"){
            audio.play();
        } else {
            alert(`audio is not ready; current state: ${readyState}`);
        }
    }

    pause(){
        this._shadowRoot.querySelector("audio").pause();
    }

    // re-loads the media, setting it back to the beggning
    stop(){
        this._shadowRoot.querySelector("audio").load();
    }

    onClick(event){
        if(event.button == 0){
            if(event.shiftKey){
                // prevent triggering the on click message
                event.preventDefault();
                if(this.hasOpenHalo){
                    this.closeHalo();
                } else {
                    this.openHalo();
                }
            } else if(!this.hasOpenHalo){
                // Send the click command message to self
                this.model.sendMessage({
                    type: 'command',
                    commandName: 'click',
                    args: [],
                    shouldIgnore: true // Should ignore if System DNU
                }, this.model);
            }
        }
    }

    openHalo(){
        // Override default. Here we add a custom button
        // when showing.
        let foundHalo = this.shadowRoot.querySelector('st-halo');
        if(!foundHalo){
            foundHalo = document.createElement('st-halo');
            this.shadowRoot.appendChild(foundHalo);
        }
        foundHalo.append(this.haloButton);
    }

    initCustomHaloButton(){
        this.haloButton = document.createElement('div');
        this.haloButton.id = 'halo-audio-link';
        this.haloButton.classList.add('halo-button');
        this.haloButton.innerHTML = linkIcon;
        this.haloButton.style.marginTop = "6px";
        this.haloButton.setAttribute('slot', 'right-column');
        this.haloButton.setAttribute('title', 'Edit link for audio source');
        this.haloButton.addEventListener('click', this.updateAudioLink);
    }

    updateAudioLink(event){
        // Tells the model to update its
        // src link for the audio
        let currentSrc = this.model.partProperties.getPropertyNamed(
            this.model,
            'src'
        );
        let result = window.prompt("Edit URL for audio:", currentSrc);
        if(result && result !== '' && result !== currentSrc){
            this.sendMessage(
                {
                    type: 'command',
                    commandName: 'loadAudioFromSource',
                    args: [ result ]
                },
                this.model
            );
        }
    }


};




/***/ }),

/***/ "./js/objects/views/BrowserView.js":
/*!*****************************************!*\
  !*** ./js/objects/views/BrowserView.js ***!
  \*****************************************/
/*! exports provided: BrowserView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserView", function() { return BrowserView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BrowserView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");


const linkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
</svg>
`;

const templateString = `
<style>
:host {
    box-sizing: border-box;
    display: block;
    position: absolute;
    padding: 1px;
    user-select: none;
    cursor: pointer;
}
iframe {
    width: 100%;
    height: 100%;
}
</style>
<iframe frameborder="0" allowfullscreen></iframe>
`;

class BrowserView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // Setup template and shadow dom
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(this.template.content.cloneNode(true));

        // Bind component methods
        this.onClick = this.onClick.bind(this);
        this.initCustomHaloButton = this.initCustomHaloButton.bind(this);
        this.updateBrowserLink = this.updateBrowserLink.bind(this);
    }

    afterConnected(){
        if(!this.haloButton){
            this.initCustomHaloButton();
        }
    }

    afterDisconnected(){
    }

    afterModelSet(){
        let iframe = this._shadowRoot.querySelector("iframe");
        let src = this.model.partProperties.getPropertyNamed(this.model, "src");
        if(src){
            iframe.src = src;
        }
        this.onPropChange("src", (url) => {
            try{
                // resource load is auto-loaded by the <browser> element
                iframe.src = url;
            } catch(error){
                let errorMsg = {
                    type: "error",
                    name: "ResourceNotFound",
                    resourceType: "browser",
                    partId: this.model.id,
                    details: {source: url, type: "url"}

                };
                this.model.sendMessage({errorMsg}, this.model);
            }
        });
    }

    onClick(event){
        if(event.button == 0){
            if(event.shiftKey){
                // prevent triggering the on click message
                event.preventDefault();
                if(this.hasOpenHalo){
                    this.closeHalo();
                } else {
                    this.openHalo();
                }
            } else if(!this.hasOpenHalo){
                // Send the click command message to self
                this.model.sendMessage({
                    type: 'command',
                    commandName: 'click',
                    args: [],
                    shouldIgnore: true // Should ignore if System DNU
                }, this.model);
            }
        }
    }

    openHalo(){
        // Override default. Here we add a custom button
        // when showing.
        let foundHalo = this.shadowRoot.querySelector('st-halo');
        if(!foundHalo){
            foundHalo = document.createElement('st-halo');
            this.shadowRoot.appendChild(foundHalo);
        }
        foundHalo.append(this.haloButton);
    }

    initCustomHaloButton(){
        this.haloButton = document.createElement('div');
        this.haloButton.id = 'halo-browser-link';
        this.haloButton.classList.add('halo-button');
        this.haloButton.innerHTML = linkIcon;
        this.haloButton.style.marginTop = "6px";
        this.haloButton.setAttribute('slot', 'right-column');
        this.haloButton.setAttribute('title', 'Edit link for browser source');
        this.haloButton.addEventListener('click', this.updateBrowserLink);
    }

    updateBrowserLink(event){
        // Tells the model to update its
        // src link for the browser
        let currentSrc = this.model.partProperties.getPropertyNamed(
            this.model,
            'src'
        );
        let result = window.prompt("Edit URL for browser:", currentSrc);
        if(result && result !== '' && result !== currentSrc){
            this.sendMessage(
                {
                    type: 'command',
                    commandName: 'setURLTo',
                    args: [ result ]
                },
                this.model
            );
        }
    }


};




/***/ }),

/***/ "./js/objects/views/ButtonView.js":
/*!****************************************!*\
  !*** ./js/objects/views/ButtonView.js ***!
  \****************************************/
/*! exports provided: ButtonView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonView", function() { return ButtonView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ButtonView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");
/**
 * ButtonView
 * ---------------------------------------------------
 * I am a webcomponent representing a Button.
 */


const templateString = `
                <style>
                 .st-button-label {
                     user-select: none;
                     pointer-events: none;
                     text-overflow: ellipsis;
                     overflow: hidden;
                     max-width: 95%;
                     white-space: nowrap;
                 }
                </style>
                <span class="st-button-label">
                    <slot></slot><!-- Text of the Name -->
                </span>
`;

class ButtonView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(this.template.content.cloneNode(true));

        // Bound methods
        this.setupPropHandlers = this.setupPropHandlers.bind(this);

        // Setup prop change handlers
        this.setupPropHandlers();
    }

    setupPropHandlers(){
        this.onPropChange('name', (value, partId) => {
            this.innerText = value;
        });
    }

    afterConnected(){
    }

    afterDisconnected(){
    }

    afterModelSet(){
        let buttonName = this.model.partProperties.getPropertyNamed(this, "name");
        if(buttonName){
            this.innerText = buttonName;
        };
    }

    // override the base class implementation
    onClick(event){
        if(event.button == 0){
            if(event.shiftKey){
                this.onHaloActivationClick(event);
            } else if(!this.hasOpenHalo){
                // Send the click command message to self
                this.model.sendMessage({
                    type: 'command',
                    commandName: 'click',
                    args: [],
                    shouldIgnore: true // Should ignore if System DNU
                }, this.model);
            }
        }
    }

    // Overwriting the base class open/close editor methods
    openEditor(){
        window.System.openEditorForPart(this.model.id);
    }

    closeEditor(){
        window.System.closeEditorForPart(this.model.id);
    }
};




/***/ }),

/***/ "./js/objects/views/CardView.js":
/*!**************************************!*\
  !*** ./js/objects/views/CardView.js ***!
  \**************************************/
/*! exports provided: CardView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardView", function() { return CardView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CardView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");
/**
 * CardView
 * --------------------------------------------------
 * I am a webcomponent representation of a Card.
 */



const templateString = `
                <style>
                </style>
                <slot></slot>
`;

class CardView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Halo settings. Cards don't want
        //a halo to open
        this.wantsHalo = false;

        // Bind component methods
    }

    afterConnected(){
    }

    afterDisconnected(){
    }

    // override the default class method
    onClick(event){
        if(event.button == 0 && event.shiftKey){
            event.preventDefault();
            event.stopPropagation();
        }
    }

    addContextMenuItems(contextMenu){
        contextMenu.addSpacer();
        // Toolbox toggle hide/unhide
        let currentStack = window.System.getCurrentStackModel();
        let toolbox = currentStack.subparts.filter((part) => {
            let name = part.partProperties.getPropertyNamed(part, "name");
            return name == "Toolbox";
        })[0];
        // if there is no toolbox at all, that's weird but don't do anything
        if(toolbox){
            let hidden = toolbox.partProperties.getPropertyNamed(toolbox, "hide");
            if(hidden){
                contextMenu.addListItem(
                    "Unhide Toolbox",
                    (event) => {
                        toolbox.partProperties.setPropertyNamed(toolbox, "hide", false);
                    }
                );
            } else {
                contextMenu.addListItem(
                    "Hide Toolbox",
                    (event) => {
                        toolbox.partProperties.setPropertyNamed(toolbox, "hide", true);
                    }
                );
            }
        }
    }
};




/***/ }),

/***/ "./js/objects/views/FieldView.js":
/*!***************************************!*\
  !*** ./js/objects/views/FieldView.js ***!
  \***************************************/
/*! exports provided: FieldView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldView", function() { return FieldView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");
/* harmony import */ var _utils_styler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils//styler.js */ "./js/objects/utils/styler.js");
/* harmony import */ var _drawing_ColorWheelWidget_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawing/ColorWheelWidget.js */ "./js/objects/views/drawing/ColorWheelWidget.js");
/* harmony import */ var _ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ohm/interpreter-semantics.js */ "./js/ohm/interpreter-semantics.js");
/* harmony import */ var _utils_AltSyntaxHighlighter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/AltSyntaxHighlighter.js */ "./js/objects/utils/AltSyntaxHighlighter.js");
/**
 * FieldView
 * ---------------------------------
 * I am the view of an Field part.
 * I am an "interim" view intended to display
 * and edit plain text on a Card.
 * I should be replaced with a more comprehensive
 * implementation of Field/FieldView in the future.
 */






const haloEditButtonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tools" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />
  <line x1="14.5" y1="5.5" x2="18.5" y2="9.5" />
  <polyline points="12 8 7 3 3 7 8 12" />
  <line x1="7" y1="8" x2="5.5" y2="9.5" />
  <polyline points="16 12 21 17 17 21 12 16" />
  <line x1="16" y1="17" x2="14.5" y2="18.5" />
</svg>
`;

const haloLockButtonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <rect x="5" y="11" width="14" height="10" rx="2"></rect>
   <circle cx="12" cy="16" r="1"></circle>
   <path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
</svg>
`;

const haloUnlockButtonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock-open" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <rect x="5" y="11" width="14" height="10" rx="2"></rect>
   <circle cx="12" cy="16" r="1"></circle>
   <path d="M8 11v-5a4 4 0 0 1 8 0"></path>
</svg>
`;

const fieldTemplateString = `
      <style>
        .field {
            display: flex;
            align-items: center;
            flex-direction: column;
            height: 100%;
            width: 100%;
            overflow: auto;
        }

        .field color-wheel {
            position: absolute;
        }

        .field-textarea {
            width: calc(100% - 5px);
            height: 100%;
            width: 100%;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
        }

        /* Syntax Highlighting
 *---------------------------------------------------*/
span[data-st-rule="messageName"]{
    text-decoration: underline;
}

span[data-st-rule="keyword"]{
    font-weight: bold;
}

span[data-st-rule="ParameterList-item"]{
    font-style: italic;
    color: grey;
}


    </style>
    <div class="field">
        <div class="field-textarea" spellcheck="false"></div>
    </div>`;


function formatDoc(sCmd, sValue) {
  document.execCommand(sCmd, false, sValue); oDoc.focus();
}

class FieldView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // this.editorCompleter = this.simpleTalkCompleter;
        this.textStyler = _utils_styler_js__WEBPACK_IMPORTED_MODULE_1__["default"];  // we might want to consider a more programmatic way to set this
        this.editorCompleter = null;
        this.contextMenuOpen = false;
        this.haloLockUnlockButton = null;
        this.selectionRanges = {};
        this.wantsContextMenu = false;

        // Presets for syntax highlighting.
        // When highlighting is enabled, we will check
        // each line of the text for the following
        // grammatical rules:
        this._syntaxRules = [
            "MessageHandlerOpen",
            "MessageHandlerClose"
        ];

        this.template = document.createElement('template');
        this.template.innerHTML = fieldTemplateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            this.template.content.cloneNode(true)
        );

        // Bind methods
        this.onInput = this.onInput.bind(this);
        this.onBeforeInput = this.onBeforeInput.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
        this.onMousedown = this.onMousedown.bind(this);
        this.openContextMenu = this.openContextMenu.bind(this);
        this.closeContextMenu = this.closeContextMenu.bind(this);
        this.doIt = this.doIt.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.openField = this.openField.bind(this);
        this.textToHtml = this.textToHtml.bind(this);
        this.setupPropHandlers = this.setupPropHandlers.bind(this);
        this.simpleTalkCompleter = this.simpleTalkCompleter.bind(this);
        this.initCustomHaloButtons = this.initCustomHaloButtons.bind(this);
        this.insertRange = this.insertRange.bind(this);
        this.setRangeInTarget = this.setRangeInTarget.bind(this);
        this.setSelection = this.setSelection.bind(this);
        this.highlightSyntax = this.highlightSyntax.bind(this);
        this.unhighlightSyntax = this.unhighlightSyntax.bind(this);

        this.setupPropHandlers();
    }

    setupPropHandlers(){
        this.onPropChange('editable', (value, id) => {
            this.textarea.setAttribute('contenteditable', value);
            if(value === true){
                this.haloLockUnlockButton = this.haloLockButton;
                this.classList.add("editable");
            } else if (value === false){
                this.haloLockUnlockButton = this.haloUnlockButton;
                this.classList.remove("editable");
            }
        });
        // 'text' is a DynamicProp whose setter will set the corresponding
        // value for `innerHTML`. This way we can have programmatic content
        // setting and still allow to not loose markup.
        // 'innerHTML' is a BasicProp. See how these are set, without
        // notification in this.onInput()
        this.onPropChange('innerHTML', (value, id) => {
            this.textarea.innerHTML = value;
            this.model.partProperties.setPropertyNamed(
                this.model,
                "text",
                this.textarea.innerText,
                false // do not notify, to avoid an infinite loop
            );
        });
    }

    afterConnected(){
        // The events here are added via the .addEventListener() API which is
        // distinct from the this.eventRespond() which uses the DOM element
        // element.onEvent API. This allows us to distnguish between "core"
        // system-web events that we don't want meddled with at the moment, like
        // entering text in a field, and ones exposed in the environemnt for scripting
        this.textarea = this._shadowRoot.querySelector('.field-textarea');

        this.textarea.addEventListener('input', this.onInput);
        //this.textarea.addEventListener('beforeinput', this.onBeforeInput);
        this.textarea.addEventListener('keydown', this.onKeydown);
        this.textarea.addEventListener('mousedown', this.onMousedown);
        // No need to add a click listener as the base PartView class does that

        // in order to deal with range insertions (for styling text fragments within
        // the textarea), we need to have the default paragraph tag = </br>. Otherwise
        // the insert new line is of the form <div></br><div> which causes the appearance
        // of newlines when nodes are inserted into a range
        //document.execCommand("defaultParagraphSeparator", false, "st-line");
    }

    afterDisconnected(){
        this.textarea.removeEventListener('input', this.onInput);
        //this.textarea.removeEventListener('beforeinput', this.onBeforeInput);
        this.textarea.removeEventListener('keydown', this.onKeydown);
        this.textarea.removeEventListener('mousedown', this.onMousedown);
    }

    afterModelSet(){
        this.textarea = this._shadowRoot.querySelector('.field-textarea');
        // If we have a model, set the value of the textarea
        // to the current html of the field model
        let innerHTML = this.model.partProperties.getPropertyNamed(
            this.model,
            'innerHTML'
        );
        this.textarea.innerHTML = innerHTML;

        let isEditable = this.model.partProperties.getPropertyNamed(this.model, "editable");
        this.textarea.setAttribute('contenteditable', isEditable);

        // setup the lock/unlock halo button
        this.initCustomHaloButtons();
        let editable = this.model.partProperties.getPropertyNamed(
            this.model,
            'editable'
        );
        if(editable === true){
            this.haloLockUnlockButton = this.haloLockButton;
            this.classList.add("editable");
        } else if (editable === false){
            this.haloLockUnlockButton = this.haloUnlockButton;
            this.classList.remove("editable");
        }
    }

    simpleTalkCompleter(element){
        let textContent = this.htmlToText(element);
        let startOfHandlerRegex = /^on\s(\w+)(\s|\n)+$/;
        let match = textContent.match(startOfHandlerRegex);
        if(match){
            let messageName = match[1];
            // if input break is a new line then an extra
            // <div></br></div> has beed added into the elemen already
            let tabLine = "\t\n";
            if(match[2] === "\n"){
                tabLine= "";
            }
            textContent = `${tabLine}end ${messageName}`;
            let innerHTML = this.textToHtml(textContent);
            element.insertAdjacentHTML("beforeend", innerHTML);
        }
        return element.innerHTML;
    }

    /*
     * I override my base-class's implementation to handle target related functionality
     */
    styleTextCSS(){
        let textarea = this._shadowRoot.querySelector('.field-textarea');
        let cssStyle = this.model.partProperties.getPropertyNamed(this, "cssTextStyle");
        Object.keys(cssStyle).forEach((key) => {
            let value = cssStyle[key];
            textarea.style[key] = value;
        });
        // if there is a target and range set then send the target an update message
        let target = this.model.partProperties.getPropertyNamed(this.model, 'target');
        if(target){
            this.setRangeInTarget(target, this.textarea.innerHTML, cssStyle);
        }
    }

    /*
     * set a text-* property on selection to style the selected text
     * Note: this is done for every current selection, i.e. everthing
     * in this.selectionRanges
     */
    setSelection(propName, value){
        Object.values(this.selectionRanges).forEach((range) => {
            let currentStyle = {};
            // // if the document fragment has one child node and it's a span
            // // we should style that directly. This avoids unncessary DOM elements
            // // being created to wrap the contents, such as when styling is continually
            // // applied ot the same selection
            // let span;
            // if(docFragment.childNodes.length == 1 && docFragment.childNodes[0].nodeName == "SPAN"){
            //     span = docFragment.childNodes[0];
            //     // Note the use of Obejct.values here for the DOM style attribute object
            //     // that's weird
            //     Object.values(span.style).forEach((key) => {
            //         currentStyle[key] = span.style[key];
            //     });
            // } else {
            //     // we need to create a span element to wrap the contents in style
            //     span = document.createElement('span');
            //     // While tempting to use range.surroundContents() avoid this
            //     // since it will fail with a non-informative error if the range
            //     // includes partial nodes (ex text across various nodes)
            //     while (docFragment.childNodes.length){
            //         span.appendChild(docFragment.childNodes[0]);
            //     }
            // }
            let span = document.createElement('span');
            let cssObject = this.textStyler(currentStyle, propName, value);
            Object.keys(cssObject).forEach((key) => {
                span.style[key] = cssObject[key];
            });

            span.append(range.extractContents());
            range.insertNode(span);
            
            this.model.partProperties.setPropertyNamed(
                this.model,
                'innerHTML',
                this.textarea.innerHTML,
                false // do not notify
            );
            // if there is a target and range set then send the target an update message
            let target = this.model.partProperties.getPropertyNamed(this.model, 'target');
            if(target){
                this.setRangeInTarget(target, this.textarea.innerHTML);
            }
        });
    }

    onBeforeInput(event){
        let selection = document.getSelection();
        let selectedRange = selection.getRangeAt(0);
        let range = selectedRange.cloneRange();

        let innerHTML = event.target.innerHTML;
        if(!innerHTML.endsWith("<div><br></div>")){
            innerHTML += "<div><br></div>";
            event.target.innerHTML = innerHTML;
        }
        
        if(event.inputType == "insertParagraph"){
            //event.stopPropagation();
            event.preventDefault();

            let br = document.createElement('br');
            let br2 = document.createElement('br');
            range.insertNode(br);
            range.collapse(false);
            range.insertNode(br2);
            range.setStartAfter(br2);
            range.setEndAfter(br2);
        }
    }

    onInput(event){
        let innerHTML = event.target.innerHTML;
        /*
        if(!innerHTML.endsWith("<br>")){
            innerHTML += "<br>";
            event.target.innerHTML = innerHTML;
        }
        */

        if(this.editorCompleter){
            // TODO sort out how this would work
            let innerHTML = event.target.innerHTML;
            innerHTML = this.editorCompleter(event.target);
        }

        this.model.partProperties.setPropertyNamed(
            this.model,
            'text',
            event.target.innerText,
            false // do not notify, to preserve contenteditable context
        );
        this.model.partProperties.setPropertyNamed(
            this.model,
            'innerHTML',
            event.target.innerHTML,
            false // do not notify
        );
        // Since we update the 'text' property without notification, the part/model
        // is not sent the "propertyChanged" message so we do so manually
        this.model.propertyChanged("text", event.target.innerText);
        // if there is a target and range set then send the target an update message
        let target = this.model.partProperties.getPropertyNamed(this.model, 'target');
        if(target){
            this.setRangeInTarget(target, event.target.innerHTML);
        }
    }

    onKeydown(event){
        // prevent the default tab key to leave focus on the field
        if(event.key==="Tab"){
            event.preventDefault();
            //document.execCommand('insertHTML', false, '&#x9');
            let sel = document.getSelection();
            let range = sel.getRangeAt(0);

            let tabNodeValue = '\t';
            let tabNode = document.createTextNode(tabNodeValue);

            range.insertNode(tabNode);

            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
        };
    }

    onMousedown(event){
        // clear all selections
        this.selectionRanges = {};
    }
    onClick(event){
        event.preventDefault();
        event.stopPropagation();
        if(event.button == 0){
            // if the shift key is pressed we toggle the halo
            if(event.shiftKey){
                this.onHaloActivationClick(event);
            } else{
                let text = window.getSelection().toString();
                // if no text is selected we do nothing
                if(text){
                    // if the altKey is pressed we open the context ("do it") menu
                    if(event.altKey){
                        if(!this.contextMenuOpen){
                            this.openContextMenu();
                        }
                    } else {
                        this.handleSelection(event.metaKey);
                    }
                } else {
                    // make sure no context menu is open
                    if(this.contextMenuOpen){
                        this.closeContextMenu();
                    }
                    // clear all the selections
                    this.selectionRanges = {};
                }
            }
        }
    }

    /* I handle selected text, creating a new field model/view
     * for every range in the selection, keeping track of every range
     * in this.selection Object/dict so that modification can be inserted
     * back into the corresponding ranges.
     */
    handleSelection(openNewField){
        let selection = window.getSelection();
        for(let i=0; i < selection.rangeCount; i++){
            // make sure this is not a continuing selection
            // and that the range is not already registered
            let range = selection.getRangeAt(i);
            let currentRanges = Object.values(this.selectionRanges);
            if(currentRanges.indexOf(range) >= 0){
                continue;
            }
            // we generate our own range ids, since we want this to correspond to
            // selection order which is not respected by the browser selection object
            // to ensure we don't hit on other views' ranges by accident we need unique id's
            let rangeId = Date.now(); //TODO we need a better random id
            this.selectionRanges[rangeId] = range;
            if(openNewField){
                // open a field for each new selection and populate it with the range html
                this.openField(range, rangeId);
            }
        }
    }

    openField(range, rangeId){
        // create an HTML document fragment from the range to avoid dealing wiht start/end
        // and offset calculations
        // fragments don't have the full html DOM element API so we need to create one
        let span = document.createElement('span');
        span.appendChild(range.cloneContents());

        // TODO these should all be messages and correspnding command handler definitions
        // should be part of the field's own script
        let fieldModel = window.System.newModel("field", this.model._owner.id, `selection ${rangeId}`);
        fieldModel.partProperties.setPropertyNamed(fieldModel, "innerHTML", span.innerHTML);
        fieldModel.partProperties.setPropertyNamed(fieldModel, "target", `field id ${this.model.id}`);
        fieldModel.partProperties.setPropertyNamed(fieldModel, "targetRangeId", rangeId);
    }

    /**
      * Given a tagrget specifier and html
      * I first look up to make sure that the target has the corresponding
      * range (coming from the targetRangeId property), and then set it with my
      * innerHTML. Note, since the target property value is an object specifier I
      * create a semantics objects and interpret the value resulting in a valid
      * part id.
      */
    setRangeInTarget(targetSpecifier, html, css){
        let targetRangeId = this.model.partProperties.getPropertyNamed(this.model, 'targetRangeId');
        let match = window.System.grammar.match(targetSpecifier, "ObjectSpecifier");
        let semantics = window.System.grammar.createSemantics();
        semantics.addOperation('interpret', Object(_ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this.model, window.System));
        let targetId = semantics(match).interpret();

        this.model.sendMessage({
            type: "command",
            commandName: "insertRange",
            args: [targetRangeId, html, css]
        }, window.System.partsById[targetId]);
    }

    /*
     * I insert the html (string) into the specified range (by id)
     */
    insertRange(rangeId, html, cssObj){
        let range = this.selectionRanges[rangeId];
        if(range){
            let span = document.createElement('span');
            span.innerHTML = html;
            if(cssObj){
                Object.keys(cssObj).forEach((key) => {
                    let value = cssObj[key];
                    span.style[key] = value;
                });
            }
            range.deleteContents();
            range.insertNode(span);
            // update the text and innerHTML properties without notification
            // to prevent unnecessary setting of the text/html
            this.model.partProperties.setPropertyNamed(
                this.model,
                'text',
                this.textarea.innerText,
                false // do not notify, to preserve contenteditable context
            );
            this.model.partProperties.setPropertyNamed(
                this.model,
                'innerHTML',
                this.textarea.innerHTML,
                false // do not notify
            );
        }
    }

    openContextMenu(){
        let text = document.getSelection().toString();
        let focusNode = document.getSelection().focusNode;
        let button = document.createElement("button");
        button.id = "doIt";
        button.style.marginLeft = "10px";
        button.style.backgroundColor = "var(--palette-green)";
        button.textContent = "Do it!";
        button.addEventListener("click", this.doIt);
        focusNode.after(button);
        this.contextMenuOpen = true;
    };

    closeContextMenu(){
        let button = this._shadowRoot.querySelector('#doIt');
        if(button){
            button.remove();
        }
        // clear the selection and set the context menu to closed
        document.getSelection().removeAllRanges();
        this.contextMenuOpen = false;
    }

    doIt(event){
        event.stopPropagation();
        let text = document.getSelection().toString();
        // clean up the text to make sure no newlines or spaces made it in
        text = text.replace(/^[\t\n ]+/, "");
        text = text.replace(/[\t\n ]+$/, "");
        this.closeContextMenu();
        // send message to compile the prepped script
        let script = `on doIt\n   ${text}\nend doIt`;
        // send these messages from the model (not the view)
        // since if there is an error the original sender will
        // have an id
        this.model.sendMessage(
            {
                type: "compile",
                codeString: script,
                targetId: this.model.id
            },
            this.model
        );
        this.model.sendMessage(
            {
                type: "command",
                commandName: "doIt",
                args: [],
                shouldIgnore: true // Should ignore if System DNU
            },
            this.model
        );
    }

    initCustomHaloButtons(){
        this.haloLockButton = document.createElement('div');
        this.haloLockButton.id = "halo-field-lock-editor";
        this.haloLockButton.classList.add('halo-button');
        this.haloLockButton.innerHTML = haloLockButtonSVG;
        this.haloLockButton.style.marginRight = "6px";
        this.haloLockButton.setAttribute('slot', 'bottom-row');
        this.haloLockButton.setAttribute('title', 'Lock Editing');
        this.haloLockButton.addEventListener('click', () => {
            this.model.sendMessage({
                type: 'command',
                commandName: 'setProperty',
                args: ["editable", false],
            }, this.model);
            this.closeHalo();
            this.openHalo();
            // close/open the halo to update the editing state toggle button
        });
        this.haloUnlockButton = document.createElement('div');
        this.haloUnlockButton.id = "halo-field-unlock-editor";
        this.haloUnlockButton.classList.add('halo-button');
        this.haloUnlockButton.innerHTML = haloUnlockButtonSVG;
        this.haloUnlockButton.style.marginRight = "6px";
        this.haloUnlockButton.setAttribute('slot', 'bottom-row');
        this.haloUnlockButton.setAttribute('title', 'Unlock Editing');
        this.haloUnlockButton.addEventListener('click', () => {
            this.model.sendMessage({
                type: 'command',
                commandName: 'setProperty',
                args: ["editable", true],
            }, this.model);
            // close/open the halo to update the editing state toogle button
            this.closeHalo();
            this.openHalo();
        });
    }

    openHalo(){
        // Override default. Here we add a custom button
        // when showing.
        let foundHalo = this.shadowRoot.querySelector('st-halo');
        if(!foundHalo){
            foundHalo = document.createElement('st-halo');
            this.shadowRoot.appendChild(foundHalo);
        }
        foundHalo.append(this.haloLockUnlockButton);
    }

    // Overwriting the base class open/close editor methods
    openEditor(){
        window.System.openEditorForPart(this.model.id);
    }

    closeEditor(){
        window.System.closeEditorForPart(this.model.id);
    }


    /*
     * I convert raw text to html respecting the Firefox
     * contenteditable attribute guidelnes.
     * This means that single lins of text are left as is;
     * multiline text, i.e. text which includes "\n", is
     * wrapped in <div></div> for every line; and the last
     * line gets a <br> tag inserted before the </div> to reflect
     * the "on-enter-key" behavior.
     */
    textToHtml(text){
        if(text){
            let textLines = text.split("\n");
            if(textLines.length > 1){
                let html = "";
                textLines.forEach((line) => {
                    if(line){
                        html += `<div>${line}</div>`;
                    } else {
                        html += "<div><br></div>";
                    }
                });
                return  `<div>${html}<br></div>`;
            } else {
                return text;
            }
        } else {
            return "";
        }
    }

    htmlToText(element){
        // TODO this is very naive and ignores most possible structure
        if(element.innerHTML){
            // first replace all the "</div><div>" with line breaks
            let cleanHTML =  element.innerHTML.replace(/<\/div><div>/g, "\n");
            // then remove all html
            let tempElement = document.createElement("div");
            tempElement.innerHTML = cleanHTML;
            let cleanText = tempElement.textContent;
            tempElement.remove();
            return cleanText;
        } else {
            return "";
        }
    }

    highlightSyntax(){
        let current = this.getAttribute("syntax");
        if(current && current !== "false"){
            this.unhighlightSyntax();
        }
        let semantics = window.System.grammar.createSemantics();
        semantics.addOperation(
            "highlightSyntax",
            Object(_utils_AltSyntaxHighlighter_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this)
        );
        let text = this.model.partProperties.getPropertyNamed(
            this.model,
            "text"
        );
        if(!text){
            return;
        }
        let newHTML = text.split("\n").map(line => {
            // Loop through each rule and try to match
            for(let i = 0; i < this._syntaxRules.length; i++){
                let rule = this._syntaxRules[i];
                let match = window.System.grammar.match(line, rule);
                if(match.succeeded()){
                    return semantics(match).highlightSyntax().outerHTML;
                }
            }
            return line;
        }).join("\n");

        this.model.partProperties.setPropertyNamed(
            this.model,
            "innerHTML",
            newHTML
        );

        this.toggleAttribute("syntax", true);
    }

    unhighlightSyntax(){
        let text = this.model.partProperties.getPropertyNamed(
            this.model,
            "text"
        );
        if(!text){
            return;
        }
        let plainElements = text.split("\n").map(line => {
            let div = document.createElement("div");
            div.innerText = line;
            return div;
        });
        let finalLine = document.createElement("div");
        finalLine.append(document.createElement("br"));
        plainElements.push(finalLine);

        let newHTML = "";
        plainElements.forEach(element => {
            newHTML += element.outerHTML;
        });

        this.model.partProperties.setPropertyNamed(
            this.model,
            "innerHTML",
            newHTML
        );

        this.toggleAttribute("syntax", false);
    }
};




/***/ }),

/***/ "./js/objects/views/Halo.js":
/*!**********************************!*\
  !*** ./js/objects/views/Halo.js ***!
  \**********************************/
/*! exports provided: Halo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Halo", function() { return Halo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Halo; });
/**
 * New Halo
 */

/** Note: Icons are from 
*** https://tablericons.com/
**/
const deleteIcon =`
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="4" y1="7" x2="20" y2="7" />
  <line x1="10" y1="11" x2="10" y2="17" />
  <line x1="14" y1="11" x2="14" y2="17" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
`;
const editIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
  <line x1="16" y1="5" x2="19" y2="8" />
</svg>
`;
const growIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrows-diagonal-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <polyline points="16 20 20 20 20 16" />
  <line x1="14" y1="14" x2="20" y2="20" />
  <polyline points="8 4 4 4 4 8" />
  <line x1="4" y1="4" x2="10" y2="10" />
</svg>
`;

const copyIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <rect x="8" y="8" width="12" height="12" rx="2"></rect>
   <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
</svg>
`;

const pasteIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
   <rect x="9" y="3" width="6" height="4" rx="2"></rect>
   <path d="M9 14l2 2l4 -4"></path>
</svg>
`;

const targetIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-focus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <circle cx="12" cy="12" r=".5" fill="currentColor"></circle>
   <circle cx="12" cy="12" r="9"></circle>
</svg>
`;

const settingsIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
  <circle cx="12" cy="12" r="3" />
</svg>
`;

const rotateIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate-clockwise" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"></path>
</svg>
`;

const templateString = `
<style>
 :host {
     --halo-button-height: 25px;
     --halo-button-width: 25px;
     --halo-rim-margin: 10px;
     --halo-button-width-padded: calc(var(--halo-button-width) + var(--halo-rim-margin));
     --halo-button-height-padded: calc(var(--halo-button-height) + var(--halo-rim-margin));
     position: absolute;
     box-sizing: border-box;
     top: calc(-1 * var(--halo-button-height-padded));
     left: calc(-1 * var(--halo-button-width-padded));
     width: calc(100% + (2 * var(--halo-button-width-padded)));
     height: calc(100% + (2 * var(--halo-button-height-padded)));
     color: initial;
     z-index: 10;
 }


 .halo-row,
 .halo-column {
     display: flex;
     position: absolute;
 }

 .halo-column {
     flex-direction: column;
 }

 #halo-top-row,
 #halo-bottom-row {
     width: calc(100% - var(--halo-button-width-padded));
     height: var(--halo-button-height-padded);
 }

 #halo-top-row {
     left: 0;
     top: 0;
 }

 #halo-bottom-row {
     right: 0;
     bottom: 0;
     flex-direction: row-reverse;
     align-items: flex-end;
 }

 #halo-right-column,
 #halo-left-column {
     height: calc(100% - var(--halo-button-height-padded));
     width: var(--halo-button-width-padded);
 }

 #halo-right-column {
     right: 0;
     top: 0;
     align-items: flex-end;
 }

 #halo-left-column {
     left: 0;
     top: var(--halo-button-height-padded);
 }

 .halo-button,
 ::slotted(*) {
     display: block;
     border: 1px solid rgba(100, 100, 100, 0.8);
     width: var(--halo-button-width);
     height: var(--halo-button-height);
     background-color: rgb(220, 220, 220);
 }

 .halo-button:hover
 ::slotted(*).halo-button:hover {
     cursor: pointer;
 }

 .halo-button:active
 ::slotted(*).halo-button:active {
     border: 1px solid black;
 }

 .halo-button.hidden
 ::slotted(*).halo-button.hidden {
     display: none;
 }

</style>

<div id="halo-top-row" class="halo-row">
    <div id="halo-delete" class="halo-button" title="Delete this part">
        ${deleteIcon}
    </div>
    <slot name="top-row"></slot>
</div>

<div id="halo-bottom-row" class="halo-row">
    <div id="halo-resize" class="halo-button" title="Resize this part">
        ${growIcon}
    </div>
    <div id="halo-script-edit" class="halo-button" title="Edit this part's script">
        ${editIcon}
    </div>
    <div id="halo-edit" class="halo-button" title="Edit this part">
        ${settingsIcon}
    </div>
    <slot name="bottom-row"></slot>
</div>

<div id="halo-left-column" class="halo-column">
    <div id="halo-copy" class="halo-button" title="Copy this Part">
        ${copyIcon}
    </div>
    <div id="halo-paste" class="halo-button" title="Paste the contents of clipboard into this Part">
        ${pasteIcon}
    </div>
    <div id="halo-target" class="halo-button" title="Select this Part's target">
        ${targetIcon}
    </div>
    <slot name="left-column"></slot>
</div>

<div id="halo-right-column" class="halo-column">
    <div id="halo-rotate" class="halo-button" title="Rotate this part">
        ${rotateIcon}
    </div>
    <slot name="right-column"></slot>
</div>

`;

class Halo extends HTMLElement {
    constructor(){
        super();

        // Configure the Shadow DOM and template
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(
            this.template.content.cloneNode(true)
        );

        // Bind component methods


        // Bind event listeners
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onResizeMouseDown = this.onResizeMouseDown.bind(this);
        this.onResizeMouseUp = this.onResizeMouseUp.bind(this);
        this.onResizeMouseMove = this.onResizeMouseMove.bind(this);
        this.onRotateMouseDown = this.onRotateMouseDown.bind(this);
        this.onRotateMouseUp = this.onRotateMouseUp.bind(this);
        this.onRotateMouseMove = this.onRotateMouseMove.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.targetElement = this.getRootNode().host;
            this.targetElement.classList.add('editing');
            this.targetElement.hasOpenHalo = true;

            // Add event listeners
            this.addEventListener('mousedown', this.onMouseDown);

            // Resize button
            this.resizer = this.shadowRoot.getElementById('halo-resize');
            this.resizer.addEventListener('mousedown', this.onResizeMouseDown);
            if(!this.targetElement.wantsHaloResize){
                this.resizer.style.visibility = 'hidden';
            }

            // Rotate button
            this.rotater = this.shadowRoot.getElementById('halo-rotate');
            this.rotater.addEventListener('mousedown', this.onRotateMouseDown);
            if(!this.targetElement.wantsHaloRotate){
                this.rotater.style.visibility = 'hidden';
            }
            // Delete button
            this.deleter = this.shadowRoot.getElementById('halo-delete');
            this.deleter.addEventListener('click', this.targetElement.onHaloDelete);
            if(!this.targetElement.wantsHaloDelete){
                this.deleter.style.visibility = 'hidden';
            }

            // Edit button
            this.scriptEditor = this.shadowRoot.getElementById('halo-script-edit');
            this.scriptEditor.addEventListener('click', this.targetElement.onHaloOpenScriptEditor);
            if(!this.targetElement.wantsHaloScriptEdit){
                this.scriptEditor.style.visibility = 'hidden';
            }

            // Comprehensive editor button
            this.editor = this.shadowRoot.getElementById('halo-edit');
            this.editor.addEventListener('click', this.targetElement.onHaloOpenEditor);
            if(!this.targetElement.wantsHaloEdit){
                this.editor.style.visibility = 'hidden';
            }

            // Copy button
            this.copier = this.shadowRoot.getElementById('halo-copy');
            this.copier.addEventListener('click', this.targetElement.onHaloCopy);


            // Paste button
            this.paster = this.shadowRoot.getElementById('halo-paste');
            this.paster.addEventListener('click', this.targetElement.onHaloPaste);

            // Target button
            this.targeter = this.shadowRoot.getElementById('halo-target');
            this.targeter.addEventListener('click', this.targetElement.onHaloTarget);
            this.targeter.addEventListener('mouseenter', this.targetElement.onHaloTargetButtonMouseEnter);
            this.targeter.addEventListener('mouseleave', this.targetElement.onHaloTargetButtonMouseLeave);
        }
    }

    disconnectedCallback(){
        this.targetElement.classList.remove('editing');
        this.targetElement.hasOpenHalo = false;

        // Remove event listeners
        this.removeEventListener('mousedown', this.onMouseDown);
        this.resizer.removeEventListener('mousedown', this.onResizeMouseDown);
    }


    /* Event Handling */
    onMouseDown(event){
        if(event.button == 0 && this.targetElement.wantsHaloMove){
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        }
    }

    onMouseMove(event){
        let currentTop = parseInt(this.targetElement.style.top);
        let currentLeft = parseInt(this.targetElement.style.left);
        let newTop = event.movementY + currentTop;
        let newLeft = event.movementX + currentLeft;

        let model = this.targetElement.model;
        model.partProperties.setPropertyNamed(model, "top", newTop);
        model.partProperties.setPropertyNamed(model, "left", newLeft);
    }

    onMouseUp(event){
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    onResizeMouseDown(event){
        event.stopPropagation();
        document.addEventListener('mousemove', this.onResizeMouseMove);
        document.addEventListener('mouseup', this.onResizeMouseUp);
    }

    onResizeMouseUp(event){
        document.removeEventListener('mousemove', this.onResizeMouseMove);
        document.removeEventListener('mouseup', this.onResizeMouseUp);
    }

    onResizeMouseMove(event){
        this.targetElement.onHaloResize(
            event.movementX,
            event.movementY
        );
    }

    onRotateMouseDown(event){
        event.stopPropagation();
        document.addEventListener('mousemove', this.onRotateMouseMove);
        document.addEventListener('mouseup', this.onRotateMouseUp);
    }

    onRotateMouseUp(event){
        document.removeEventListener('mousemove', this.onRotateMouseMove);
        document.removeEventListener('mouseup', this.onRotateMouseUp);
    }

    onRotateMouseMove(event){
        this.targetElement.onHaloRotate(
            event.movementX,
            event.movementY
        );
    }
};




/***/ }),

/***/ "./js/objects/views/ImageView.js":
/*!***************************************!*\
  !*** ./js/objects/views/ImageView.js ***!
  \***************************************/
/*! exports provided: ImageView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageView", function() { return ImageView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImageView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");


const linkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
</svg>
`;

const pictureIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <line x1="15" y1="8" x2="15.01" y2="8"></line>
   <rect x="4" y="4" width="16" height="16" rx="3"></rect>
   <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
   <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
</svg>
`;

const templateString = `
<img id="wrapped-image" class="hidden" />
<svg class="hidden" id="wrapped-svg" xmlns="http://www.w3.org/2000/svg">
</svg>
<style>
:host {
    box-sizing: border-box;
    display: block;
    position: absolute;
    user-select: none;
}

.hidden {
    display: none;
}
img {
    width: 100%;
    height: auto;
    display: block;
}

.currently-wrapped {
    width: 100%;
    height: 100%;
}
</style>
`;

class ImageView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // Setup template and shadow dom
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(this.template.content.cloneNode(true));

        // Bind component methods
        this.updateImageData = this.updateImageData.bind(this);
        this.updateSvgImage = this.updateSvgImage.bind(this);
        this.updateBinaryImage = this.updateBinaryImage.bind(this);
        this.setDefaultImage = this.setDefaultImage.bind(this);
        this.onClick = this.onClick.bind(this);
        this.initCustomHaloButton = this.initCustomHaloButton.bind(this);
        this.updateImageLink = this.updateImageLink.bind(this);
        this.updateSizingForViewport = this.updateSizingForViewport.bind(this);
    }

    afterModelSet(){
        // prop changes
        this.onPropChange("imageData", (imageData) => {
            if(!imageData){
                this.setDefaultImage();
            }
            this.updateImageData(imageData);
        });

        // Make sure we have imageData. If not, try
        // to load from a src.
        let currentImageData = this.model.partProperties.getPropertyNamed(
            this.model,
            "imageData"
        );
        let currentSrc = this.model.partProperties.getPropertyNamed(
            this.model,
            "src"
        );
        if(!currentImageData){
            if(currentSrc){
                let msg = {
                    type: 'command',
                    commandName: 'loadImageFrom',
                    args: [ currentSrc ]
                };
                this.model.sendMessage(msg, this.model);
            } else {
                this.setDefaultImage();
            }
        } else {
            this.updateImageData(currentImageData);
        }
    }

    afterConnected(){
        if(!this.haloButton){
            this.initCustomHaloButton();
        }
    }

    afterDisconnected(){
    }

    setDefaultImage(){
        this.model.partProperties.setPropertyNamed(this.model, "imageData", pictureIcon);
        this.model.partProperties.setPropertyNamed(this.model, "mimeType", "image/svg");
        this.model.partProperties.setPropertyNamed(this.model, "src", "");
        this.updateImageData(pictureIcon);
    }

    updateImageData(imageData){
        if(this.model.isSvg){
            this.updateSvgImage(imageData);
        } else {
            this.updateBinaryImage(imageData);
        }
    }

    updateBinaryImage(imageData){
        // In this case, the imageData is
        // a base64 encoded data url describing
        // the bits of the image.
        let imgEl = this._shadowRoot.getElementById('wrapped-image');
        let svgEl = this._shadowRoot.getElementById('wrapped-svg');
        svgEl.classList.add('hidden');
        svgEl.classList.remove('currently-wrapped');
        imgEl.classList.add('currently-wrapped');
        imgEl.src = imageData;
        imgEl.onload = () => {
            //this.updateSizingForViewport();
        };
        this.preserveAspectOnResize = true;
        imgEl.classList.remove('hidden');
    }

    updateSvgImage(imageData){
        let imgEl = this._shadowRoot.getElementById('wrapped-image');
        let currentSvgEl = this._shadowRoot.getElementById('wrapped-svg');
        let parser = new DOMParser();
        let xmlDocument = parser.parseFromString(imageData, 'application/xml');
        let newSvgEl = xmlDocument.documentElement;

        // Ensure that the SVG has some width and height attributes
        // set so we have initial dimensions to display. If not present,
        // pull from viewbox.
        if(!newSvgEl.hasAttribute('width') || !newSvgEl.hasAttribute('height')){
            let viewBox = newSvgEl.getAttribute('viewBox');
            if(viewBox){
                viewBox = viewBox.split(" ");
                let viewBoxWidth = parseInt(viewBox[2]);
                let viewBoxHeight = parseInt(viewBox[3]);
                newSvgEl.setAttribute('height', viewBoxHeight);
                newSvgEl.setAttribute('width', viewBoxWidth);
            }
        } 
        newSvgEl.id = 'wrapped-svg';
        newSvgEl.classList.add('currently-wrapped');
        imgEl.classList.add('hidden');
        imgEl.classList.remove('currently-wrapped');
        currentSvgEl.remove();
        this._shadowRoot.appendChild(newSvgEl);
        this.updateSizingForViewport();
        this.preserveAspectOnResize = false;
    }

    updateImageLink(event){
        // Tells the model to update its
        // src link for the image
        let currentSrc = this.model.partProperties.getPropertyNamed(
            this.model,
            'src'
        );
        let result = window.prompt("Edit URL for image:", currentSrc);
        if(result && result !== '' && result !== currentSrc){
            this.sendMessage(
                {
                    type: 'command',
                    commandName: 'loadImageFrom',
                    args: [ result ]
                },
                this.model
            );
        }
    }

    updateSizingForViewport(){
        // Ensure that this component does not display larger
        // than the current remaining subrectangle of its origin
        // and the corner of the viewport
        let padding = 40;
        // First, we need to find the absolute top corner
        // locations for the element
        let el = this._shadowRoot.querySelector('.currently-wrapped');
        let top = 0;
        let left = 0;
        while(el){
            top += el.offsetTop;
            left += el.offsetLeft;
            el = el.offsetParent;
        }

        let rect = this.getBoundingClientRect();
        let heightLimit = document.documentElement.clientHeight - padding;
        if((rect.height + top) > heightLimit){
            let ratio = (heightLimit - top) / rect.height;
            // this.style.height = `${rect.height * ratio}px`;
            // this.style.width = `${rect.width * ratio}px`;
            this.model.partProperties.setPropertyNamed(
                this.model,
                'width',
                (rect.width * ratio)
            );
            this.model.partProperties.setPropertyNamed(
                this.model,
                'height',
                (rect.height * ratio)
            );
        }
    }

    openHalo(){
        // Override default. Here we add a custom button
        // when showing.
        let foundHalo = this.shadowRoot.querySelector('st-halo');
        if(!foundHalo){
            foundHalo = document.createElement('st-halo');
            this.shadowRoot.appendChild(foundHalo);
        }
        foundHalo.append(this.haloButton);
    }

    onHaloResize(movementX, movementY){
        // Override default behavior.
        // We resize the wrapped svg or img instead
        // and have the outer component simply react to
        // the change.
        // If the part is rotated this will throw off the bounding rectangle
        // browser calcualtion. So the hack here is to rotate the part to 0
        // (if necessary) do the calculations and then rotate it back
        let angle = this.model.partProperties.getPropertyNamed(this.model, "rotate");
        if(angle){
            this.model.partProperties.setPropertyNamed(this.model, "rotate", 0);
        }
        let wrappedImage = this._shadowRoot.querySelector('.currently-wrapped');
        let rect = wrappedImage.getBoundingClientRect();
        let newWidth, newHeight;
        if(this.preserveAspectOnResize){
            let maxWidth = rect.width + movementX;
            let maxHeight = rect.height + movementY;
            let ratio = Math.min(maxWidth / rect.width, maxHeight / rect.height);
            newHeight = rect.height * ratio;
            newWidth = rect.width * ratio;
        } else {
            newWidth = rect.width + movementX;
            newHeight = rect.height + movementY;
        }

        if(newWidth && newHeight){
            this.model.partProperties.setPropertyNamed(
                this.model,
                'width',
                newWidth
            );
            this.model.partProperties.setPropertyNamed(
                this.model,
                'height',
                newHeight
            );
        }
        // reset the rotate angle to the original (if necessary)
        if(angle){
            this.model.partProperties.setPropertyNamed(this.model, "rotate", angle);
        }
    }

    initCustomHaloButton(){
        this.haloButton = document.createElement('div');
        this.haloButton.id = 'halo-image-link';
        this.haloButton.classList.add('halo-button');
        this.haloButton.innerHTML = linkIcon;
        this.haloButton.style.marginTop = "6px";
        this.haloButton.setAttribute('slot', 'right-column');
        this.haloButton.setAttribute('title', 'Edit link for image file');
        this.haloButton.addEventListener('click', this.updateImageLink);
    }

    addContextMenuItems(contextMenu){
        contextMenu.addSpacer();
        contextMenu.addListItem(
            'Edit Image URL',
            this.updateImageLink
        );
    }
};




/***/ }),

/***/ "./js/objects/views/PartView.js":
/*!**************************************!*\
  !*** ./js/objects/views/PartView.js ***!
  \**************************************/
/*! exports provided: PartView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PartView", function() { return PartView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PartView; });
/* harmony import */ var _contextmenu_ContextMenu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contextmenu/ContextMenu.js */ "./js/objects/views/contextmenu/ContextMenu.js");
/* harmony import */ var _ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ohm/interpreter-semantics.js */ "./js/ohm/interpreter-semantics.js");
/**
 * PartView
 * ----------------------------------------
 * I am an *abstract* webcompoent CustomElement
 * that serves as the generic view for any Part
 * models.
 * I should not be instantiated directly, nor should
 * I be added to any web page's registry of CustomElements.
 * I am indended to be extended (subclassed) by the actual
 * views for each Part kind, and therefore I contain all
 * of the common behavior, including lifecycle methods,
 * for these.
 */



window.customElements.define('st-context-menu', _contextmenu_ContextMenu_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

class PartView extends HTMLElement {
    constructor(){
        super();
        this.model = null;
        this.isPartView = true;
        this.isLensed = false;
        this.name = this.constructor.name;
        this.propChangeHandlers = {};
        this.setupBasePropHandlers();
        this.viewChangeHandlers = {};
        this.setupBaseViewChangeHandlers();

        // Halo settings. All are on by default
        this.wantsHaloResize = true;
        this.wantsHaloRotate = true;
        this.wantsHaloScriptEdit = true;
        this.wantsHaloEdit = true;
        this.wantsHaloDelete = true;
        this.wantsHalo = true;
        // Note: see getter for wantsHaloMove

        // Context menu settings
        this.wantsContextMenu = true;

        // Bind component methods
        this.setModel = this.setModel.bind(this);
        this.unsetModel = this.unsetModel.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.setupBasePropHandlers = this.setupBasePropHandlers.bind(this);
        this.setupBaseViewChangeHandlers = this.setupBaseViewChangeHandlers.bind(this);
        this.initLayout = this.initLayout.bind(this);

        // Bind initial property method
        this.styleCSS = this.styleCSS.bind(this);
        this.styleTextCSS = this.styleTextCSS.bind(this);

        // Bind property change reaction methods
        this.primHandlePropChange = this.primHandlePropChange.bind(this);
        this.onPropChange = this.onPropChange.bind(this);
        this.primHandleViewChange = this.primHandleViewChange.bind(this);
        this.onViewChange = this.onViewChange.bind(this);
        this.scriptChanged = this.scriptChanged.bind(this);
        this.layoutChanged = this.layoutChanged.bind(this);
        this.listDirectionChanged = this.listDirectionChanged.bind(this);
        this.listWrappingChanged = this.listWrappingChanged.bind(this);
        this.vResizingChanged = this.vResizingChanged.bind(this);
        this.hResizingChanged = this.hResizingChanged.bind(this);
        this.pinningLeftChanged = this.pinningLeftChanged.bind(this);
        this.pinningTopChanged = this.pinningTopChanged.bind(this);
        this.pinningBottomChanged = this.pinningBottomChanged.bind(this);
        this.pinningRightChanged = this.pinningRightChanged.bind(this);
        this.listAlignmentChanged = this.listAlignmentChanged.bind(this);
        this.listDistributionChanged = this.listDistributionChanged.bind(this);

        // Bind view change reaction methods
        this.subpartOrderChanged = this.subpartOrderChanged.bind(this);
        this.newSubpartView = this.newSubpartView.bind(this);

        // Bind Halo related methods
        this.openHalo = this.openHalo.bind(this);
        this.closeHalo = this.closeHalo.bind(this);
        this.onHaloDelete = this.onHaloDelete.bind(this);
        this.onHaloOpenEditor = this.onHaloOpenEditor.bind(this);
        this.onHaloOpenScriptEditor = this.onHaloOpenScriptEditor.bind(this);
        this.onHaloResize = this.onHaloResize.bind(this);
        this.onHaloRotate = this.onHaloRotate.bind(this);
        this.onHaloPaste = this.onHaloPaste.bind(this);
        this.onHaloCopy = this.onHaloCopy.bind(this);
        this.onHaloTarget = this.onHaloTarget.bind(this);
        this.endHaloTarget = this.endHaloTarget.bind(this);
        this.onHaloTargetButtonMouseEnter = this.onHaloTargetButtonMouseEnter.bind(this);
        this.onHaloTargetButtonMouseLeave = this.onHaloTargetButtonMouseLeave.bind(this);
        this.onHaloActivationClick = this.onHaloActivationClick.bind(this);
        this.onHaloOpenEditor = this.onHaloOpenEditor.bind(this);
        this.onAuxClick = this.onAuxClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onContextMenuClick = this.onContextMenuClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.handleTargetKey = this.handleTargetKey.bind(this);
        this.handleTargetMouseClick = this.handleTargetMouseClick.bind(this);
        this.handleTargetMouseOver = this.handleTargetMouseOver.bind(this);
        this.handleTargetMouseOut = this.handleTargetMouseLeave.bind(this);
        this.addContextMenuItems = this.addContextMenuItems.bind(this);
        this.getCurrentTargetViews = this.getCurrentTargetViews.bind(this);

        // Bind editor related methods
        this.openEditor = this.openEditor.bind(this);
        this.closeEditor = this.closeEditor.bind(this);

        // Context menu
        this.openContextMenuAt = this.openContextMenuAt.bind(this);
        this.closeContextMenu = this.closeContextMenu.bind(this);

        // misc
        this.highlight = this.highlight.bind(this);
        this.unhighlight = this.unhighlight.bind(this);

        // Bind lifecycle methods
        this.afterModelSet = this.afterModelSet.bind(this);
        this.afterModelUnset = this.afterModelUnset.bind(this);
        this.afterConnected = this.afterConnected.bind(this);
        this.afterDisconnected = this.afterDisconnected.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            // Do some universal PartView configuration
            // when attached to a parent element, like
            // registering event listeners etc

            // Register middle mouse button click
            // to toggle the halo
            this.addEventListener('auxclick', this.onAuxClick);

            // Register default event handlers manually]
            this.addEventListener('click', this.onClick);
            this.addEventListener('contextmenu', this.onContextMenuClick);

            // Call the lifecycle method when done
            // with the above
            this.afterConnected();
        }
    }

    disconnectedCallback(){
        this.removeEventListener('auxclick', this.onAuxClick);
        this.removeEventListener('click', this.onClick);
        this.removeEventListener('contextmenu', this.onContextMenuClick);
        this.afterDisconnected();
    }

    setModel(aModel){
        this.unsetModel();
        this.model = aModel;
        aModel.addPropertySubscriber(this);
        aModel.addViewSubscriber(this);
        if(this.isLensed){
            this.removeAttribute('part-id');
            this.setAttribute('lens-part-id', aModel.id);
        } else {
            this.removeAttribute('lens-part-id');
            this.setAttribute('part-id', aModel.id);
        }

        // load all the initial styling
        this.styleCSS();
        this.styleTextCSS();
        this.initLayout();
        this.afterModelSet();
    }

    unsetModel(){
        if(this.model){
            let removedModel = this.model;
            this.model.removePropertySubscriber(this);
            this.model = null;
            this.setAttribute('part-id', "");
            this.afterModelUnset(removedModel);
        }
    }

    setupBasePropHandlers(){
        // This is where we should setup any
        // prop change handlers that are universal
        // to all PartViews. We would do this via
        // the #onPropChange method, which registers
        // a handler function.
        // Do not override this method
        // TODO: Implement the universals
        this.onPropChange('script', this.scriptChanged);
        this.onPropChange('number', this.numberChanged);
        this.onPropChange('cssStyle', this.styleCSS);
        this.onPropChange('cssTextStyle', this.styleTextCSS);
        this.onPropChange('layout', this.layoutChanged);
        this.onPropChange('list-direction', this.listDirectionChanged);
        this.onPropChange('list-wrapping', this.listWrappingChanged);
        this.onPropChange('list-alignment', this.listAlignmentChanged);
        this.onPropChange('list-distribution', this.listDistributionChanged);
        this.onPropChange('horizontal-resizing', this.hResizingChanged);
        this.onPropChange('vertical-resizing', this.vResizingChanged);
        this.onPropChange('pinning-top', this.pinningTopChanged);
        this.onPropChange('pinning-right', this.pinningRightChanged);
        this.onPropChange('pinning-left', this.pinningLeftChanged);
        this.onPropChange('pinning-bottom', this.pinningBottomChanged);
        this.onPropChange('wants-move', (value) => {
            if(value){
                this.addEventListener('mousedown', this.onMouseDown);
            } else {
                this.removeEventListener('mousedown', this.onMouseDown);
            }
        });
    }

    setupBaseViewChangeHandlers(){
        // This is where we should setup any
        // view change handlers that are universal
        // to all PartViews. We would do this via
        // the #onViewChange method, which registers
        // a handler function.
        // Do not override this method
        this.onViewChange('subpart-order', this.subpartOrderChanged);
        this.onViewChange('subpart-new', this.newSubpartView);
    }

    initLayout(){
        // Not all Part/PartView pairs have the layout
        // properties. Ensure they exist first
        let hasLayout = this.model.partProperties.findPropertyNamed('layout');
        let hasBoxResizing = this.model.partProperties.findPropertyNamed('vertical-resizing');
        let hasPinning = this.model.partProperties.findPropertyNamed('pinning');
        if(hasLayout){
            let initialLayout = this.model.partProperties.getPropertyNamed(
                this.model,
                'layout'
            );
            let initialListDirection = this.model.partProperties.getPropertyNamed(
                this.model,
                'list-direction'
            );
            let initialListWrapping = this.model.partProperties.getPropertyNamed(
                this.model,
                'list-wrapping'
            );
            this.layoutChanged(initialLayout);
            this.listDirectionChanged(initialListDirection);
            this.listWrappingChanged(initialListWrapping);
            this.listAlignmentChanged();
            this.listDistributionChanged();
        }

        if(hasBoxResizing){
            let initialVResizing = this.model.partProperties.getPropertyNamed(
                this.model,
                'vertical-resizing'
            );
            let initialHResizing = this.model.partProperties.getPropertyNamed(
                this.model,
                'horizontal-resizing'
            );
            this.vResizingChanged(initialVResizing);
            this.hResizingChanged(initialHResizing);
        }

        if(hasPinning){
            this.pinningTopChanged();
            this.pinningBottomChanged();
            this.pinningLeftChanged();
            this.pinningRightChanged();
        }
    }

    styleCSS(){
        let cssStyle = this.model.partProperties.getPropertyNamed(this, "cssStyle");
        Object.keys(cssStyle).forEach((key) => {
            let value = cssStyle[key];
            this.style[key] = value;
        });
    }

    styleTextCSS(){
        let cssStyle = this.model.partProperties.getPropertyNamed(this, "cssTextStyle");
        Object.keys(cssStyle).forEach((key) => {
            let value = cssStyle[key];
            this.style[key] = value;
        });
    }

    sendMessage(aMessage, target){
        if(!this.isLensed){
            // Lensed views should not send messages
            window.System.sendMessage(aMessage, this, target);
        }
    }

    receiveMessage(aMessage){
        switch(aMessage.type){
        case 'propertyChanged':
            this.primHandlePropChange(
                aMessage.propertyName,
                aMessage.value,
                aMessage.partId
            );
            break;
        case 'viewChanged':
            this.primHandleViewChange(
                aMessage.changeName,
                ...aMessage.args
            );
            break;
        }
    }

    primHandlePropChange(name, value, partId){
        // We notify the model that the property change so that
        // on propertyChanged command handlers could be invoked
        // but we make sure that this stops at the said model and
        // does not go up the delegation chain
        let commandMessage = {
            type: 'command',
            commandName: 'propertyChanged',
            args: [name, value],
            shouldNotDelegate:true, // do not send this up the delegation chain
            shouldIgnore: true
        };
        this.sendMessage(commandMessage, this.model);
        // Find the handler for the given named
        // property. If it does not exist, do nothing
        let handler = this.propChangeHandlers[name];
        if(!handler){
            return null;
        }
        handler = handler.bind(this);
        return handler(value, partId);
    }


    onPropChange(name, func){
        this.propChangeHandlers[name] = func;
    }

    primHandleViewChange(name, ...args){
        // Find the handler for the given named
        // property. If it does not exist, do nothing
        let handler = this.viewChangeHandlers[name];
        if(!handler){
            return null;
        }
        handler = handler.bind(this);
        return handler(...args);
    }

    onViewChange(name, func){
        this.viewChangeHandlers[name] = func;
    }

    scriptChanged(value, partId){
        this.model.sendMessage({
            type: 'compile',
            codeString: value,
            targetId: partId
        }, window.System);
    }

    subpartOrderChanged(id, currentIndex, newIndex){
        // there is no need to do anything for the wrapped views
        // CardRow and StackRow will handle the updates
        if(this.name == "WrappedView"){
            return;
        }
        let subpartNode = this.childNodes[currentIndex];
        if(newIndex == this.childNodes.length - 1){
            this.appendChild(subpartNode);
        } else {
            // we need to account for whether the index of this
            // is before or after the newIndex
            if(currentIndex < newIndex){
                newIndex = newIndex + 1;
            }
            let referenceNode = this.childNodes[newIndex];
            this.insertBefore(subpartNode, referenceNode);
        }
    }

    newSubpartView(newView){
        this.appendChild(newView);
    }

    layoutChanged(value, partId){
        if(value == 'list'){
            this.classList.add('list-layout');
        } else {
            this.classList.remove('list-layout');
        }
    }

    listDirectionChanged(value, partId){
        // Row is the default configuration
        // for a list layout, so only one extra
        // CSS class needs to be toggled
        if(value == 'row'){
            this.classList.remove('list-column');
        } else if(value == 'column'){
            this.classList.add('list-column');
        }
    }

    listWrappingChanged(value, partId){
        if(value == true){
            this.classList.add('wrap-list');
        } else {
            this.classList.remove('wrap-list');
        }
    }

    hResizingChanged(value){
        if(value == 'space-fill'){
            this.classList.add('h-space-fill');
            this.classList.remove(
                'h-rigid',
                'h-shrink-wrap'
            );
        } else if(value == 'shrink-wrap'){
            this.classList.add('h-shrink-wrap');
            this.classList.remove(
                'h-rigid',
                'h-space-fill'
            );
        } else if(value == 'rigid'){
            this.classList.add('h-rigid');
            this.classList.remove(
                'h-space-fill',
                'h-shrink-wrap'
            );
        }
    }

    vResizingChanged(value){
        if(value == 'space-fill'){
            this.classList.add('v-space-fill');
            this.classList.remove(
                'v-rigid',
                'v-shrink-wrap'
            );
        } else if(value == 'shrink-wrap'){
            this.classList.add('v-shrink-wrap');
            this.classList.remove(
                'v-rigid',
                'v-space-fill'
            );
        } else if(value == 'rigid'){
            this.classList.add('v-rigid');
            this.classList.remove(
                'v-space-fill',
                'v-shrink-wrap'
            );
        }
    }

    pinningTopChanged(){
        let top = this.model.partProperties.getPropertyNamed(
            this.model,
            'pinning-top'
        );
        if(top){
            this.classList.add('pin-top');
        } else {
            this.classList.remove('pin-top');
        }
    }

    pinningLeftChanged(){
        let left = this.model.partProperties.getPropertyNamed(
            this.model,
            'pinning-left'
        );
        if(left){
            this.classList.add('pin-left');
        } else {
            this.classList.remove('pin-left');
        }
    }

    pinningRightChanged(){
        let right = this.model.partProperties.getPropertyNamed(
            this.model,
            'pinning-right'
        );
        if(right){
            this.classList.add('pin-right');
        } else {
            this.classList.remove('pin-right');
        }
    }

    pinningBottomChanged(){
        let bottom = this.model.partProperties.getPropertyNamed(
            this.model,
            'pinning-bottom'
        );
        if(bottom){
            this.classList.add('pin-bottom');
        } else {
            this.classList.remove('pin-bottom');
        }
    }

    listAlignmentChanged(){
        let value = this.model.partProperties.getPropertyNamed(
            this.model,
            'list-alignment'
        );
        let valid = [
            'top',
            'bottom',
            'left',
            'right',
            'center'
        ];
        if(valid.includes(value)){
            valid.forEach(side => {
                this.classList.remove(`list-align-${side}`);
            });
            this.classList.add(`list-align-${value}`);
        }
    }

    listDistributionChanged(){
        let value = this.model.partProperties.getPropertyNamed(
            this.model,
            'list-distribution'
        );
        let valid = [
            'start',
            'end',
            'space-between',
            'space-around',
            'center'
        ];
        if(valid.includes(value)){
            valid.forEach(side => {
                this.classList.remove(`list-distribution-${side}`);
            });
            this.classList.add(`list-distribution-${value}`);
        }
    }

    /* Lifecycle Method Defaults */
    afterModelSet(){
        // Does nothing.
        // Should be implemented in subclasses
    }

    afterModelUnset(removedModel){
        // Does nothing.
        // Should be implemented in subclasses
    }

    afterConnected(){
        // Does nothing by default.
        // Should be implemented in subclass
    }

    afterDisconnected(){
        // Does nothing by default.
        // Should be implemented in subclass
    }

    /* Halo Related Methods */

    openHalo(){
        // Check to see if there's a halo in
        // the component's shadow root already
        let foundHalo = this.shadowRoot.querySelector('st-halo');
        if(!foundHalo){
            let newHalo = document.createElement('st-halo');
            this.shadowRoot.appendChild(newHalo);
        }
    }

    closeHalo(){
        let foundHalo = this.shadowRoot.querySelector('st-halo');
        if(foundHalo){
            foundHalo.remove();
        }
    }

    toggleAntsBorder(){
        if(this.classList.contains('marching-ants')){
            this.classList.remove('marching-ants');
        } else {
            this.classList.add('marching-ants');
        }
    }

    onHaloDelete(){
        // What to do when the user clicks the
        // delete button on a halo for this partview.
        // The default implementation is to send a message
        // to the System to delete the corresponding
        // model and *all* views referencing that
        // model.
        this.sendMessage({
            type: 'command',
            commandName: 'deleteModel',
            args: [this.model.id]
        }, window.System);
    }

    onHaloOpenScriptEditor(){
        // Send the message to open a script editor
        // with this view's model as the target
        this.model.sendMessage({
            type: 'command',
            commandName: 'openScriptEditor',
            args: [this.model.id]
        }, this.model);
    }

    onHaloOpenEditor(){
        window.System.editor.render(this.model);
        window.System.editor.open();
    }

    onHaloResize(movementX, movementY){
        // Default implementation on what to do during
        // halo button resize opertations. Subclasses
        // can override for custom behavior.
        // Default is to update the View component's
        // width and height style properties directly.
        // If the part is rotated this will throw off the bounding rectangle
        // browser calcualtion. So the hack here is to rotate the part to 0
        // (if necessary) do the calculations and then rotate it back
        let angle = this.model.partProperties.getPropertyNamed(this.model, "rotate");
        if(angle){
            this.model.partProperties.setPropertyNamed(this.model, "rotate", 0);
        }
        let rect = this.getBoundingClientRect();
        let newWidth, newHeight;
        if(this.preserveAspectOnResize){
            let ratio = rect.width / rect.height;
            let hyp = Math.sqrt((movementX**2) + (movementY**2));
            if(movementX < 0 || movementY < 0){
                hyp = hyp * -1;
            }
            newHeight = rect.height + hyp;
            newWidth = rect.width + hyp;
        } else {
            newWidth = movementX + rect.width;
            newHeight = movementY + rect.height;
        }
        this.model.partProperties.setPropertyNamed(this.model, "width", newWidth);
        this.model.partProperties.setPropertyNamed(this.model, "height", newHeight);
        // reset the rotate angle to the original (if necessary)
        if(angle){
            this.model.partProperties.setPropertyNamed(this.model, "rotate", angle);
        }
    }

    onHaloRotate(movementX, movementY){
        // Default implementation on what to do during
        // halo button rotate opertations. Subclasses
        // can override for custom behavior.
        // Default is to update the View component's
        // rotate style property directly.
        if(movementX || movementY){
            let currentAngle = this.model.partProperties.getPropertyNamed(this.model, "rotate");
            let rect = this.getBoundingClientRect();
            if(!currentAngle){
                currentAngle = 0;
            }
            let theta1 = Math.atan((rect.height/2)/(rect.width/2));
            let theta2 = Math.atan((rect.height/2 + movementY)/(rect.width/2 + movementX));
            let changeAngle = Math.abs((theta2 - theta1)*180/Math.PI);
            let newAngle = (currentAngle + changeAngle) % 360;
            if(newAngle < 0){
                newAngle = 360 + newAngle;
            }
            if(newAngle){
                this.model.partProperties.setPropertyNamed(this.model, "rotate", newAngle);
            }
        }
    }

    onHaloCopy(){
        window.System.clipboard.copyPart(this.model);
    }

    onHaloPaste(){
        window.System.clipboard.pasteContentsInto(this.model);
        this.closeHalo();
    }

    onHaloTarget(event){
        // Add targeting receive listeners to all PartViews
        // on the current card.
        let currentStackView = document.querySelector(`[part-id="${window.System.world.currentStack.id}"]`);
        let currentCardView = document.querySelector(`[part-id="${window.System.world.currentStack.currentCard.id}"]`);
        let targetCardParts = Array.from(currentCardView.querySelectorAll('[part-id]'));
        let targetStackParts = Array.from(currentStackView.querySelectorAll('[part-id]:not(st-card):not(st-stack)'));
        let allTargets = targetCardParts.concat(targetStackParts);
        allTargets.forEach(partView => {
            document.addEventListener('keydown', this.handleTargetKey);
            partView.addEventListener('mouseover', this.handleTargetMouseOver);
            partView.addEventListener('mouseout', this.handleTargetMouseOut);
            partView.addEventListener('click', this.handleTargetMouseClick);
        });
        document.body.classList.add('targeting-mode');
        event.stopPropagation();
    }

    onHaloTargetButtonMouseEnter(){
        // light up the current target
        this.getCurrentTargetViews().forEach((view) => {
            view.highlight("rgb(54, 172, 100)"); //green
        });
    }

    onHaloTargetButtonMouseLeave(){
        // light up the current target
        this.getCurrentTargetViews().forEach((view) => {
            view.unhighlight();
        });
    }

    highlight(color){
        if(this.name != "StackView" && this.name != "WorldView"){
            this._tempBackgroundColor = this.model.partProperties.getPropertyNamed(this.model, "background-color");
            this.model.partProperties.setPropertyNamed(this.model, "background-color", color);
            this._tempBackgroundTransparency = this.model.partProperties.getPropertyNamed(this.model, "background-transparency");
            this.model.partProperties.setPropertyNamed(this.model, "background-transparency", 1);
        }

    }

    unhighlight(){
        if(this.name != "StackView" && this.name != "WorldView"){
            this.model.partProperties.setPropertyNamed(this.model, "background-color", this._tempBackgroundColor);
            this.model.partProperties.setPropertyNamed(this.model, "background-transparency", this._tempBackgroundTransparency);
        }
    }

    endHaloTarget(){
        // Remove all targeting related event listeners
        // that were added during the onHaloTarget
        // handler
        let currentStackView = document.querySelector(`[part-id="${window.System.world.currentStack.id}"]`);
        let currentCardView = document.querySelector(`[part-id="${window.System.world.currentStack.currentCard.id}"]`);
        let targetCardParts = Array.from(currentCardView.querySelectorAll('[part-id]'));
        let targetStackParts = Array.from(currentStackView.querySelectorAll('[part-id]:not(st-card):not(st-stack)'));
        let allTargets = targetCardParts.concat(targetStackParts);
        allTargets.forEach(partView => {
            document.removeEventListener('keydown', this.handleTargetKey);
            partView.removeEventListener('keydown', this.handleTargetKey);
            partView.removeEventListener('mouseover', this.handleTargetMouseOver);
            partView.removeEventListener('mouseout', this.handleTargetMouseOut);
            partView.removeEventListener('click', this.handleTargetMouseClick);
        });
        document.body.classList.remove('targeting-mode');
    }

    handleTargetKey(event){
        if(event.key == 'Escape'){
            this.endHaloTarget();
        }
    }

    handleTargetMouseOver(event){
        if(!event.target.classList.contains('targeting')){
            event.target.classList.add('targeting');
            event.target.highlight("rgb(234, 55, 55)");
            event.target.removeEventListener('click', event.target.onClick);
        }
    }

    handleTargetMouseLeave(event){
        if(event.target.classList.contains('targeting')){
            event.target.classList.remove('targeting');
            event.target.unhighlight();
            event.target.addEventListener('click', event.target.onClick);
        }
    }

    handleTargetMouseClick(event){
        event.preventDefault();
        if(event.button == 0 && event.shiftKey){
            this.onHaloActivationClick(event);
            return;
        }
        event.target.classList.remove('targeting');
        this.model.partProperties.setPropertyNamed(
            this.model,
            'target',
            event.target.model.id
        );
        this.endHaloTarget();
        event.stopImmediatePropagation();
        event.target.unhighlight();
        event.target.addEventListener('click', event.target.onClick);
    }

    getCurrentTargetViews(){
        // clean up the current target
        let currentTarget = this.model.partProperties.getPropertyNamed(this.model, "target");
        if(currentTarget){
            let semantics = window.System.grammar.createSemantics();
            semantics.addOperation(
                'interpret',
                Object(_ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.model, window.System)
            );
            let m = window.System.grammar.match(currentTarget, "ObjectSpecifier");
            let targetId = semantics(m).interpret();
            return window.System.findViewsById(targetId);
        }
        return [];
    }

    onContextMenuClick(event){
        if(this.wantsContextMenu){
            event.preventDefault();
            event.stopPropagation();
            if(this.contextMenuIsOpen){
                this.closeContextMenu();
            } else {
                this.openContextMenuAt(
                    event.clientX,
                    event.clientY
                );
            }
        } else {
            event.stopPropagation();
        }
    }

    onAuxClick(event){
        // Should only open halo when middle
        // mouse button is clicked
        if(event.button == 1){
            event.preventDefault();
            this.onHaloActivationClick(event);
        }
    }

    onClick(event){
        if(this.contextMenuIsOpen){
            this.closeContextMenu();
        }
        if(event.button == 0 && event.shiftKey){
            event.preventDefault();
            this.onHaloActivationClick(event);
        }
    }

    onHaloActivationClick(event){
        if(this.wantsHalo){
            if(this.hasOpenHalo){
                this.closeHalo();
            } else {
                event.stopPropagation();
                // Find any other open Halos
                // and automatically close them
                let exSelector = `.editing:not([part-id="${this.model.id}"])`;
                Array.from(document.querySelectorAll(exSelector)).forEach(openHaloEl => {
                    openHaloEl.closeHalo();
                });

                // Finally, open on this view
                this.openHalo();
            }
        }
    }

    onMouseDown(event){
        if(event.button == 0 && !event.shiftKey){
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        }
    }

    onMouseMove(event){
        this.sendMessage({
            type: 'command',
            commandName: 'move',
            args: [event.movementX, event.movementY]
        }, this.model);
    }

    onMouseUp(event){
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    openContextMenuAt(x, y){
        let menuEl = document.createElement('st-context-menu');
        let worldView = document.querySelector('[part-id="world"]');
        menuEl.render(this.model);
        menuEl.style.left = `${x}px`;
        menuEl.style.top = `${y}px`;
        worldView.append(menuEl);
    }

    closeContextMenu(){
        let found = document.querySelector('st-context-menu');
        if(found){
            found.remove();
        }
    }

    addContextMenuItems(contextMenu){
        // The default implementation is to
        // do nothins.
        // Subclasses should override and use the
        // passed-in contextMenu object to construct
        // list items that are specific to their needs
        return;
    }

    get wantsHaloMove(){
        if(!this.parentElement || !this.isConnected){
            return false;
        }
        let parentModel = this.parentElement.model;
        if(!parentModel){
            return true;
        }

        let hasLayout = parentModel.partProperties.findPropertyNamed(
            parentModel,
            'layout'
        );

        if(!hasLayout){
            return true;
        }

        let parentLayout = parentModel.partProperties.getPropertyNamed(
            parentModel,
            'layout'
        );
        if(parentLayout === 'strict' | !parentLayout || parentLayout == ""){
            return true;
        }

        return false;
    }

    get contextMenuIsOpen(){
        let found = document.querySelector('st-context-menu');
        if(found){
            return true;
        }
        return false;
    }

    /* Editor related methods */
    openEditor(){
        // Does nothing by default.
        // Should be implemented in subclass
    }

    closeEditor(){
        // Does nothing by default.
        // Should be implemented in subclass
    }
};




/***/ }),

/***/ "./js/objects/views/ResourceView.js":
/*!******************************************!*\
  !*** ./js/objects/views/ResourceView.js ***!
  \******************************************/
/*! exports provided: ResourceView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceView", function() { return ResourceView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResourceView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");


const linkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
  <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
</svg>
`;

const templateString = `
<style>
:host {
    box-sizing: border-box;
    display: block;
    position: absolute;
    padding: 1px;
    user-select: none;
}

.wrapper{
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
}
</style>
<div class="wrapper">
    <span class="name"></span>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-building-bridge-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M6 7h12a2 2 0 0 1 2 2v9a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a4 4 0 0 0 -8 0v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-9a2 2 0 0 1 2 -2"></path>
    </svg>
</div>
`;

class ResourceView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // Setup template and shadow dom
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(this.template.content.cloneNode(true));

        // Bind component methods
        this.onClick = this.onClick.bind(this);
        this.initCustomHaloButton = this.initCustomHaloButton.bind(this);
        this.updateResourceLink = this.updateResourceLink.bind(this);
        this.indicateReadyState = this.indicateReadyState.bind(this);
    }

    afterConnected(){
        if(!this.haloButton){
            this.initCustomHaloButton();
        }
    }

    afterDisconnected(){
    }

    afterModelSet(){
        // if the resourceName property is set then make sure it is loaded
        // TODO: i don't like this view asking the model to load!
        let resourceName = this.model.partProperties.getPropertyNamed(this.model, "resourceName");
        if(resourceName){
            this.model.loadResource([this], resourceName);
        }
        let src = this.model.partProperties.getPropertyNamed(this.model, "src");
        if(src){
            this.model.setSourceTo([this], src);
        }
        let nameSpan = this._shadowRoot.querySelector(".name");
        nameSpan.innerText = this.model.partProperties.getPropertyNamed(this.model, "name");
        let state = this.model.partProperties.getPropertyNamed(
            this.model,
            "readyState",
        );
        this.indicateReadyState(state);
        // prop changes
        this.onPropChange("name", (value) => {
            nameSpan.innerText = value;
        });
        this.onPropChange("readyState", this.indicateReadyState);
        this.onPropChange("src", (url) => {
        });
    }

    onClick(event){
        if(event.button == 0){
            if(event.shiftKey){
                // prevent triggering the on click message
                event.preventDefault();
                if(this.hasOpenHalo){
                    this.closeHalo();
                } else {
                    this.openHalo();
                }
            } else if(!this.hasOpenHalo){
                // Send the click command message to self
                this.model.sendMessage({
                    type: 'command',
                    commandName: 'click',
                    args: [],
                    shouldIgnore: true // Should ignore if System DNU
                }, this.model);
            }
        }
    }

    indicateReadyState(value){
        let borderColor = "red";
        if(value == "fetching"){
            borderColor = "yellow";
        } else if(value == "ready"){
            borderColor = "green";
        };
        ["right", "left", "top", "bottom"].forEach((side) => {
            this.model.partProperties.setPropertyNamed(this.model, `border-${side}-color`, borderColor);
        });
    }

    openHalo(){
        // Override default. Here we add a custom button
        // when showing.
        let foundHalo = this.shadowRoot.querySelector('st-halo');
        if(!foundHalo){
            foundHalo = document.createElement('st-halo');
            this.shadowRoot.appendChild(foundHalo);
        }
        foundHalo.append(this.haloButton);
    }

    initCustomHaloButton(){
        this.haloButton = document.createElement('div');
        this.haloButton.id = 'halo-resource-link';
        this.haloButton.classList.add('halo-button');
        this.haloButton.innerHTML = linkIcon;
        this.haloButton.style.marginTop = "6px";
        this.haloButton.setAttribute('slot', 'right-column');
        this.haloButton.setAttribute('title', 'Edit link for resource');
        this.haloButton.addEventListener('click', this.updateResourceLink);
    }

    updateResourceLink(event){
        // Tells the model to update its
        // src link for the resource
        let currentSrc = this.model.partProperties.getPropertyNamed(
            this.model,
            'src'
        );
        let result = window.prompt("Edit URL for resource:", currentSrc);
        if(result && result !== '' && result !== currentSrc){
            this.sendMessage(
                {
                    type: 'command',
                    commandName: 'loadResource',
                    args: [ result ]
                },
                this.model
            );
        }
    }


};




/***/ }),

/***/ "./js/objects/views/StackView.js":
/*!***************************************!*\
  !*** ./js/objects/views/StackView.js ***!
  \***************************************/
/*! exports provided: StackView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackView", function() { return StackView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StackView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");
/* harmony import */ var _parts_Stack_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parts/Stack.js */ "./js/objects/parts/Stack.js");
/**
 * StackView
 * ----------------------------------------------
 * I am a Webcomponent (custom element) representing
 * the view of a Stack.
 * I take up the full width of the current viewport
 * when I am being displayed.
 * My child elements are BackgroundView and CardView
 */




// by default, stacks are hidden unless they're
// the current stack, or else they have the class
// window-stack (suggesting there's window part
// who wishes to display it)
const templateString = `<slot></slot>`;

class StackView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // Setup templating and shadow dom
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Halo settings. Cards don't want
        //a halo to open
        this.wantsHalo = false;

        // Handle current-ness prop change
        this.onPropChange('current', this.handleCurrentChange);

        // Bind methods
        this.handleCurrentChange = this.handleCurrentChange.bind(this);
    }

    afterModelSet(){
        // Do an initial setting of the
        // current card
        this.handleCurrentChange();
    }

    handleCurrentChange(){
        // The value of the current prop is the card ID
        // of the child Card that should be the
        // current one. We remove the current-card class from
        // the previous current card and add it to the new one.
        let currentCard = this.querySelector('.current-card');
        let nextCurrentId = this.model.partProperties.getPropertyNamed(
            this.model,
            'current'
        );
        let shouldNotify = false;
        let selector = `:scope > st-card[part-id="${nextCurrentId}"]`;
        if(this.isLensed){
            selector = `:scope > st-card[lens-part-id="${nextCurrentId}"]`;
            shouldNotify = true;
        }
        let nextCurrentCard = this.querySelector(selector);
        // if there is no currentCard and no next currentCard we set it to be the first
        // card child (this can happen when new ids are created on deserialization and so
        // the current property stored id is no longer relevant)
        if(!nextCurrentCard && !currentCard){
            nextCurrentCard = this.querySelector(`:scope > st-card`);
            // if there are no cards at all, this must be a brand new stack
            if(!nextCurrentCard){
                return;
            }
            this.model.partProperties.setPropertyNamed(
                this.model,
                "current",
                nextCurrentCard.id,
                shouldNotify
            );
        }
        if(nextCurrentCard){
            nextCurrentCard.classList.add('current-card');
        } else {
            return;
        }
        if(currentCard && currentCard != nextCurrentCard){
            currentCard.classList.remove('current-card');
        }
    }

    // override subclass methods
    newSubpartView(newView){
        if(this.childNodes.length && newView.name == "CardView"){
            let lastCardNode;
            this.childNodes.forEach((child) => {
                if(child.name == "CardView"){
                    lastCardNode = child;
                }
            });
            if(lastCardNode){
                // insert after the last card
                lastCardNode.after(newView);
            } else {
                // since there are no cards
                // insert before all children
                this.childNodes[0].insertBefore(newView);
            }
        } else {
            this.appendChild(newView);
        }
    }

};




/***/ }),

/***/ "./js/objects/views/WindowView.js":
/*!****************************************!*\
  !*** ./js/objects/views/WindowView.js ***!
  \****************************************/
/*! exports provided: WindowView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowView", function() { return WindowView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WindowView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");
/**
 * WindowView
 * -------------------------------
 * I am the view of a Window Part.
 * Windows are wrappers for Stacks/StackViews that
 * appear as the subparts of other Stacks or Cards.
 * They are examples of how we can use stack and card
 * composition to create more complex UIs.
 */


const template = document.createElement('template');
template.innerHTML = `
<style>
 * {
     box-sizing: border-box;
 }

 .st-window-bar {
     display: flex;
     flex-direction: row;
     width: 100%;
     min-height: 25px;
     background-color: rgb(218, 218, 218);
     padding-left: 8px;
     padding-right: 8px;
     align-items: center;
 }
 .st-window-button {
     display: block;
     width: 12px;
     height: 12px;
     border-radius: 100%;
     background-color: rgba(255, 150, 150);
     margin-right: 4px;
 }
 .close-button {
     background-color: rgba(255, 50, 50, 0.4);
 }
 .shade-button {
     background-color: rgba(255, 255, 0. 0.4);
 }
 .expand-button {
     background-color: rgba(150, 255, 0, 0.8);
 }
 .st-window-pane {
     display: block;
     position: relative;
     min-height: 50px;
     flex: 1;
 }
 .st-window-pane.shaded {
     display: none;
 }
 .st-window-gripper {
     display: block;
     position: absolute;
     top: calc(100% - 15px);
     width: 30px;
     height: 30px;
 }
 .st-window-title {
     user-select: none;
     text-overflow: ellipsis;
     overflow: hidden;
     white-space: nowrap;
     max-width: 70%;
 }
 .right-gripper {
     left: calc(100% - 15px);
 }
 .right-gripper:hover {
     cursor: nwse-resize;
 }
 .left-gripper {
     right: calc(100% - 15px);
 }
 .left-gripper:hover {
     cursor: nesw-resize;
 }
</style>
<div class="st-window-bar">
    <div class="st-window-button close-button"></div>
    <div class="st-window-button shade-button"></div>
    <div class="st-window-button expand-button"></div>
    <div class="st-window-title">
        <span></span>
    </div>
</div>
<div class="st-window-pane">
    <slot></slot>
</div>
<div class="st-window-gripper right-gripper" data-grip-end="right"></div>
`;

class WindowView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        var templateContent = template.content.cloneNode(true);
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(templateContent);

        this.mouseDownInBar = false;
        this.isShaded = false;
        this.isExpanded = false;
        this.expandCache = {};

        // Whether or not we are gripping the
        // bottom right corner for a resize
        this.isGripping = false;

        // Bound methods
        this.setupClickAndDrag = this.setupClickAndDrag.bind(this);
        this.setupBarButtons = this.setupBarButtons.bind(this);
        this.setupExpanderAreas = this.setupExpanderAreas.bind(this);
        this.setupPropHandlers = this.setupPropHandlers.bind(this);
        this.onMouseMoveInBar = this.onMouseMoveInBar.bind(this);
        this.onMouseDownInBar = this.onMouseDownInBar.bind(this);
        this.onMouseUpAfterDrag = this.onMouseUpAfterDrag.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onShade = this.onShade.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onGripDown = this.onGripDown.bind(this);
        this.onGripUp = this.onGripUp.bind(this);
        this.onGripMove = this.onGripMove.bind(this);

        // Setup prop handlers
        this.setupPropHandlers();
    }

    setupPropHandlers(){
        this.onPropChange('title', this.setTitle);
    }

    afterConnected(){
        this.setupClickAndDrag();
        this.setupBarButtons();
        this.setupExpanderAreas();
    }

    afterModelSet(){
        this.setTitle(
            this.model.partProperties.getPropertyNamed(
                this.model,
                'title'
            )
        );
    }

    setupClickAndDrag(){
        let bar = this._shadowRoot.querySelector('.st-window-bar');
        bar.addEventListener('mousedown', this.onMouseDownInBar);
    }

    setupBarButtons(){
        let closeButton = this._shadowRoot.querySelector('.close-button');
        let shadeButton = this._shadowRoot.querySelector('.shade-button');
        let expandButton = this._shadowRoot.querySelector('.expand-button');

        closeButton.addEventListener('click', this.onClose);
        shadeButton.addEventListener('click', this.onShade);
        expandButton.addEventListener('click', this.onExpand);
    }

    setupExpanderAreas(){
        let lowerRight = this._shadowRoot.querySelector('.right-gripper');
        lowerRight.addEventListener('mousedown', this.onGripDown);
    }

    onExpand(event){
        if(this.isExpanded){
            this.style.width = this.expandCache.width;
            this.style.height = this.expandCache.height;
            this.style.top = this.expandCache.top;
            this.style.left = this.expandCache.left;
            this.isExpanded = false;
        } else {
            this.expandCache = {
                width: this.style.width,
                height: this.style.height,
                top: this.style.top,
                left: this.style.left
            };
            // Set new values based on window size
            this.style.top = "0px";
            this.style.left = "0px";
            this.style.width = "100vw";
            this.style.height = "100vh";
            this.isExpanded = true;
        }
    }

    onShade(event){
        let pane = this._shadowRoot.querySelector('.st-window-pane');
        if(this.isShaded){
            pane.classList.remove('shaded');
            this.isShaded = false;
        } else {
            pane.classList.add('shaded');
            this.isShaded = true;
        }
    }

    onClose(event){
        let msg = {
            type: 'command',
            commandName: 'windowClose',
            args: []
        };
        this.model.sendMessage(msg, this.model);
    }

    onMouseDownInBar(event){
        this.mouseDownInBar = true;
        let bar = event.target;
        document.addEventListener('mousemove', this.onMouseMoveInBar);
        document.addEventListener('mouseup', this.onMouseUpAfterDrag);
    }

    onMouseUpAfterDrag(event){
        this.mouseDownInBar = false;
        let bar = event.target;
        document.removeEventListener('mouseup', this.onMouseUpAfterDrag);
        document.removeEventListener('mousemove', this.onMouseMoveInBar);
    }

    onMouseMoveInBar(event){
        let currentTop = parseInt(this.style.top);
        let currentLeft = parseInt(this.style.left);
        // let newTop = `${currentTop + event.movementY}px`;
        // let newLeft = `${currentLeft + event.movementX}px`;
        let newTop = currentTop + event.movementY;
        let newLeft = currentLeft + event.movementX;
        this.model.partProperties.setPropertyNamed(this.model, "top", newTop);
        this.model.partProperties.setPropertyNamed(this.model, "left", newLeft);
    }

    onGripUp(event){
        this.isGripping = false;
        document.removeEventListener('mousemove', this.onGripMove);
        document.removeEventListener('mouseup', this.onGripUp);
    }

    onGripDown(event){
        this.isGripping = true;
        document.addEventListener('mousemove', this.onGripMove);
        document.addEventListener('mouseup', this.onGripUp);
    }

    onGripMove(event){
        if(this.isGripping){
            // Figure out the current width and height.
            // and set the property to the new one
            let box = this.getBoundingClientRect();
            let newWidth = Math.floor(box.width) + event.movementX;
            if(newWidth){
                this.model.partProperties.setPropertyNamed(this.model, "width", newWidth);
            }
            let newHeight = Math.floor(box.height) + event.movementY;
            if(newHeight){
                this.model.partProperties.setPropertyNamed(this.model, "height", newHeight);
            }
        }
    }

    setTitle(aString){
        let titleArea = this._shadowRoot.querySelector(
            '.st-window-title > span'
        );
        titleArea.innerText = aString;
    }

    // override subclass methods
    newSubpartView(newView){
        // slot the new view into the window pane
        let pane = this._shadowRoot.querySelector('.st-window-pane');
        pane.append(newView);
        this.appendChild(newView);
    }


};




/***/ }),

/***/ "./js/objects/views/WorldView.js":
/*!***************************************!*\
  !*** ./js/objects/views/WorldView.js ***!
  \***************************************/
/*! exports provided: WorldView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldView", function() { return WorldView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WorldView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartView.js */ "./js/objects/views/PartView.js");
/**
 * WorldView
 * ---------------------------------------------
 * I am a Webcomponent (custom element) that represents
 * a view of a WorldStack model.
 * My element children should contain a single StackView representing
 * the current displayed stack (this comes from the model).
 * I am the root-level element for the SimpleTalk system in a web
 * page. There should only be one of me on any given HTML page.
 */


const templateString = `<slot></slot>`;

class WorldView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        // Set up templating and shadow dom
        // TODO: Put the template definition in this
        // module as formatted text
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // The world never wants a halo
        this.wantsHalo = false;

        // Bound methods
        this.updateCurrentStack = this.updateCurrentStack.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.setupPropHandlers = this.setupPropHandlers.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        // Setup prop handlers
        this.setupPropHandlers();
    }

    setupPropHandlers(){
        this.onPropChange('current', this.updateCurrentStack);
    }

    afterConnected(){
        document.addEventListener('keydown', this.handleKeyDown);
    }

    afterDisconnected(){
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    afterModelSet(){
        // Do an initial update to display
        // the model's current stack
        this.updateCurrentStack();
    }

    updateCurrentStack(){
        // The value of the current prop is the stack ID
        // of the child Stack that should be the
        // current one. We remove the current-stack class from
        // the previous current stack and add it to the new one.
        let currentStack = this.querySelector('.current-stack');
        let nextCurrentId = this.model.partProperties.getPropertyNamed(
            this.model,
            'current'
        );
        let nextCurrentStack = this.querySelector(`:scope > st-stack[part-id="${nextCurrentId}"]`);
        if(nextCurrentStack){
            nextCurrentStack.classList.add('current-stack');
        } else {
            return;
        }
        // To prevent the setting of the same id as the current stack make sure
        // next and current are not the same
        if(currentStack && currentStack != nextCurrentStack){
            currentStack.classList.remove('current-stack');
        }
    }

    handleKeyDown(event){
        if(event.altKey && event.ctrlKey && event.code == "Space"){
            let navigator = document.querySelector('st-navigator');
            navigator.toggle();
        }
    }

    // override subclass methods
    newSubpartView(newView){
        if(this.childNodes.length && newView.name == "StackView"){
            let lastStackNode;
            this.childNodes.forEach((child) => {
                if(child.name == "StackView"){
                    lastStackNode = child;
                }
            });
            if(lastStackNode){
                // insert after the last stack
                lastStackNode.after(newView);
            } else {
                // since there are no stacks
                // insert before all children
                this.childNodes[0].insertBefore(newView);
            }
        } else {
            this.appendChild(newView);
        }
    }

};




/***/ }),

/***/ "./js/objects/views/contextmenu/ContextMenu.js":
/*!*****************************************************!*\
  !*** ./js/objects/views/contextmenu/ContextMenu.js ***!
  \*****************************************************/
/*! exports provided: ContextMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return ContextMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContextMenu; });
/* harmony import */ var _ContextMenuItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenuItem.js */ "./js/objects/views/contextmenu/ContextMenuItem.js");
// PREAMBLE


window.customElements.define('st-context-menu-item', _ContextMenuItem_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

const templateString = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        position: absolute;
        border: 1px solid black;
        background-color: white;
        box-shadow: 1px 2px 10px rgba(50, 50, 50, 0.7);
        z-index: 10000;
        padding-bottom: 8px;
        min-width: 200px;
        font-family: 'Helvetica', sans-serif;
    }

    :host-context(li) {
        display: none;
        position: absolute;
        left: 100%;
        top: 0px;
    }

    :host-context(li):hover {
        display: flex;
    }

    header {
        position: relative;
        display: flex;
        border-bottom: 1px solid rgba(150, 150, 150, 0.5);
        padding-right: 16px;
        padding-left: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    header > h4 {
        padding: 0;
        margin:0;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
    }

</style>
<header>
    <h4></h4>
</header>
<ul id="list-items">
    <slot></slot>
</ul>
`;

class ContextMenu extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Bound methods
        this.addHaloToggleItem = this.addHaloToggleItem.bind(this);
        this.addCopyAndPasteItems = this.addCopyAndPasteItems.bind(this);
        this.addOpenEditorItem = this.addOpenEditorItem.bind(this);
        this.addScriptEditItem = this.addScriptEditItem.bind(this);
        this.addMovementItems = this.addMovementItems.bind(this);
        this.addPartSubmenu = this.addPartSubmenu.bind(this);
        this.addListItem = this.addListItem.bind(this);
        this.addSpacer = this.addSpacer.bind(this);
        this.hideHeader = this.hideHeader.bind(this);
    }

    render(aModel){
        this.innerHTML = "";
        this.model = aModel;
        let headerEl = this._shadowRoot.querySelector('header > h4');
        let headerText = `${this.model.type[0].toUpperCase()}${this.model.type.slice(1)}`;
        headerText = `a ${headerText}`;
        headerEl.textContent = headerText;

        // Render the default menu items
        this.addHaloToggleItem();
        this.addCopyAndPasteItems();
        this.addOpenEditorItem();
        this.addPartSubmenu();
        this.addScriptEditItem();
        this.addMovementItems();

        // Add View-specific items
        let view = document.querySelector(`[part-id="${this.model.id}"]`);
        view.addContextMenuItems(this);
    }

    addListItem(label, callback, submenu=null){
        let itemEl = document.createElement('st-context-menu-item');
        itemEl.textContent = label;
        itemEl.classList.add('context-menu-item');
        itemEl.addEventListener('click', callback);
        if(submenu){             
            submenu.classList.add('context-submenu', 'submenu-hidden');
            submenu.setAttribute('slot', 'submenu');
            itemEl.append(submenu);
            itemEl.showCaret();
        }
        this.append(itemEl);
    }

    addHaloToggleItem(){
        let target = window.System.findViewById(this.model.id);
        // don't add halo option to cards, since you can't see those
        if(target.name != "CardView"){
            if(target.classList.contains('editing')){
                this.addListItem(
                    'Close Halo',
                    (event) => {
                        target.closeHalo();
                    }
                );
            } else {
                this.addListItem(
                    'Open Halo',
                    (event) => {
                        target.openHalo();
                    }
                );
            }
        }
    }

    addCopyAndPasteItems(){
        // Add copy item
        this.addListItem(
            'Copy',
            (event) => {
                window.System.clipboard.copyPart(this.model);
            }
        );

        // Add paste but only if:
        // 1. There is clipboard contents;
        // 2. The part type in the clipboard is
        //    one that is accepted by this model's part
        if(window.System.clipboard.contents.length){
            let partType = window.System.clipboard.contents[0].partType;
            if(this.model.acceptsSubpart(partType)){
                let label = `Paste (a ${partType[0].toUpperCase()}${partType.slice(1)})`;
                this.addListItem(label, (event) => {
                    window.System.clipboard.pasteContentsInto(this.model);
                });
            }
        }
    }

    addOpenEditorItem(){
        this.addListItem(
            'Open Editor',
            (event) => {
                window.System.openEditorForPart(this.model.id);
            }
        );
    }

    addScriptEditItem(){
        this.addListItem(
            'Edit Script',
            (event) => {
                this.model.sendMessage({
                    type: 'command',
                    commandName: 'openScriptEditor',
                    args: [this.model.id]
                }, this.model);
            }
        );

        this.addListItem(
            'Edit World Script',
            (event) => {
                this.model.sendMessage({
                    type: 'command',
                    commandName: 'openScriptEditor',
                    args: ['world']
                }, this.model);
            }
        );

        let windowAncestor = this.model.findAncestorOfType('window');
        if(this.model.type != 'window' && windowAncestor !== null){
            this.addListItem(
                'Edit Owning Window Script',
                (event) => {
                    this.model.sendMessage({
                        type: 'command',
                        commandName: 'openScriptEditor',
                        args: [windowAncestor.id]
                    }, this.model);
                }
            );
        }
        
        let cardAncestor = this.model.findAncestorOfType('card');
        if(this.model.type != 'card' && cardAncestor){
            this.addListItem(
                'Edit Owning Card Script',
                (event) => {
                    this.model.sendMessage({
                        type: 'command',
                        commandName: 'openScriptEditor',
                        args: [cardAncestor.id]
                    }, this.model);
                }
            );
        }

        let stackAncestor = this.model.findAncestorOfType('stack');
        if(this.model.type != 'stack' && stackAncestor){
            this.addListItem(
                'Edit Owning Stack Script',
                (event) => {
                    this.model.sendMessage({
                        type: 'command',
                        commandName: 'openScriptEditor',
                        args: [stackAncestor.id]
                    }, this.model);
                }
            );
        }
    }

    addPartSubmenu(){
        // First, we need to get a list of names
        // of subparts that this model accepts
        let subpartNames;
        if(this.model.acceptedSubpartTypes[0] == "*"){
            // This model accepts all subpart types.
            // We need to get the names for these subparts,
            // which are registered at the System level.
            subpartNames = Object.keys(window.System.availableViews);
        } else {
            subpartNames = this.model.acceptedSubpartTypes;
        }

        // If there are no subpart names (meaning
        // the given part, like a button, doesn't
        // accept any subparts), then we do nothing.
        if(subpartNames.length == 0){
            return;
        }

        // Now we construct the submenu for adding parts
        // of the given type
        let submenu = document.createElement('st-context-menu');
        submenu.hideHeader();
        subpartNames.forEach(subpartName => {
            submenu.addListItem(
                subpartName[0].toUpperCase() + subpartName.slice(1),
                () => {
                    this.model.sendMessage({
                        type: 'command',
                        commandName: 'newModel',
                        args: [
                            subpartName,
                            this.model.id
                        ]
                    }, this.model);
                }
            );
        });

        // Now add the list item that will "reveal"
        // the submenu
        this.addListItem(
            'Add a new part',
            null,
            submenu
        );
        
    }

    addMovementItems(){
        let index = this.model._owner.subparts.indexOf(this.model);
        let ownerLength = this.model._owner.subparts.length;
        if(ownerLength && index < ownerLength - 1){
            // Create the moveDown option
            this.addListItem(
                'Move Down',
                (event) => {
                    this.model.sendMessage({
                        type: 'command',
                        commandName: 'moveDown',
                        args: []
                    }, this.model);
                }
            );
            this.addListItem(
                'Move to Last',
                (event) => {
                    this.model.sendMessage({
                        type: 'command',
                        commandName: 'moveToLast',
                        args: []
                    }, this.model);
                }
            );
        }
        if(index > 0){
            // Create the moveUp option
            this.addListItem(
                'Move Up',
                (event) => {
                    this.model.sendMessage({
                        type: 'command',
                        commandName: 'moveUp',
                        args: []
                    }, this.model);
                }
            );
            this.addListItem(
                'Move to First',
                (event) => {
                    this.model.sendMessage({
                        type: 'command',
                        commandName: 'moveToFirst',
                        args: []
                    }, this.model);
                }
            );
        }
    }

    addSpacer(){
        let item = document.createElement('li');
        item.classList.add('context-menu-spacer');
        this.append(item);
    }

    hideHeader(){
        let headerEl = this._shadowRoot.querySelector('header');
        headerEl.style.display = "none";
    }
};




/***/ }),

/***/ "./js/objects/views/contextmenu/ContextMenuItem.js":
/*!*********************************************************!*\
  !*** ./js/objects/views/contextmenu/ContextMenuItem.js ***!
  \*********************************************************/
/*! exports provided: ContextMenuItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextMenuItem", function() { return ContextMenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContextMenuItem; });
const templateString = `
<style>
    :host {
        display: flex;
        position: relative;
    }
    .submenu-area {
        display: none;
        position: absolute;
        left: 100%;
        top: 0px;
    }

    :host(:hover) .submenu-area {
        display: flex;
    }

    .label-area {
        display: flex;
        align-items: center;
    }

    .caret.hidden {
        display: none;
    }
    .caret {
        display: block;
        margin-left: auto;
        font-size: 1.1em;
    }
</style>
<div class="label-area">
    <span class="label"><slot></slot></span>
    <div class="caret hidden">→</div>
</div>
<div class="submenu-area">
    <slot name="submenu"></slot>
</div>
`;

class ContextMenuItem extends HTMLElement {
    constructor(){
        super();

        // Setup shadow dom and template
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.append(
            this.template.content.cloneNode(true)
        );

        // Bound methods
        this.showCaret = this.showCaret.bind(this);
    }

    showCaret(){
        let caretEl = this._shadowRoot.querySelector('.caret');
        caretEl.classList.remove('hidden');
        
    }
};




/***/ }),

/***/ "./js/objects/views/drawing/ColorPickerTool.js":
/*!*****************************************************!*\
  !*** ./js/objects/views/drawing/ColorPickerTool.js ***!
  \*****************************************************/
/*! exports provided: ColorPickerTool, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerTool", function() { return ColorPickerTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColorPickerTool; });
/* harmony import */ var _ColorWheelWidget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorWheelWidget.js */ "./js/objects/views/drawing/ColorWheelWidget.js");
/**
 * ColorPickerTool
 * I provide a color choorser capability
 * for the shadow canvas of my parent element.
 * Brushes on my parent Drawing canvas will use
 * whatever color I have currently selected.
 * I am explicitly designed for use with
 * DrawingView*/

const colorPickerSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-color-swatch" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2" />
  <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9" />
  <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12" />
  <line x1="17" y1="17" x2="17" y2="17.01" />
</svg>
`;

const colorPickerTemplateString = `
<style>
    :host {
        display: block;
        position: relative;
        margin-bottom: 6px;
    }

    #tool-button {
        --active-color: black;
        --inactive-color: rgb(170, 170, 170);
        --hover-color: rgb(140, 140, 140);
        display: block;
        position: relative;
        border-width: 1px;
        border-style: solid;
        border-color: var(--inactive-color);
        color: var(--inactive-color);
        width: 24px;
        height: 24px;
    }

    :host([active="true"]) > #tool-button {
        border-color: var(--active-color);
        color: var(--active-color);
    }
    color-wheel {
        display: none;
        position: absolute;
    }

    :host([active="true"]) > color-wheel {
        display: flex;
    }
</style>
<div id="tool-button">
${colorPickerSVG}
</div>
<color-wheel></color-wheel>
`;


class ColorPickerTool extends HTMLElement {
    constructor(){
        super();

        // Set up shadow dom. This tool will
        // display itself as a button that can be
        // toggled within its parent DrawingView.
        this.template = document.createElement('template');
        this.template.innerHTML = colorPickerTemplateString;
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(
            this.template.content.cloneNode(true)
        );

        // Default drawing context is null.
        // This will be set if and when this tool
        // is connected to a parent element
        // that has a context
        this.ctx = null;

        // Bind component methods
        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.onMove = this.onMove.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.onColorSelected = this.onColorSelected.bind(this);
        this.onTransparencyChanged = this.onTransparencyChanged.bind(this);
        this.setContextFromAttributes = this.setContextFromAttributes.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.setAttribute('role', 'tool');
            this.setAttribute('active', false);
            if(!this.hasAttribute('current-color')){
                this.setAttribute('current-color', 'rgba(0, 0, 0, 0)');
            }
            if(this.parentElement.drawingContext){
                this.ctx = this.parentElement.drawingContext;

                // If I am the only tool in my parent,
                // set myself to active
                let siblingTools = this.parentElement.querySelectorAll('[role="tool"]');
                if(siblingTools.length == 1){
                    this.setAttribute('active', true);
                }
            }

            // Attach event listeners
            this.button = this.shadowRoot.getElementById('tool-button');
            this.button.addEventListener('click', this.toggleActive);
            this.colorWheel = this.shadowRoot.querySelector('color-wheel');
            this.colorWheel.addEventListener('color-selected', this.onColorSelected);
            this.colorWheel.addEventListener('transparency-changed', this.onTransparencyChanged);
        }
    }

    disconnectedCallback(){
        this.ctx = null;
        this.button.removeEventListener('click', this.toggleActive);
        this.colorWheel.removeEventListener('color-selected', this.onColorSelected);
        this.colorWheel.removeEventListener('transparency-changed', this.onTransparencyChanged);
    }

    start(x, y){
        // Does nothing in this tool
    }

    end(x, y){
        // Does nothing in this tool
    }

    onMove(x, y){
        // Does nothing in this tool
    }

    setContextFromAttributes(){
        // Does nothing in this tool
    }

    onColorSelected(event){
        let colorInfo = event.detail;
        let colorStr = `rgba(${colorInfo.r}, ${colorInfo.g}, ${colorInfo.b}, ${colorInfo.alpha})`;
        this.ctx.strokeStyle = colorStr;
        this.ctx.fillStyle = colorStr;
    }

    onTransparencyChanged(event){
        this.parentElement.model.sendMessage({
            type: "command",
            commandName: "setProperty",
            args: ["transparency", event.detail]
        }, this.parentElement.model);
    }

    toggleActive(event){
        let isActive = this.getAttribute('active');
        if(isActive == "true"){
            this.setAttribute('active', 'false');
        } else {
            // First, find any other tools in my parent
            // element and deactivate them.
            Array.from(this.parentElement.querySelectorAll('[role="tool"]'))
                .filter(el => {
                    return el.getAttribute('active') == 'true';
                })
                .forEach(el => {
                    el.setAttribute('active', 'false');
                });

            // Set this tool to be active
            this.setAttribute('active', 'true');
        }
    }
};



window.customElements.define('color-picker-tool', ColorPickerTool);




/***/ }),

/***/ "./js/objects/views/drawing/ColorWheelWidget.js":
/*!******************************************************!*\
  !*** ./js/objects/views/drawing/ColorWheelWidget.js ***!
  \******************************************************/
/*! exports provided: ColorWheelWidget, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorWheelWidget", function() { return ColorWheelWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColorWheelWidget; });
/**
 * ColorWheelWidget
 * I am a *generic use* webcomponent representing
 * a ColorWheel selection widget.
 * I operate as a floating modal window with a
 * circular color wheel as well as a list of
 * recently selected colors.
 * I am designed to be used by any parent element.
 * I will trigger an event called 'color-change' whenever
 * a new color has been selected from within me
 */

const colorWheelTemplate = `
<style>
  :host {
    display: initial !important;
    visibility: visible !important;
    position: relative;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid black;
  }

  #palette-bar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 20px;
    background-color: rgba(200, 200, 200);
    width: 100%;
    box-sizing: border-box;
  }

  #palette-title {
    width: 100%;
    text-align: center;
  }

  #close-button {
    display: block;
    width: 12px;
    height: 12px;
    margin-left: 8px;
    background-color: white;
    border: 1px solid black;
    text-align: center;
    font-size: 12px;
  }

  #palette-content {
    flex: 1;
    display: block;
    position: relative;
  }
  #hover-color {
    display: block;
    width: 100%;
    height: 25px;
  }
  #options {
    display: flex;
    width: 100%;
    height: 25px;
    margin-top: 5px;
    justify-content: center;
  }

  #options > label{
    font-size: .8rem;
    display: flex;
    align-items: center;
  }

  #recent-colors {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    list-style: none;
  }
  .recent-color-item {
    display: block;
    width: 26px;
    height: 26px;
    box-sizing: border-box;
    border: 1px solid rgba(200, 200, 200, 0.8);
  }

  .recent-color-item.selected {
    border: 2px solid black;
  }

</style>
<div id="palette-wrapper">
  <div id="palette-bar"><div id="close-button">x</div><span id="palette-title"></span></div>
  <div id="palette-content">
    <div id="options">
      <input type="range" id="transparency" name="transparency" min="0" max="1" step="0.1" value="1">
      <!-- <label for="transparency">Transparency</label>-->
    </div>
    <ul id="recent-colors">
      <li class="recent-color-item selected"></li>
      <li class="recent-color-item"></li>
      <li class="recent-color-item"></li>
    </ul>
    <canvas id="color-wheel" width="150" height="150"></canvas>
    <div id="hover-color"></div>
  </div>
</div>
`;

class ColorWheelWidget extends HTMLElement {
    constructor(name){
        super();

        this.name = name;

        // Setup shadow dom and template
        this.template = document.createElement('template');
        this.template.innerHTML = colorWheelTemplate;
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(
            this.template.content.cloneNode(true)
        );

        // Bind local methods
        this.onWheelMouseEnter = this.onWheelMouseEnter.bind(this);
        this.onWheelMouseLeave = this.onWheelMouseLeave.bind(this);
        this.onWheelMouseMove = this.onWheelMouseMove.bind(this);
        this.onWheelClick = this.onWheelClick.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.onBarMouseDown = this.onBarMouseDown.bind(this);
        this.onBarMouseUp = this.onBarMouseUp.bind(this);
        this.onBarMouseMove = this.onBarMouseMove.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onTransparencyChange = this.onTransparencyChange.bind(this);
        this._drawWheel = this._drawWheel.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.canvas = this.shadowRoot.querySelector('canvas');
            this.bar = this.shadowRoot.getElementById('palette-bar');
            // give the widget a title if provided
            if(this.name){
                this.shadowRoot.getElementById('palette-title').innerText = this.name;
            }

            // Set events
            this.canvas.addEventListener('click', this.onWheelClick);
            this.canvas.addEventListener('mouseenter', this.onWheelMouseEnter);
            this.bar.addEventListener('mousedown', this.onBarMouseDown);
            Array.from(this.shadowRoot.querySelectorAll('.recent-color-item')).forEach(el => {
                el.addEventListener('click', this.onItemClick);
            });
            this.transparencySlider = this.shadowRoot.getElementById('transparency');
            this.transparencySlider.addEventListener("input", this.onTransparencyChange);

            // Draw the color wheel to the canvas
            this._drawWheel();
        }
    }

    disconnectedCallback(){
        this.canvas.removeEventListener('click', this.onWheelClick);
        this.canvas.removeEventListener('mouseenter', this.onWheelMouseEnter);
        this.bar.removeEventListener('mousedown', this.onBarMouseDown);
        Array.from(this.shadowRoot.querySelector('.recent-color-item')).forEach(el => {
            el.removeEventListener('click', this.onItemClick);
        });
        this.transparencySlider.removeEventListener("change", this.onTransparencyChange);
    }


    onWheelMouseEnter(event){
        // Cache the image data for the whole canvas
        let ctx = this.canvas.getContext('2d');
        this._cachedImageData = ctx.getImageData(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        // Bind subsequent events
        this.canvas.addEventListener('mousemove', this.onWheelMouseMove);
        this.canvas.addEventListener('mouseleave', this.onWheelMouseLeave);
    }

    onWheelMouseLeave(event){
        this.canvas.removeEventListener('mousemove', this.onWheelMouseMove);
        this.canvas.removeEventListener('mouseleave', this.onWheelMouseLeave);
        this._cachedImageData = null;
    }

    onWheelMouseMove(event){
        let position = getPositionFromEvent(event);
        let rgb = getRGBFromImageData(
            position.x,
            position.y,
            this.canvas.width,
            this._cachedImageData.data
        );
        let hoverColorArea = this.shadowRoot.getElementById('hover-color');
        let newStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
        hoverColorArea.style.backgroundColor = newStyle;
    }

    onWheelClick(event){
        let position = getPositionFromEvent(event);
        let rgb = getRGBFromImageData(
            position.x,
            position.y,
            this.canvas.width,
            this._cachedImageData.data
        );
        let colorInfo = {
            r: rgb[0],
            g: rgb[1],
            b: rgb[2],
            alpha: rgb[3]
        };
        let newEvent = new CustomEvent('color-selected', {
            detail: colorInfo
        });
        this.selectedColor = colorInfo;
        this.dispatchEvent(newEvent);

        // Update the recent color swatches
        let currentSwatchSelection = this.shadowRoot.querySelector('.recent-color-item.selected');
        if(currentSwatchSelection){
            currentSwatchSelection.style.backgroundColor = `rgba(${colorInfo.r}, ${colorInfo.g}, ${colorInfo.b}, ${colorInfo.alpha})`;
            currentSwatchSelection.selectedColor = colorInfo;
        }
    }

    onTransparencyChange(event){
        let command = this.getAttribute("selector-command");
        // update the corresponding transparency - text or background
        // depending on what this color wheel is setup to update
        let propName = "background-transparency";
        if(command === "text-color"){
            propName = "text-transparency";
        }
        let eventDetail = {propName: propName, value: event.target.value};
        let newEvent = new CustomEvent('transparency-changed', {
            detail: eventDetail,
        });
        this.dispatchEvent(newEvent);
    }

    onItemClick(event){
        // If this element is not the currently
        // selected recent item, find the one that is
        // and toggle the selection class, then toggle
        // this item's selection class.
        if(!event.target.classList.contains('selected')){
            Array.from(this.shadowRoot.querySelectorAll('.recent-color-item.selected')).forEach(el => {
                el.classList.remove('selected');
            });
            event.target.classList.add('selected');
        }

        if(event.target.selectedColor){
            let newEvent = new CustomEvent('color-selected', {
                detail: event.target.selectedColor
            });
            this.dispatchEvent(newEvent);
        }
    }

    onBarMouseDown(event){
        document.addEventListener('mousemove', this.onBarMouseMove);
        document.addEventListener('mouseup', this.onBarMouseUp);
    }

    onBarMouseUp(event){
        document.removeEventListener('mousemove', this.onBarMouseMove);
        document.removeEventListener('mouseup', this.onBarMouseUp);
    }

    onBarMouseMove(event){
        let newTop = this.offsetTop + event.movementY;
        let newLeft = this.offsetLeft + event.movementX;
        this.style.top = `${newTop}px`;
        this.style.left = `${newLeft}px`;
    }

    onClose(event){
        this.remove();
    }

    _drawWheel(){
        let ctx = this.canvas.getContext('2d');
        drawCircle(ctx, this.canvas.width / 2);
    }
};

window.customElements.define('color-wheel', ColorWheelWidget);

/** Utility Functions **/

// This function is adapted from
// https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43
const drawCircle = (ctx, radius) => {
    let image = ctx.createImageData(2*radius, 2*radius);
    let data = image.data;

    for (let x = -radius; x < radius; x++) {
        for (let y = -radius; y < radius; y++) {

            let [r, phi] = xy2polar(x, y);

            if (r > radius) {
                // skip all (x,y) coordinates that are outside of the circle
                continue;
            }

            let deg = rad2deg(phi);

            // Figure out the starting index of this pixel in the image data array.
            let rowLength = 2*radius;
            let adjustedX = x + radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
            let adjustedY = y + radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
            let pixelWidth = 4; // each pixel requires 4 slots in the data array
            let index = (adjustedX + (adjustedY * rowLength)) * pixelWidth;

            let hue = deg;
            let saturation = r / radius;
            let value = 1.0;

            let [red, green, blue] = hsv2rgb(hue, saturation, value);
            let alpha = 255;

            data[index] = red;
            data[index+1] = green;
            data[index+2] = blue;
            data[index+3] = alpha;
        }
    }

    ctx.putImageData(image, 0, 0);
};

// This utility function is adapted from:
// https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43
const xy2polar = (x, y) => {
    let r = Math.sqrt(x*x + y*y);
    let phi = Math.atan2(y, x);
    return [r, phi];
};

// This utility function is adapted from:
// https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43s
const rad2deg = (rad) => {
    return ((rad + Math.PI) / (2 * Math.PI)) * 360;
};

// This utility function is adapted from:
// https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43
const hsv2rgb = (hue, saturation, value) => {
    let chroma = value * saturation;
    let hue1 = hue / 60;
    let x = chroma * (1- Math.abs((hue1 % 2) - 1));
    let r1, g1, b1;
    if (hue1 >= 0 && hue1 <= 1) {
        ([r1, g1, b1] = [chroma, x, 0]);
    } else if (hue1 >= 1 && hue1 <= 2) {
        ([r1, g1, b1] = [x, chroma, 0]);
    } else if (hue1 >= 2 && hue1 <= 3) {
        ([r1, g1, b1] = [0, chroma, x]);
    } else if (hue1 >= 3 && hue1 <= 4) {
        ([r1, g1, b1] = [0, x, chroma]);
    } else if (hue1 >= 4 && hue1 <= 5) {
        ([r1, g1, b1] = [x, 0, chroma]);
    } else if (hue1 >= 5 && hue1 <= 6) {
        ([r1, g1, b1] = [chroma, 0, x]);
    }

    let m = value - chroma;
    let [r,g,b] = [r1+m, g1+m, b1+m];

    // Change r,g,b values from [0,1] to [0,255]
    return [255*r,255*g,255*b];
};

const getPositionFromEvent = (event) => {
    let target = event.target;
    let offsetX = target.offsetLeft;
    let offsetY = target.offsetTop;
    let check = target.offsetParent;
    while(check){
        offsetX += check.offsetLeft;
        offsetY += check.offsetTop;
        check = check.offsetParent;
    }
    let result = {
        x: event.clientX - offsetX,
        y: event.clientY - offsetY
    };
    return result;
};

const getRGBFromImageData = (x, y, width, data) => {
    let index = (y * width + x) * 4;
    return [
        data[index], // r
        data[index + 1], // g
        data[index + 2], // b
        data[index + 3] // alpha
    ];
};




/***/ }),

/***/ "./js/objects/views/drawing/DrawingView.js":
/*!*************************************************!*\
  !*** ./js/objects/views/drawing/DrawingView.js ***!
  \*************************************************/
/*! exports provided: DrawingView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawingView", function() { return DrawingView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DrawingView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PartView.js */ "./js/objects/views/PartView.js");
/* harmony import */ var _PencilTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PencilTool.js */ "./js/objects/views/drawing/PencilTool.js");
/* harmony import */ var _EraserTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EraserTool.js */ "./js/objects/views/drawing/EraserTool.js");
/* harmony import */ var _ColorPickerTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ColorPickerTool.js */ "./js/objects/views/drawing/ColorPickerTool.js");
/**
 * DrawingView
 * Experimental.
 * This is still a pure webcomponent and is not
 * linked at all to SimpleTalk yet.
 *
 */





const haloButtonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-tool" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6-6a6 6 0 0 1 -8 -8l3.5 3.5" />
</svg>
`;

const templateString = `
<style>
    :host {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
    }
    #tool-buttons {
        position: absolute;
        left: calc(100% + 5px);
        top: 0px;
        display: flex;
        flex-direction: column;
    }
    :host(.show-border){
        border: 1px solid black;
    }
    :host(:not([mode="drawing"])) > #tool-buttons {
        display: none;
    }
</style>
<canvas></canvas >
<div id="tool-buttons">
<slot></slot>
</div>
`;

class DrawingView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["PartView"] {
    constructor(){
        super();

        // Setup shadow dom
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(
            this.template.content.cloneNode(true)
        );

        this.colorPickerTool = null;

        this.isCurrentlyDrawing = false;

        // Bind component methods
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onHaloResize = this.onHaloResize.bind(this);
        this.initCustomHaloButton = this.initCustomHaloButton.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
        this.afterDrawAction = this.afterDrawAction.bind(this);
        this.restoreImageFromModel = this.restoreImageFromModel.bind(this);
        this.setupPropHandlers = this.setupPropHandlers.bind(this);
        this.modeChanged = this.modeChanged.bind(this);

        // Setup prop handlers
        this.setupPropHandlers();
    }

    setupPropHandlers(){
        this.onPropChange('mode', this.modeChanged);
        this.onPropChange('image', () => {
            let imageBits = this.model.partProperties.getPropertyNamed(
                this.model,
                'image'
            );
            this.restoreImageFromModel(imageBits);
        });
        this.onPropChange('show-border', (val) => {
            if(val){
                this.classList.add('show-border');
            } else {
                this.classList.remove('show-border');
            }
        });
        this.onPropChange('width', (val) => {
            // Note: what we want is the calculated CSS, not the ST part property value
            let cssStyle = this.model.partProperties.getPropertyNamed(this.model, "cssStyle");
            let canvas = this.shadow.querySelector('canvas');
            canvas.setAttribute("width", cssStyle.width);
        });
        this.onPropChange('height', (val) => {
            // Note: what we want is the calculated CSS, not the ST part property value
            let cssStyle = this.model.partProperties.getPropertyNamed(this.model, "cssStyle");
            let canvas = this.shadow.querySelector('canvas');
            canvas.setAttribute("height", cssStyle.height);
        });
    }

    modeChanged(value){
        this.setAttribute('mode', value);
    }

    afterConnected(){
        this.canvas = this.shadow.querySelector('canvas');
        this.canvas.addEventListener('mouseup', this.onMouseUp);
        this.canvas.addEventListener('mousedown', this.onMouseDown);

        // Set and store the drawing context
        this.drawingContext = this.canvas.getContext('2d');

        // If I don't have the default tools, add
        // them as real dom children now
        let pencilChild = this.querySelector('pencil-tool');
        if(!pencilChild){
            let newPencil = document.createElement('pencil-tool');
            this.append(newPencil);
        }
        let eraserChild = this.querySelector('eraser-tool');
        if(!eraserChild){
            let newEraser = document.createElement('eraser-tool');
            this.append(newEraser);
        }

        let colorPickerChild = this.querySelector('color-picker-tool');
        if(!colorPickerChild){
            let newColorPicker = document.createElement('color-picker-tool');
            // TODO this is a total hack since drawing does not work well with styles at the moment
            this.append(newColorPicker);
            newColorPicker.colorWheel.shadowRoot.querySelector('div#options').style.display = "none";
            this.colorPickerTool = newColorPicker;
        }

        if(!this.haloButton){
            this.initCustomHaloButton();
        }
    }

    afterDisconnected(){
        this.canvas.removeEventListener('mouseup', this.onMouseUp);
        this.canvas.removeEventListener('mousedown', this.onMouseDown);
    }

    afterModelSet(){
        // setup the canvas height and width
        // Note: what we want is the calculated CSS, not the ST part property value
        let cssStyle = this.model.partProperties.getPropertyNamed(this.model, "cssStyle");
        let canvas = this.shadow.querySelector('canvas');
        canvas.setAttribute("height", cssStyle.height);
        canvas.setAttribute("width", cssStyle.width);
        let currentImage = this.model.partProperties.getPropertyNamed(
            this.model,
            'image'
        );
        if(currentImage){
            this.restoreImageFromModel(currentImage);
        }

        let initialShowBorder = this.model.partProperties.getPropertyNamed(
            this.model,
            'show-border'
        );
        if(initialShowBorder){
            this.classList.add('show-border');
        }
    }

    onMouseDown(event){
        if(event.shiftKey){
            return;
        } else if(!this.inDrawingMode) {
            // Send the mouseUp command message to self
            this.model.sendMessage({
                type: 'command',
                commandName: 'mouseUp',
                args: [],
                shouldIgnore: true // Should ignore if System DNU
            }, this.model);
        }
        this.activeTool = this.querySelector('[role="tool"][active="true"]');
        if(!this.activeTool){
            return;
        }
        this.isCurrentlyDrawing = true;
        let canvas = this.shadow.querySelector('canvas');
        canvas.addEventListener('mousemove', this.onMouseMove);
        canvas.addEventListener('mouseleave', this.onMouseLeave);
        this.activeTool.start(event.offsetX, event.offsetY);
    }

    onMouseMove(event){
        if(event.shiftKey){
            return;
        }
        if(this.activeTool && this.inDrawingMode){
            this.activeTool.onMove(
                event.offsetX,
                event.offsetY
            );
        } else if(this.model.partProperties.getPropertyNamed(this.model, "wants-move")){
            this.sendMessage({
                type: 'command',
                commandName: 'move',
                args: [event.movementX, event.movementY]
            }, this.model);
        }
    }

    onMouseUp(event){
        if(event.shiftKey){
            return;
        }
        if(this.activeTool && this.inDrawingMode && this.isCurrentlyDrawing){
            this.activeTool.end(event.offsetX, event.offsetY);
            this.afterDrawAction();
        }
        this.isCurrentlyDrawing = false;
        let canvas = this.shadow.querySelector('canvas');
        canvas.removeEventListener('mousemove', this.onMouseMove);
        canvas.removeEventListener('mouseleave', this.onMouseLeave);
    }


    onMouseLeave(event){
        // If this is triggered, we left the area
        // while drawing. So call the activeTool's
        // end method
        this.activeTool.end(
            event.offsetX,
            event.offsetY
        );
        this.isCurrentlyDrawing = false;
        this.afterDrawAction();
        this.canvas.removeEventListener('mouseleave', this.onMouseLeave);
        this.canvas.removeEventListener('mousemove', this.onMouseMove);
    }

    onHaloResize(movementX, movementY){
        let canvas = this.shadowRoot.querySelector('canvas');
        let currentImage = this.model.partProperties.getPropertyNamed(
            this.model,
            'image'
        );
        // canvas.width = canvas.width + movementX;
        // canvas.height = canvas.height + movementY;
        let newWidth = canvas.width + movementX;
        let newHeight = canvas.height + movementY;
        if(newWidth && newHeight){
            // this.style.width = `${newWidth}px`;
            // this.style.height = `${newHeight}px`;
            this.model.partProperties.setPropertyNamed(
                this.model,
                'width',
                newWidth,
                true
            );
            this.model.partProperties.setPropertyNamed(
                this.model,
                'height',
                newHeight,
                true
            );
        }
        this.restoreImageFromModel(currentImage);
    }

    afterDrawAction(){
        // Encode canvas contents as base64 png
        // and set to model's image property
        let canvas = this.shadowRoot.querySelector('canvas');
        this.model.partProperties.setPropertyNamed(
            this.model,
            'image',
            canvas.toDataURL()
        );
        //this.setAttribute("mode", "");
    }

    restoreImageFromModel(base64ImageData){
        // Clear and draw the image to restore to
        // the canvas
        if(base64ImageData){
            let canvas = this.shadowRoot.querySelector('canvas');
            let context = canvas.getContext('2d');
            let img = new Image();
            img.onload = function(){
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0);
            };
            img.src = base64ImageData;

            // Set the border to hide
            this.model.partProperties.setPropertyNamed(
                this.model,
                'show-border',
                false
            );
        }
    }

    initCustomHaloButton(){
        this.haloButton = document.createElement('div');
        this.haloButton.id = "halo-drawing-toggle-mode";
        this.haloButton.classList.add('halo-button');
        this.haloButton.innerHTML = haloButtonSVG;
        this.haloButton.style.marginRight = "6px";
        this.haloButton.setAttribute('slot', 'bottom-row');
        this.haloButton.setAttribute('title', 'Toggle drawing tools');
        this.haloButton.addEventListener('click', this.toggleMode);
    }

    openHalo(){
        // Override default. Here we add a custom button
        // when showing.
        let foundHalo = this.shadowRoot.querySelector('st-halo');
        if(!foundHalo){
            foundHalo = document.createElement('st-halo');
            this.shadowRoot.appendChild(foundHalo);
        }
        foundHalo.append(this.haloButton);
    }

    toggleMode(){
        let currentMode = this.getAttribute('mode');
        let nextMode = 'viewing'; // By default, set to viewing
        let isEmpty = (!currentMode || currentMode == undefined || currentMode == "");
        if(currentMode == 'viewing' || isEmpty){
            nextMode = 'drawing';
        }
        this.model.partProperties.setPropertyNamed(
            this.model,
            'mode',
            nextMode
        );
    }

    get inDrawingMode(){
        if(!this.model){
            return false;
        }
        let mode = this.getAttribute('mode');
        if(mode == 'drawing'){
            return true;
        }
        return false;
    }
};




/***/ }),

/***/ "./js/objects/views/drawing/EraserTool.js":
/*!************************************************!*\
  !*** ./js/objects/views/drawing/EraserTool.js ***!
  \************************************************/
/*! exports provided: EraserTool, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EraserTool", function() { return EraserTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EraserTool; });
/**
 * EraserTool
 * -----------------------------------
 * I provide eraser-like functionality on
 * my parent element's shadow canvas.
 * I am specifically designed for use as a
 * child of DrawingView
 */
const eraserSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eraser" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9" />
  <line x1="18" y1="12.3" x2="11.7" y2="6" />
</svg>
`;

const eraserToolTemplateString = `
<style>
    :host {
        display: flex;
        position: relative;
        margin-bottom: 6px;
    }
    #tool-button {
        --active-color: black;
        --inactive-color: rgb(170, 170, 170);
        --hover-color: rgb(140, 140, 140);
        display: block;
        width: 24px;
        height: 24px;
        border-width: 1px;
        border-style: solid;
        border-color: var(--inactive-color);
        color: var(--inactive-color);
    }
    :host([active="true"]) > #tool-button {
        border-color: var(--active-color);
        color: var(--active-color);
    }
    #brushes-container {
        position: relative;
        margin-left: 6px;
        display: none;
    }
    #brush-adjuster {
        position: relative;
        display: flex;
        margin-left: 6px;
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: var(--active-color);
    }
    #brush-slider,
    #brush-number {
        box-sizing: border-box;
    }
    #brush-number {
        max-width: 3rem;
    }
    :host([active="true"]) > #brushes-container {
        display: flex;
    }
</style>
<div id="tool-button">
  ${eraserSVG}
</div>
<div id="brushes-container">
  <div id="brush-adjuster">
    <input id="brush-slider" type="range" min="1" max="100" step="1">
    <input id="brush-number" type="number">
  </div>
</div>
`;

class EraserTool extends HTMLElement {
    constructor(){
        super();

        // Setup shadow dom. This tool will
        // display itself as a button that can
        // be toggled.
        this.template = document.createElement('template');
        this.template.innerHTML = eraserToolTemplateString;
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(
            this.template.content.cloneNode(true)
        );

        // Default drawing context is null.
        // This will be set if and when this tool is
        // connected to a parent element that has a context
        this.ctx = null;

        // Bind component methods
        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.onMove = this.onMove.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.setContextFromAttributes = this.setContextFromAttributes.bind(this);
        this.handleBrushSliderChange = this.handleBrushSliderChange.bind(this);
        this.handleBrushNumberInputChange = this.handleBrushNumberInputChange.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.setAttribute('role', 'tool');
            this.setAttribute('active', false);
            if(!this.hasAttribute('width')){
                this.setAttribute('width', '6');
            }
            if(this.parentElement.drawingContext){
                this.ctx = this.parentElement.drawingContext;

                // If I am the only tool in my parent,
                // set myself to active
                let siblingTools = this.parentElement.querySelectorAll('[role="tool"]');
                if(siblingTools.length == 1){
                    this.setAttribute('active', true);
                }
            }

            // Attach event listeners
            this.button = this.shadowRoot.getElementById('tool-button');
            this.button.addEventListener('click', this.toggleActive);
            this.brushSlider = this.shadowRoot.getElementById('brush-slider');
            this.brushSlider.addEventListener('input', this.handleBrushSliderChange);
            this.brushNumberInput = this.shadowRoot.getElementById('brush-number');
            this.brushNumberInput.addEventListener('input', this.handleBrushNumberInputChange);

            // If there are is currently a width set,
            // update the slider and number input accordingly
            let currentWidth = this.getAttribute('width');
            if(currentWidth){
                this.brushSlider.value = parseInt(currentWidth);
                this.brushNumberInput.value = parseInt(currentWidth);
            }
        }
    }

    disconnectedCallback(){
        this.ctx = null;
        this.button.removeEventListener('click', this.toggleActive);
        this.brushSlider.removeEventListener('input', this.handleBrushSliderChange);
        this.brushNumberInput.removeEventListener('input', this.handleBrushNumberInputChange);
    }

    start(x, y){
        this.setContextFromAttributes();
        this.cachedStrokeStyle = this.ctx.strokeStyle;
        this.ctx.strokeStyle = 'red';
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.moveTo(x, y);
        this.ctx.beginPath();
    }

    onMove(x, y){
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    end(x, y){
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.strokeStyle = this.cachedStrokeStyle;
    }

    setContextFromAttributes(){
        // line cap
        let lineCap = this.getAttribute('line-cap');
        if(lineCap){
            this.ctx.lineCap = lineCap;
        } else {
            this.ctx.lineCap = "round"; // default
        }

        // line join
        let lineJoin = this.getAttribute('line-join');
        if(lineJoin){
            this.ctx.lineJoin = lineJoin;
        } else {
            this.ctx.lineJoin = "round";
        }

        // line width
        let lineWidth = this.getAttribute('width');
        if(lineWidth){
            this.ctx.lineWidth = parseInt(lineWidth);
        } else {
            this.ctx.lineWidth = 6;
        }
    }

    static get observedAttributes(){
        return [
            'width',
            'line-join',
            'line-cap'
        ];
    }

    attributeChangedCallback(name, oldVal, newVal){
        if(name == 'width'){
            if(this.brushSlider){
                this.brushSlider.value = parseInt(newVal);
            }
            if(this.brushNumberInput){
                this.brushNumberInput.value = parseInt(newVal);
            }
        }
    }

    handleBrushSliderChange(event){
        this.setAttribute('width', event.target.value);
    }

    handleBrushNumberInputChange(event){
        this.setAttribute('width', event.target.value);
    }

    toggleActive(event){
        let isActive = this.getAttribute('active');
        if(isActive == "true"){
            this.setAttribute('active', 'false');
        } else {
            // First, find any other tools in my parent
            // element and deactivate them.
            Array.from(this.parentElement.querySelectorAll('[role="tool"]'))
                .filter(el => {
                    return el.getAttribute('active') == 'true';
                })
                .forEach(el => {
                    el.setAttribute('active', 'false');
                });

            // Set this tool to be active
            this.setAttribute('active', 'true');
        }
    }
};
window.customElements.define('eraser-tool', EraserTool);




/***/ }),

/***/ "./js/objects/views/drawing/PencilTool.js":
/*!************************************************!*\
  !*** ./js/objects/views/drawing/PencilTool.js ***!
  \************************************************/
/*! exports provided: PencilTool, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PencilTool", function() { return PencilTool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PencilTool; });
/**
 * PencilTool
 * --------------------------
 * I provide pencil-like drawing capability
 * on the shadow canvas of my parent element.
 * I am explicitly designed for use with
 * DrawingView
 */
const pencilSVG = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
</svg>
`;

const pencilTemplateString = `
<style>
    :host {
        display: flex;
        position: relative;
        margin-bottom: 6px;
    }
    #tool-button {
        --active-color: black;
        --inactive-color: rgb(170, 170, 170);
        --hover-color: rgb(140, 140, 140);
        display: block;
        width: 24px;
        height: 24px;
        border-width: 1px;
        border-style: solid;
        border-color: var(--inactive-color);
        color: var(--inactive-color);
    }
    :host([active="true"]) > #tool-button {
        border-color: var(--active-color);
        color: var(--active-color);
    }
    #brushes-container {
        position: relative;
        margin-left: 6px;
        display: none;
    }
    #brush-adjuster {
        position: relative;
        display: flex;
        margin-left: 6px;
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: var(--active-color);
    }
    #brush-slider,
    #brush-number {
        box-sizing: border-box;
    }
    #brush-number {
        max-width: 3rem;
    }
    :host([active="true"]) > #brushes-container {
        display: flex;
    }
</style>
<div id="tool-button">
  ${pencilSVG}
</div>
<div id="brushes-container">
  <div id="brush-adjuster">
    <input id="brush-slider" type="range" min="1" max="100" step="1">
    <input id="brush-number" type="number">
  </div>
</div>
`;

class PencilTool extends HTMLElement {
    constructor(){
        super();

        // Set up shadow dom. This tool will
        // display itself as a button that can
        // be toggled.
        this.template = document.createElement('template');
        this.template.innerHTML = pencilTemplateString;
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.append(
            this.template.content.cloneNode(true)
        );

        // Default drawing context
        // is null. This will be set
        // if and when this tool is
        // connected to a parent element
        // that has a context
        this.ctx = null;

        // Bind component methods
        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.onMove = this.onMove.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.setContextFromAttributes = this.setContextFromAttributes.bind(this);
        this.handleBrushSliderChange = this.handleBrushSliderChange.bind(this);
        this.handleBrushNumberInputChange = this.handleBrushNumberInputChange.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.setAttribute('role', 'tool');
            this.setAttribute('active', false);
            if(!this.hasAttribute('width')){
                this.setAttribute('width', '6');
            }
            if(this.parentElement.drawingContext){
                this.ctx = this.parentElement.drawingContext;

                // If I am the only tool in my parent,
                // set myself to active
                let siblingTools = this.parentElement.querySelectorAll('[role="tool"]');
                if(siblingTools.length == 1){
                    this.setAttribute('active', true);
                }
            }

            // Attach event listeners
            this.button = this.shadowRoot.getElementById('tool-button');
            this.button.addEventListener('click', this.toggleActive);
            this.brushSlider = this.shadowRoot.getElementById('brush-slider');
            this.brushSlider.addEventListener('input', this.handleBrushSliderChange);
            this.brushNumberInput = this.shadowRoot.getElementById('brush-number');
            this.brushNumberInput.addEventListener('input', this.handleBrushNumberInputChange);

            // If there are is currently a width set,
            // update the slider and number input accordingly
            let currentWidth = this.getAttribute('width');
            if(currentWidth){
            this.brushSlider.value = parseInt(currentWidth);
                this.brushNumberInput.value = parseInt(currentWidth);
            }
        }
    }

    disconnectedCallback(){
        this.ctx = null;
        this.button.removeEventListener('click', this.toggleActive);
        this.brushSlider.removeEventListener('input', this.handleBrushSliderChange);
        this.brushNumberInput.removeEventListener('input', this.handleBrushNumberInputChange);
    }

    start(x, y){
        this.setContextFromAttributes();
        this.ctx.moveTo(x, y);
        this.ctx.beginPath();
    }

    onMove(x, y){
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    end(x, y){
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    setContextFromAttributes(){
        // line cap
        let lineCap = this.getAttribute('line-cap');
        if(lineCap){
            this.ctx.lineCap = lineCap;
        } else {
            this.ctx.lineCap = "round"; // default
        }

        // line join
        let lineJoin = this.getAttribute('line-join');
        if(lineJoin){
            this.ctx.lineJoin = lineJoin;
        } else {
            this.ctx.lineJoin = "round";
        }

        // line width
        let lineWidth = this.getAttribute('width');
        if(lineWidth){
            this.ctx.lineWidth = parseInt(lineWidth);
        } else {
            this.ctx.lineWidth = 6;
        }
    }

    static get observedAttributes(){
        return [
            'width',
            'line-join',
            'line-cap'
        ];
    }

    attributeChangedCallback(name, oldVal, newVal){
        if(name == 'width'){
            if(this.brushSlider){
                this.brushSlider.value = parseInt(newVal);
            }
            if(this.brushNumberInput){
                this.brushNumberInput.value = parseInt(newVal);
            }
        }
    }

    handleBrushSliderChange(event){
        this.setAttribute('width', event.target.value);
    }

    handleBrushNumberInputChange(event){
        this.setAttribute('width', event.target.value);
    }

    toggleActive(event){
        let isActive = this.getAttribute('active');
        if(isActive == "true"){
            this.setAttribute('active', 'false');
        } else {
            // First, find any other tools in my parent
            // element and deactivate them.
            Array.from(this.parentElement.querySelectorAll('[role="tool"]'))
                .filter(el => {
                    return el.getAttribute('active') == 'true';
                })
                .forEach(el => {
                    el.setAttribute('active', 'false');
                });

            // Set this tool to be active
            this.setAttribute('active', 'true');
        }
    }
};

window.customElements.define('pencil-tool', PencilTool);




/***/ }),

/***/ "./js/objects/views/editors/Editor.js":
/*!********************************************!*\
  !*** ./js/objects/views/editors/Editor.js ***!
  \********************************************/
/*! exports provided: Editor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Editor; });
/* harmony import */ var _EditorTab_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditorTab.js */ "./js/objects/views/editors/EditorTab.js");
/* harmony import */ var _EditorPropList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditorPropList.js */ "./js/objects/views/editors/EditorPropList.js");
/* harmony import */ var _EditorMessenger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorMessenger.js */ "./js/objects/views/editors/EditorMessenger.js");
/* harmony import */ var _EditorCustomList_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorCustomList.js */ "./js/objects/views/editors/EditorCustomList.js");
/* harmony import */ var _EditorSubpartsPane_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditorSubpartsPane.js */ "./js/objects/views/editors/EditorSubpartsPane.js");
/* harmony import */ var _utils_icons_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/icons.js */ "./js/objects/utils/icons.js");






// PREAMBLE

// Add editor tab element
window.customElements.define('editor-tab', _EditorTab_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
window.customElements.define('editor-props-list', _EditorPropList_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
window.customElements.define('editor-custom-list', _EditorCustomList_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
window.customElements.define('editor-messenger', _EditorMessenger_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
window.customElements.define('editor-subparts', _EditorSubpartsPane_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

const closeButton = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>
`;

const scriptIcon = `
<svg id='script' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-code" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    <path d="M10 13l-1 2l1 2" />
    <path d="M14 13l1 2l-1 2" />
</svg>`;

const templateString = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        position: absolute;
        transform: translateX(-105%);
        transition: transform 150ms linear;
        width: 400px;
        height: 100%;
        background-color: white;
        padding: 8px;
        border-right: 1px solid rgba(0, 0, 0, 0.5);
        box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.3);
    }
    
    :host(.open){
        transform: translateX(0%);
        transition: transform 150ms linear;
        z-index: 100;
    }

    :host(::after) {
        content: " ";
        height: 100%;
        width: 5px;
        background-color: black;
        display: block;
        position: absolute;
        top: 0;
        right: -10;
        box-shadow: 0px 0px 3px 10px rgba(100, 100, 100, 0.6);
    }

    ::slotted(editor-props-list:not(.show-pane)),
    ::slotted(editor-messenger:not(.show-pane)),
    ::slotted(editor-custom-list:not(.show-pane)),
    ::slotted(editor-subparts:not(.show-pane)){
        display: none;
    }

    #tab-area {
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
    }
    
    #pane-area {
        display: block;
        flex: 1;
        margin-top: 20px;
        overflow: hidden;
    }

    #header-area {
        display: flex;
        font-family: 'Helvetica', sans-serif;
        margin-bottom: 20px;
    }

    .header-side {
        flex: 1;
        margin-top: 20px;
    }

    #display-area {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
    }

    #header-area h3 {
        display: inline-block;
        margin: 0;
        margin-right: 8px;
        margin-left: 5px;
        font-size: 1.7rem;
    }

    #header-left > input {
        display: inline-block;
        padding: 4px;
        outline: none;
        border: 1px solid transparent;
        border-bottom: 1px solid rgba(100, 100, 100, 0.8);
        font-size: 1.1rem;
    }

    #header-right > button {
        width: 100%;
        background-color: transparent;
        border: 1px solid transparent;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 0.85em;
    }

    #header-right > button:hover {
        cursor: pointer;
        border: 1px solid rgba(150, 150, 150, 0.3);
    }

    #header-right > button:active {
        border: 1px solid rgba(150, 150, 150, 0.8);
        background-color: rgba(220, 220, 220);
    }

    #header-right > button > svg {
        height: 1.3em;
        width: auto;
        margin-right: 8px;
    }

    #header-left {
        max-width: 80%;
    }

    #header-left span {
        font-family: monospace;
        font-size: 1.1rem;
        color: rgba(0, 0, 0, 0.5);
        text-overflow: ellipsis;
        overflow: hidden;
    }

    #icon-display-area {
        width: 1.7rem;
        height: 1.7rem;
        margin-bottom: 5px;
    }
    #icon-display-area > svg {
        width: 100%;
        height: 100%;
    }

    #close-button {
        display: block;
        position: absolute;
        top: 5;
        right: 5;
    }
    #close-button:hover {
        cursor: pointer;
    }
</style>
<div id="close-button">${closeButton}</div>
<div id="header-area">
    <div id="header-left" class="header-side">
        <div id="display-area">
            <div id="icon-display-area"></div>
            <h3></h3><span></span>
        </div>
        <input type="text" id="part-name-input"/>
    </div>
    <div id="header-right" class="header-side">
        <button id="edit-script-button">
            ${scriptIcon}
            <span>Edit Script</span>
        </button>
    </div>
</div>
<div id="tab-area">
    <editor-tab active="true" name="properties">Properties</editor-tab>
    <editor-tab name="custom">Custom</editor-tab>
    <editor-tab name="messenger">Messenger</editor-tab>
    <editor-tab name="subparts">Subparts</editor-tab>
</div>
<div id="pane-area">
    <slot></slot>
</div>
`;

class Editor extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Bound methods
        this.toggle = this.toggle.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.render = this.render.bind(this);
        this.centerOnElement = this.centerOnElement.bind(this);
        this.undoCenterOnElement = this.undoCenterOnElement.bind(this);
        this.updateHeader = this.updateHeader.bind(this);
        this.checkForNavigation = this.checkForNavigation.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.onTabActivated = this.onTabActivated.bind(this);
        this.onNameInputChange = this.onNameInputChange.bind(this);
        this.onEditScriptClick = this.onEditScriptClick.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this._shadowRoot.addEventListener('tab-activated', this.onTabActivated);
            this._shadowRoot.getElementById('close-button').addEventListener(
                'click',
                this.close
            );

            // Events
            let nameInput = this._shadowRoot.getElementById('part-name-input');
            nameInput.addEventListener('change', this.onNameInputChange);

            let editScriptButton = this._shadowRoot.getElementById('edit-script-button');
            editScriptButton.addEventListener('click', this.onEditScriptClick);
        }
    }

    disconnectedCallback(){
        this._shadowRoot.removeEventListener('tab-activated', this.onTabActivated);
        this._shadowRoot.getElementById('close-button').removeEventListener(
            'click',
            this.close
        );
        
        // Events
        let nameInput = this._shadowRoot.getElementById('part-name-input');
        nameInput.removeEventListener('change', this.onNameInputChange);

        let editScriptButton = this._shadowRoot.getElementById('edit-script-button');
        editScriptButton.removeEventListener('click', this.onEditScriptClick);
    }

    toggle(){
        if(this.isOpen){
            this.close();
        } else {
            this.open();
        }
    }

    open(){
        this.classList.add('open');
        this.centerOnElement();
    }

    close(){
        this.classList.remove('open');
        this.undoCenterOnElement();
    }

    render(aModel){
        if(this.model){
            this.model.removePropertySubscriber(this);
        }
        this.model = aModel;
        this.model.addPropertySubscriber(this);

        // If the incoming model is a Card or
        // Stack that is not the current one,
        // we navigate to it
        if(this.model.type == 'card' || this.model.type == 'stack'){
            this.checkForNavigation();
        }

        // Close any open Halos.
        // If the new model wants a Halo,
        // open it on the View for that Model.
        Array.from(document.querySelectorAll(`.editing`)).forEach(el => {
            el.closeHalo();
        });
        let targetView = document.querySelector(`[part-id="${this.model.id}"]`);
        if(targetView && targetView.wantsHalo){
            targetView.openHalo();
        }
        
        this.updateHeader();

        // Clear slotted inner DOM
        this.innerHTML = "";

        // Add panes
        let propsPane = document.createElement('editor-props-list');
        propsPane.setAttribute('tab-name', 'properties');
        this.appendChild(propsPane);
        propsPane.render(this.model);

        let messengerPane = document.createElement('editor-messenger');
        messengerPane.setAttribute('tab-name', 'messenger');
        this.appendChild(messengerPane);
        messengerPane.render(this.model);

        let customPane = document.createElement('editor-custom-list');
        customPane.setAttribute('tab-name', 'custom');
        this.appendChild(customPane);
        customPane.render(this.model);

        let subpartsPane = document.createElement('editor-subparts');
        subpartsPane.setAttribute('tab-name', 'subparts');
        this.appendChild(subpartsPane);
        subpartsPane.render(this.model);

        // Find the active tab and show its corresponding pane
        let activeTab = this._shadowRoot.querySelector(`editor-tab[active="true"]`);
        if(activeTab){
            let activeName = activeTab.getAttribute('name');
            Array.from(this.querySelectorAll('[tab-name]')).forEach(pane => {
                let name = pane.getAttribute('tab-name');
                if(name == activeName){
                    pane.classList.add('show-pane');
                } else {
                    pane.classList.remove('show-pane');
                }
            });
        }

        // If this pane is already open, then center
        // on the primary view element for the model
        if(this.isOpen){
            this.centerOnElement();
        }
    }

    centerOnElement(){
        // Use CSS transforms of the whole World to center on
        // the primary view element of the Part being edited,
        // if set. If not set, do nothing.
        if(this.model){
            // If we are editing a Card, Stack, or World, then
            // we uncenter and return
            let isCardStackOrWorld = ['card', 'stack', 'world'].includes(this.model.type);
            if(isCardStackOrWorld){
                return this.undoCenterOnElement();
            }
            
            let partView = window.System.findViewById(this.model.id);
            let worldView = window.System.findViewById('world');
            let current = worldView.getAttribute('centered-on');
            if(current == this.model.id.toString()){
                return;
            }

            let menuRect = this.getBoundingClientRect();
            let partRect = partView.getBoundingClientRect();

            // Get the actual viewable width, plus the editor menu
            let viewWidth = window.innerWidth + menuRect.width;
            let viewHeight = window.innerWidth - menuRect.height;

            // Calculate X translation
            let targetX = (viewWidth - partRect.width) / 2;
            let newX;
            if(targetX < partRect.left){
                newX = (partRect.left - targetX) * -1;
            } else {
                newX = targetX - partRect.left;
            }

            // Calculate Y translation
            let targetY = (viewHeight - partRect.height) / 2;
            let newY;
            if(targetY < partRect.top){
                newY = (partRect.top - targetY) * -1;
            } else {
                newY = targetY - partRect.top;
            }

            worldView.setAttribute('centered-on', this.model.id);
            
            // Set transform and transition
            worldView.style.transition = "transform 0.3s ease-out";
            worldView.style.transform = `translate(${newX}px, ${newY}px)`;
        }
    }

    undoCenterOnElement(){
        let worldView = window.System.findViewById('world');
        worldView.removeAttribute('centered-on');
        worldView.style.removeProperty('transform');
    }

    updateHeader(){
        let nameInput = this._shadowRoot.querySelector('#header-left > input');
        let typeDisplay = this._shadowRoot.querySelector('#display-area > h3');
        let idDisplay = this._shadowRoot.querySelector('#display-area > span');
        let iconDisplay = this._shadowRoot.getElementById('icon-display-area');

        let partName = this.model.partProperties.getPropertyNamed(
            this.model,
            'name'
        );

        if(partName && partName !== ""){
            nameInput.value = partName;
        } else {
            nameInput.value = "(Unnamed)";
        }

        typeDisplay.textContent = this.model.type.charAt(0).toUpperCase() + this.model.type.slice(1);
        idDisplay.textContent = `id=${this.model.id}`;
        idDisplay.title = this.model.id;

        if(Object.keys(_utils_icons_js__WEBPACK_IMPORTED_MODULE_5__["default"]).includes(this.model.type)){
            iconDisplay.innerHTML = _utils_icons_js__WEBPACK_IMPORTED_MODULE_5__["default"][this.model.type];
        } else {
            iconDisplay.innerHTML = _utils_icons_js__WEBPACK_IMPORTED_MODULE_5__["default"].generic;
        }
    }

    checkForNavigation(){
        // If the model is a Card or Stack that
        // is not the current (ie, not being displayed
        // in the main window), then we should navigate
        // to it
        let currentStack = window.System.world.currentStack;
        let currentCard = currentStack.currentCard;
        if(this.model.type == 'card' && this.model.id != currentCard.id){
            currentStack.goToCardById(this.model.id);
        } else if(this.model.type == 'stack' && this.model.id != currentStack.id){
            window.System.world.goToStackById(this.model.id);
        }
        
    }

    receiveMessage(aMessage){
        switch(aMessage.type){
        case 'propertyChanged':
            // Find any nested editor-prop-item elements
            // and re-render, so they display the correct
            // values in the editor
            let queryString = `editor-prop-item[name="${aMessage.propertyName}"][owner-id="${aMessage.partId}"]`;
            Array.from(this.querySelectorAll(queryString)).forEach(el => {
                if(el.property.value !== aMessage.value){
                    el.render();
                }
            });
            break;
        }
    }

    onTabActivated(event){
        Array.from(this._shadowRoot.querySelectorAll('editor-tab'))
            .filter(tabEl => {
                return tabEl !== event.target;
            }).forEach(tabEl => {
                tabEl.removeAttribute('active');
            });

        // Get the name of the activated tab
        let targetName = event.target.getAttribute('name');
        Array.from(this.querySelectorAll('[tab-name]')).forEach(pane => {
            let name = pane.getAttribute('tab-name');
            if(name == targetName){
                pane.classList.add('show-pane');
            } else {
                pane.classList.remove('show-pane');
            }
        });
    }

    onNameInputChange(event){
        if(this.model){
            let newName = event.target.value;
            this.model.partProperties.setPropertyNamed(
                this.model,
                'name',
                newName
            );
        }
    }

    onEditScriptClick(event){
        if(this.model){
            this.model.sendMessage({
                type: 'command',
                commandName: 'openScriptEditor',
                args: [
                    this.model.id
                ]
            }, this.model);
            this.close();
        }
    }

    get isOpen(){
        return this.classList.contains('open');
    }
};




/***/ }),

/***/ "./js/objects/views/editors/EditorCustomList.js":
/*!******************************************************!*\
  !*** ./js/objects/views/editors/EditorCustomList.js ***!
  \******************************************************/
/*! exports provided: EditorCustomList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorCustomList", function() { return EditorCustomList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorCustomList; });


// PREAMBLE

const caretDownIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-caret-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M18 15l-6 -6l-6 6h12" transform="rotate(180 12 12)" />
</svg>
`;

const caretRightIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-caret-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M18 15l-6 -6l-6 6h12" transform="rotate(90 12 12)" />
</svg>
`;

const templateString = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        font-family: 'Helvetica', sans-serif;
        font-size: 0.8rem;
    }

    #props-list {
        flex: 1;
        overflow-y: auto;
        list-style: none;
        margin: 0;
        padding: 0;
        overflow-y: auto;
    }
    #filter-area {
        display: flex;
        width: 100%;
        align-items: center;
    }
    #filter-area > input {
        min-width: 0;
        width: auto;
        flex: 1;
        outline: none;
        font-size: 1.0rem;
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 3px;
        padding-bottom: 3px;
        border: 1px solid rgba(100, 100, 100, 0.8);
        border-radius: 2px;
    }
    
    #new-prop-area {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    #new-prop-area.open > #new-prop-form {
        display:flex;
    }

    #new-prop-form {
        display: none;
        flex-direction: column;
        width: 100%;
    }

    .row {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        margin-bottom: 1em;
    }

    h3 {
        padding: 0px;
        margin-bottom: 1em;
    }

    #new-prop-form > .row > * {
        margin-right: 16px;
        padding-left: 8px;
        padding-right: 8px;
    }
    #new-prop-form input {
        outline: none;
        border: 1px solid transparent;
        border-bottom: 1px solid rgba(100, 100, 100, 0.7);
        font-family: monospace;
        padding: 6px;
    }

    #new-prop-name:invalid {
        border-bottom: 1px solid red;
    }
    
    select {
        font-size: 1em;
    }
    #add-prop-dropdown-control {
        align-items: center;
        user-select: none;
    }

    #add-prop-dropdown-control:hover,
    #add-prop-dropdown-control label {
        cursor: pointer;
    }

    #caret-button {
        position: relative;
        width: 1.5em;
        height: 1.5em;
        transform: rotate(0deg);
        transition: transform 0.1s linear;
    }

    #caret-button > svg {
        width: 100%;
        height: 100%;
    }
    #new-prop-area.open #caret-button {
        transform: rotate(90deg);
        transition: transform 0.1s linear;
    }

</style>
<div id="new-prop-area">
    <div class="row" id="add-prop-dropdown-control">
        <h3><label for="caret-button">Add New Property</label></h3>
        <div id="caret-button">${caretRightIcon}</div>
    </div>
    <div id="new-prop-form">
        <div class="row">
            <label for="new-prop-name">Property Name </label>
            <input type="text" id="new-prop-name" placeholder="property-name" pattern="[a-z\\-]{3,64}"/>
        </div>
        <div class="row">
            <label for="default-val-select">Default value type</label>
            <select id="default-val-select">
                <option value="" selected>None</option>
                <option value="string">Text</option>
                <option value="number">Number</option>
                <option value="boolean">True or False</option>
            </select>
        </div>
        <div class="row">
            <label for="default-value">Default value </label>
            <input type="text" id="default-value" placeholder="Default value" disabled/>
        </div>
        <div class="row" id="submit-control">
            <button id="submit-prop">Create</button>
        </div>
    </div>
</div>
<div id="filter-area">
    <input type="text" id="filter-input" name="filter-input" placeholder="Filter..."/>
    <button id="clear">Clear</button>
</div>
<ul id="props-list">
    <slot></slot>
</ul>
`;

class EditorCustomList extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Bound methods
        this.render = this.render.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onDefaultNewTypeChange = this.onDefaultNewTypeChange.bind(this);
        this.onCaretClick = this.onCaretClick.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onFilterInput = this.onFilterInput.bind(this);
        this.onFilterClearClick = this.onFilterClearClick.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.newPropTypeSelect = this._shadowRoot.getElementById('default-val-select');
            this.newPropNameInput = this._shadowRoot.getElementById('new-prop-name');
            this.newPropDefaultValue = this._shadowRoot.getElementById('default-value');
            this.addPropControl = this._shadowRoot.getElementById('add-prop-dropdown-control');
            this.newPropForm = this._shadowRoot.getElementById('new-prop-form');
            this.createButton = this._shadowRoot.getElementById('submit-prop');
            this.clearButton = this._shadowRoot.getElementById('clear');
            this.filterInput = this._shadowRoot.getElementById('filter-input');
            
            // Add listeners
            this.addPropControl.addEventListener('click', this.onCaretClick);
            this.createButton.addEventListener('click', this.onCreateSubmit);
            this.filterInput.addEventListener('input', this.onFilterInput);
            this.clearButton.addEventListener('click', this.onFilterClearClick);
        }
    }

    render(aModel){
        this.model = aModel;

        // Clear any main dom children
        this.innerHTML = "";

        // Create a sorted copy of the property
        // objects
        let customProps = this.model.partProperties.getPropertyNamed(
            this.model,
            'custom-properties'
        );

        // Create a sorted list of the custom properties
        // available
        this.propList = Object.values(customProps)
            .sort((first, second) => {
                return first.name.localeCompare(second.name);
            });

        // Render the property items and insert them
        this.propList.forEach(propObject => {
            let el = document.createElement('editor-prop-item');
            el.setProperty(propObject, this.model);
            el.setAttribute('name', propObject.name);
            this.appendChild(el);
        });

        // Set up event listeners
        this.newPropTypeSelect.removeEventListener('change', this.onDefaultNewTypeChange);
        this.newPropTypeSelect.addEventListener('change', this.onDefaultNewTypeChange);
    }

    onDefaultNewTypeChange(event){
        let option = event.target.selectedOptions[0];
        switch(option.value){
        case 'string':
            this.newPropDefaultValue.setAttribute('type', 'text');
            this.newPropDefaultValue.setAttribute('value', "");
            break;
        case 'number':
            this.newPropDefaultValue.setAttribute('type', 'number');
            this.newPropDefaultValue.setAttribute('value', 0);
            break;
        case 'boolean':
            this.newPropDefaultValue.setAttribute('type', 'checkbox');
            break;
        default:
            this.newPropDefaultValue.setAttribute('type', 'text');
        }

        if(option.value == ""){
            this.newPropDefaultValue.setAttribute('disabled', true);
        } else {
            this.newPropDefaultValue.removeAttribute('disabled');
        }
    }

    onCaretClick(event){
        let newPropArea = this._shadowRoot.getElementById('new-prop-area');
        newPropArea.classList.toggle('open');
    }

    onCreateSubmit(event){
        if(this.model){
            let propName = this.newPropNameInput.value;
            let defaultValue = this.newPropDefaultValue.value;
            if(this.newPropDefaultValue.type == 'checkbox'){
                defaultValue = this.newPropDefaultValue.checked;
            } else if(this.newPropDefaultValue.type == 'number'){
                defaultValue = parseFloat(this.newPropDefaultValue.value);
            }

            // Send the property create message
            this.model.sendMessage({
                type: 'command',
                commandName: 'newProperty',
                args: [
                    propName,
                    this.model.id
                ]
            }, this.model);

            // Set the created prop to the default
            // value
            this.model.partProperties.setPropertyNamed(
                this.model,
                propName,
                defaultValue
            );

            // Re-render this pane
            this.resetForm();
            this.render(this.model);
        }
    }

    filterBy(text){
        // Find all of the prop item elements whose
        // property name does *not* include the substring,
        // and set those to not display
        let allElements = Array.from(this.querySelectorAll('editor-prop-item'));
        allElements.forEach(propEl => {
            let name = propEl.getAttribute('name');
            if(name.toLowerCase().includes(text)){
                propEl.classList.remove('item-hidden');
            } else {
                propEl.classList.add('item-hidden');
            }
        });
    }

    onFilterInput(event){
        this.filterBy(event.target.value.toLowerCase());
    }

    onFilterClearClick(event){
        this.filterInput.value = "";
        this.filterBy("");
    }

    resetForm(){
        this.newPropNameInput.value = null;
        this.newPropDefaultValue.value = null;
        if(this.newPropDefaultValue.type == 'checked'){
            this.newPropDefaultValue.checked = false;
        }
        this.newPropDefaultValue.type = 'text';
        this.newPropDefaultValue.setAttribute('disabled', true);
        this.newPropTypeSelect.selectedIndex = 0;
    }
};




/***/ }),

/***/ "./js/objects/views/editors/EditorLocationInfo.js":
/*!********************************************************!*\
  !*** ./js/objects/views/editors/EditorLocationInfo.js ***!
  \********************************************************/
/*! exports provided: EditorLocationInfo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorLocationInfo", function() { return EditorLocationInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorLocationInfo; });
/* harmony import */ var _ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../ohm/interpreter-semantics.js */ "./js/ohm/interpreter-semantics.js");
/* harmony import */ var _utils_subparts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/subparts.js */ "./js/objects/views/editors/utils/subparts.js");



// PREAMBLE
const arrowLeftIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="5" y1="12" x2="19" y2="12" />
  <line x1="5" y1="12" x2="9" y2="16" />
  <line x1="5" y1="12" x2="9" y2="8" />
</svg>
`;

const clipboardIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
  <rect x="9" y="3" width="6" height="4" rx="2" />
</svg>
`;

const templateString = `
<style>
    :host(.hidden){
        display: none;
    }
    .button-link {
        display: inline-flex;
        align-items: center;
        outline: none;
        border: none;
        border-bottom: 1px solid rgba(150, 150, 150, 0.3);
        transition: border 0.2s ease-out;
        vertical-alignment: center;
        background-color: transparent;
        padding: 0px;
        font-size: 1em;
    }

    .button-link:hover {
        cursor: pointer;
        border-bottom: 1px solid rgba(150, 150, 150, 0.7);
        transition: border 0.2s ease-out;
    }

    .button-link > svg {
        margin-left: 8px;
        opacity: 0.7;
        transform: translateX(0px);
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    }

    .button-link:hover > svg {
        opacity: 1.0;
        transform: translateX(-5px);
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    }
</style>
<p class="part-info">
    My <button id="owner-link" class="button-link" title=""><span></span>${arrowLeftIcon}</button> is named <span class="part-name"></span> and is located at <button id="location-link" class="button-link" title="Copy location"><span></span>${clipboardIcon}</button> <button id="id-link" class="button-link" title="Copy id"><span>Copy id</span>${clipboardIcon}</button>
</p>
`;

class EditorLocationInfo extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Accepted values for the kind attribute
        this.allowedKinds = ['stack', 'card', 'owner'];

        // define and bind methods
        this.getLocationStringFor = _utils_subparts_js__WEBPACK_IMPORTED_MODULE_1__["getLocationStringFor"].bind(this);
        this.onLocationLinkClick = _utils_subparts_js__WEBPACK_IMPORTED_MODULE_1__["onLocationLinkClick"].bind(this);

        // Bound methods
        this.handleStackKind = this.handleStackKind.bind(this);
        this.handleCardKind = this.handleCardKind.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.getAncestorOfTypeFor = this.getAncestorOfTypeFor.bind(this);
        this.getLocationViews = this.getLocationViews.bind(this);
        this.onLinkClick = this.onLinkClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    connectedCallback(){
        // Events
        let ownerLinkButton = this._shadowRoot.getElementById('owner-link');
        let locationLinkButton = this._shadowRoot.getElementById('location-link');
        let idLinkButton = this._shadowRoot.getElementById('id-link');
        ownerLinkButton.addEventListener('click', this.onLinkClick);
        locationLinkButton.addEventListener('click', this.onLocationClick);
        idLinkButton.addEventListener('click', this.onLocationClick);
        locationLinkButton.addEventListener('mouseenter', this.onMouseEnter);
        idLinkButton.addEventListener('mouseenter', this.onMouseEnter);
        locationLinkButton.addEventListener('mouseleave', this.onMouseLeave);
        idLinkButton.addEventListener('mouseleave', this.onMouseLeave);
    }

    disconnectedCallback(){
        let ownerLinkButton = this._shadowRoot.getElementById('owner-link');
        let locationLinkButton = this._shadowRoot.getElementById('location-link');
        let idLinkButton = this._shadowRoot.getElementById('id-link');
        locationLinkButton.removeEventListener('click', this.onLocationClick);
        idLinkButton.removeEventListener('click', this.onLocationClick);
        ownerLinkButton.removeEventListener('mouseenter', this.onMouseEnter);
        locationLinkButton.removeEventListener('mouseenter', this.onMouseEnter);
        idLinkButton.removeEventListener('mouseenter', this.onMouseEnter);
        locationLinkButton.removeEventListener('mouseleave', this.onMouseLeave);
        idLinkButton.removeEventListener('mouseleave', this.onMouseLeave);
    }

    render(aModel){
        this.model = aModel;
        let kind = this.getAttribute('kind');
        if(!kind || !this.allowedKinds.includes(kind)){
            this.classList.add('hidden');
            return;
        }
        if(this.model.type == 'world'){
            this.classList.add('hidden');
            return;
        }

        this.classList.remove('hidden');

        // Update element references
        this.ownerLinkButton = this._shadowRoot.getElementById('owner-link');
        this.ownerLinkTypeSpan = this.ownerLinkButton.querySelector('span');
        this.locationLinkButton = this._shadowRoot.getElementById('location-link');
        this.locationLinkSpan = this.locationLinkButton.querySelector('span');
        this.idLinkButton = this._shadowRoot.getElementById('id-link');
        this.idLinkSpan = this.idLinkButton.querySelector('span');
        this.nameSpan = this._shadowRoot.querySelector('p .part-name');

        if(kind == 'stack'){
            this.handleStackKind();
        } else if(kind =='card'){
            this.handleCardKind();
        } else {
            this.updateInfo();
        }
    }

    updateInfo(){
        let kind = this.getAttribute('kind');
        let ancestor = this.model._owner;
        if(kind == 'stack' || kind == 'card'){
            ancestor = this.getAncestorOfTypeFor(this.model, kind);
        }

        // If we cannot find an ancestor of the given
        // kind, then we hide this field
        if(!ancestor){
            this.classList.add('hidden');
            return;
        }

        // Update name span
        let ancestorName = ancestor.partProperties.getPropertyNamed(
            ancestor,
            'name'
        );
        if(!ancestorName){
            ancestorName = '(unnamed)';
        } else {
            ancestorName = `"${ancestorName}"`;
        }
        this.nameSpan.textContent = ancestorName;

        // Update kind span
        let kindLabel = kind[0].toUpperCase() + kind.slice(1);
        this.ownerLinkTypeSpan.textContent = kindLabel;

        // Update location link span
        this.locationLinkSpan.textContent = this.getLocationStringFor(ancestor);

        // Update button titles
        let editTitle = `Edit owning ${kindLabel}`;
        if(kind == 'owner'){
            editTitle = 'Edit Owner';
        }
        this.ownerLinkButton.setAttribute(
            'title',
            editTitle
        );

        // Add the ref-id attribute
        this.setAttribute('ref-id', ancestor.id);
    }

    handleStackKind(){
        if(this.model.type == 'stack' || this.model.type == 'world'){
            this.classList.add('hidden');
            return;
        }
        this.updateInfo();
    }

    handleCardKind(){
        if(this.model.type == 'card' || this.model.type == 'stack'){
            this.classList.add('hidden');
            return;
        }
        this.updateInfo();
    }

    getAncestorOfTypeFor(aPart, aType){
        let result;
        let currentOwner = aPart._owner;
        while(currentOwner){
            if(currentOwner.type == aType){
                result = currentOwner;
                break;
            }
            currentOwner = currentOwner._owner;
        }
        return result;
    }

    onLinkClick(event){
        let id = this.getAttribute('ref-id');
        if(id && this.model){
            // Re-render the editor on the Part
            // referenced by the found id
            let target = window.System.partsById[id];
            window.System.editor.render(target);
        }
    }

    onMouseEnter(event){
        this.getLocationViews(event).forEach((view) => {
            view.highlight("rgb(54, 172, 100)"); // green
        });
    }

    onMouseLeave(event){
        this.getLocationViews(event).forEach((view) => {
            view.unhighlight();
        });
    }

    getLocationViews(event){
        let targetId;
        let span = event.currentTarget.querySelector('span');
        if(span.parentElement.id == 'id-link'){
            targetId = this.getAttribute('ref-id');
        } else {
            let semantics = window.System.grammar.createSemantics();
            semantics.addOperation(
                'interpret',
                Object(_ohm_interpreter_semantics_js__WEBPACK_IMPORTED_MODULE_0__["default"])(window.System.partsById['world'], window.System)
            );
            let m = window.System.grammar.match(span.textContent, "ObjectSpecifier");
            try{
                targetId = semantics(m).interpret();
            } catch(e){
                console.log(`cannot locate ${span.textContent}`);
            }
        }
        return window.System.findViewsById(targetId);
    }
};




/***/ }),

/***/ "./js/objects/views/editors/EditorMessenger.js":
/*!*****************************************************!*\
  !*** ./js/objects/views/editors/EditorMessenger.js ***!
  \*****************************************************/
/*! exports provided: EditorMessenger, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorMessenger", function() { return EditorMessenger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorMessenger; });


// PREAMBLE
const templateString = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        font-family: 'Helvetica', sans-serif;
        font-size: 0.8rem;
    }
   
    textarea {
        resize: none;
        flex: 0.25;
    }
</style>
<h3>Send this <span></span> a Message:</h3>
<textarea placeholder="Type your Simpletalk message here..."></textarea>
<button>Send</button>
`;

class EditorMessenger extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Bound methods
        this.render = this.render.bind(this);
        this.onMessageFieldInput = this.onMessageFieldInput.bind(this);
        this.sendMessageFromText = this.sendMessageFromText.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.sendButton = this._shadowRoot.querySelector('button');
            this.sendButton.addEventListener('click', this.sendMessageFromText);
        
            this.messageField = this._shadowRoot.querySelector('textarea');
            this.messageField.addEventListener('input', this.onMessageFieldInput);
        }
    }

    disconnectedCallback(){
        this.messageField.removeEventListener('input', this.onMessageFieldInput);
        this.sendButton.removeEventListener('click', this.sendMessageFromText);
    }

    render(aModel){
        this.model = aModel;
        
        let partTypeLabel = this._shadowRoot.querySelector('h3 > span');
        partTypeLabel.textContent = this.model.type;
    }

    onMessageFieldInput(event){

    }

    sendMessageFromText(){
        let text = this.messageField.value;
        let script = `on doIt\n\t${text}\nend doIt`;
        this.model.sendMessage({
            type: 'compile',
            codeString: script,
            targetId: this.model.id
        }, this.model);
        this.model.sendMessage({
            type: 'command',
            commandName: 'doIt',
            args: [],
            shouldIgnore: true
        }, this.model);
    }
};




/***/ }),

/***/ "./js/objects/views/editors/EditorPropItem.js":
/*!****************************************************!*\
  !*** ./js/objects/views/editors/EditorPropItem.js ***!
  \****************************************************/
/*! exports provided: EditorPropItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorPropItem", function() { return EditorPropItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorPropItem; });
// PREAMBLE

const checkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <path d="M9 12l2 2l4 -4" />
</svg>
`;

const cancelIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <path d="M10 10l4 4m0 -4l-4 4" />
</svg>
`;

const templateString = `
<style>
    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px;
        padding-left: 8px;
        padding-right: 8px;
        margin-top: 6px;
    }
   
    li > label {
        flex: 1;
    }

    :host {
        width: 100%;
    }

    :host(.item-hidden) {
        display:none;
    }

    button {
        outline: none;
        border: 1px solid transparent;
        background-color: transparent;
        opacity: 1.0;
        transition: opacity 0.1s linear;
    }

    button:disabled {
        opacity: 0.05;
        transition: opacity: 0.1s linear;
    }

    button:hover {
        cursor: pointer;
    }

    button.button-hidden {
        display: none;
    }

    label {
        font-family: monospace;
    }

    input {
        border: 1px solid transparent;
        border-bottom: 1px solid rgba(100, 100, 100, 0.5);
        outline: none;
    }
    
    input:focus {
        border: 1px solid rgba(100, 100, 100, 0.8);
    }
</style>
<li>
    <label for="prop-value"></label>
    <input id="prop-value" name="prop-value"/>
    <button id="accept" disabled>${checkIcon}</button>
    <button id="cancel" disabled>${cancelIcon}</button>
</li>
`;

class EditorPropItem extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // By default, there is no property
        this.property = null;
        this.owner = null;

        // Bound methods
        this.render = this.render.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputInput = this.onInputInput.bind(this);
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onEnterKey = this.onEnterKey.bind(this);
        this.setupNumericInput = this.setupNumericInput.bind(this);
        this.enableButtons = this.enableButtons.bind(this);
        this.disableButtons = this.disableButtons.bind(this);
    }

    setProperty(aProperty, anOwner){
        // Remove any existing event handlers
        // TODO
        this.property = aProperty;
        this.owner = anOwner;

        // Update the element attributes
        this.setAttribute('name', this.property.name);
        this.setAttribute('owner-id', this.owner.id);

        // Add new event handlers

        // Render
        this.render();
        
    }

    connectedCallback(){
        if(this.isConnected){
            this.addEventListener('keypress', this.onEnterKey);
        }
    }

    disconnectedCallback(){
        this.removeEventListener('keypress', this.onEnterKey);
    }

    render(){
        this.labelElement = this._shadowRoot.querySelector('label');
        this.inputElement = this._shadowRoot.querySelector('input');
        this.acceptButton = this._shadowRoot.getElementById('accept');
        this.cancelButton = this._shadowRoot.getElementById('cancel');

        // Remove any hide classes
        this.acceptButton.classList.remove('button-hidden');
        this.cancelButton.classList.remove('button-hidden');
        
        // Remove any bound events
        this.inputElement.removeEventListener('input', this.onInputInput);
        this.inputElement.removeEventListener('change', this.onInputChange);
        this.acceptButton.removeEventListener('click', this.onAcceptClick);
        this.cancelButton.removeEventListener('click', this.onCancelClick);

        // Add new events
        this.inputElement.addEventListener('input', this.onInputInput);
        this.inputElement.addEventListener('change', this.onInputChange);
        this.acceptButton.addEventListener('click', this.onAcceptClick);
        this.cancelButton.addEventListener('click', this.onCancelClick);
        
        this.labelElement.textContent = `${this.property.name}:`;
        let currentVal = this.property.getValue(this.owner);
        if(currentVal == null || currentVal == undefined){
            // Do something different here
        } else if(typeof(currentVal) == 'number'){
            this.setupNumericInput();
        } else if(typeof(currentVal) == 'boolean'){
            this.inputElement.setAttribute('type', 'checkbox');
            this.inputElement.checked = currentVal;
            this.acceptButton.classList.add('button-hidden');
            this.cancelButton.classList.add('button-hidden');
        } else {
            this.inputElement.setAttribute('type', 'text');
        }

        this.inputElement.setAttribute('placeholder', currentVal);
        this.inputElement.value = currentVal;
    }

    setupNumericInput(){
        if(this.property.name.endsWith('-transparency')){
            this.inputElement.setAttribute('type', 'range');
            this.inputElement.setAttribute('step', '0.05');
            this.inputElement.setAttribute('min', '0.0');
            this.inputElement.setAttribute('max', '1.0');
        } else {
            this.inputElement.setAttribute('type', 'number');
        }
    }

    onInputChange(event){
        if(event.target.type == "checkbox"){
            this.owner.partProperties.setPropertyNamed(
                this.owner,
                this.property.name,
                event.target.checked
            );
        }
    }

    onInputInput(event){
        let inputType = event.target.getAttribute('type');
        if(inputType == 'range'){
            return this.onAcceptClick();
        }
        if(event.target.value !== this.property.getValue(this.owner)){
            this.enableButtons();
        } else {
            this.disableButtons();
        }
    }

    onEnterKey(event){
        if(event.key == 'Enter'){
            this.onAcceptClick();
        }
    }

    enableButtons(){
        this.acceptButton.removeAttribute('disabled');
        this.cancelButton.removeAttribute('disabled');
    }

    disableButtons(){
        this.acceptButton.setAttribute('disabled', true);
        this.cancelButton.setAttribute('disabled', true);
    }

    onAcceptClick(event){
        let value = this.inputElement.value;
        if(this.inputElement.type == 'number'){
            value = parseFloat(value);
            if(isNaN(value)){
                // if we can't parse the value just let it go through
                // as it might be a prop style keyword such as "fill"
                // TODO: we might want to limit this to a set of prop keywords
                value = this.inputElement.value;
            }
        } else if(this.inputElement.type == 'range'){
            value = parseFloat(value);
        } else if(this.inputElement.type == 'checkbox'){
            value = this.inputElement.checked;
        }
        this.owner.partProperties.setPropertyNamed(
            this.owner,
            this.property.name,
            value
        );
        this.disableButtons();
    }

    onCancelClick(event){
        this.inputElement.value = this.owner.partProperties.getPropertyNamed(
            this.owner,
            this.property.name
        );
        this.disableButtons();
    }
};




/***/ }),

/***/ "./js/objects/views/editors/EditorPropList.js":
/*!****************************************************!*\
  !*** ./js/objects/views/editors/EditorPropList.js ***!
  \****************************************************/
/*! exports provided: EditorPropList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorPropList", function() { return EditorPropList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorPropList; });
/* harmony import */ var _EditorPropItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditorPropItem.js */ "./js/objects/views/editors/EditorPropItem.js");


// PREAMBLE
window.customElements.define('editor-prop-item', _EditorPropItem_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

const templateString = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        font-family: 'Helvetica', sans-serif;
        font-size: 0.8rem;
    }

    #props-list {
        flex: 1;
        overflow-y: auto;
        list-style: none;
        margin: 0;
        padding: 0;
        overflow-y: auto;
    }
    #filter-area {
        display: flex;
        width: 100%;
        align-items: center;
    }
    #filter-area > input {
        min-width: 0;
        width: auto;
        flex: 1;
        outline: none;
        font-size: 1.0rem;
        padding-left: 6px;
        padding-right: 6px;
        padding-top: 3px;
        padding-bottom: 3px;
        border: 1px solid rgba(100, 100, 100, 0.8);
        border-radius: 2px;
    }
</style>
<div id="filter-area">
    <input type="text" id="filter-input" name="filter-input" placeholder="Filter..."/>
    <button id="clear">Clear</button>
</div>
<ul id="props-list">
    <slot></slot>
</ul>
`;

const specialProps = [
    'cssStyle',
    'cssTextStyle',
    'id',
    'name',
    'target',
    'events',
    'current',
    'script',
    'custom-properties'
];

class EditorPropList extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Bound methods
        this.render = this.render.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onFilterClearClick = this.onFilterClearClick.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.filterInputElement = this._shadowRoot.getElementById('filter-input');
            this.clearButton = this._shadowRoot.getElementById('clear');
            this.clearButton.addEventListener('click', this.onFilterClearClick);
        }
    }

    render(aModel){
        this.model = aModel;

        // Clear any existing main DOM children
        this.innerHTML = "";
        let inputEl = this._shadowRoot.getElementById('filter-input');
        inputEl.removeEventListener('input', this.onInput);
        inputEl.addEventListener('input', this.onInput);

        // Create a sorted copy of the property objects
        this.propList = this.model.partProperties.all.slice().filter(prop => {
                return !specialProps.includes(prop.name);
            });
        this.propList
            .sort((first, second) => {
            return first.name.localeCompare(second.name);
        });

        // Render the list item elements and insert them
        this.propList.forEach(propObject => {
            let el = document.createElement('editor-prop-item');
            el.setProperty(propObject, this.model);
            el.setAttribute('name', propObject.name);
            this.appendChild(el);
        });
    }

    filterBy(text){
        // Find all of the prop item elements whose
        // property name does *not* include the substring,
        // and set those to not display
        let allElements = Array.from(this.querySelectorAll('editor-prop-item'));
        allElements.forEach(propEl => {
            let name = propEl.getAttribute('name');
            if(name.toLowerCase().includes(text)){
                propEl.classList.remove('item-hidden');
            } else {
                propEl.classList.add('item-hidden');
            }
        });
    }

    onInput(event){
        this.filterBy(event.target.value.toLowerCase());
    }

    onFilterClearClick(event){
        this.filterInputElement.value = "";
        this.filterBy("");
    }
};




/***/ }),

/***/ "./js/objects/views/editors/EditorSubpartsPane.js":
/*!********************************************************!*\
  !*** ./js/objects/views/editors/EditorSubpartsPane.js ***!
  \********************************************************/
/*! exports provided: EditorSubpartsPane, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorSubpartsPane", function() { return EditorSubpartsPane; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorSubpartsPane; });
/* harmony import */ var _EditorLocationInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditorLocationInfo.js */ "./js/objects/views/editors/EditorLocationInfo.js");
/* harmony import */ var _utils_icons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/icons.js */ "./js/objects/utils/icons.js");
/* harmony import */ var _utils_subparts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/subparts.js */ "./js/objects/views/editors/utils/subparts.js");
// PREAMBLE




window.customElements.define('editor-location-info', _EditorLocationInfo_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

const clipboardIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
  <rect x="9" y="3" width="6" height="4" rx="2" />
</svg>
`;

const templateString = `
<style>
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        font-family: 'Helvetica', sans-serif;
        font-size: 0.8rem;
    }

    :host() > li {
        background-color: red;
    }

    .id-link,
    .location-link {
        display: inline-flex;
        align-items: center;
        outline: none;
        border: none;
        border-bottom: 1px solid rgba(150, 150, 150, 0.3);
        transition: border 0.2s ease-out;
        vertical-alignment: center;
        background-color: transparent;
        padding: 0px;
        font-size: 1em;
    }

    .id-link:hover,
    .location-link:hover {
        cursor: pointer;
        border-bottom: 1px solid rgba(150, 150, 150, 0.7);
        transition: border 0.2s ease-out;
    }

    .id-link > svg,
    .location-link > svg {
        margin-left: 8px;
        opacity: 0.7;
        transform: translateX(0px);
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    }

    .id-link:hover > svg,
    .location-link:hover > svg {
        opacity: 1.0;
        transform: translateX(-5px);
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    }

    section {
        display: flex;
        flex-direction: column;
        margin: 6px;
    }

    #button-area {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;'
    }

    #subparts-list-wrapper {
        flex: 1;
        overflow-y: hidden;
    }

    .hidden {
        display: none;
    }

    #subparts-area {
        flex: 1;
        list-style: none;
        font-family: 'Helvetica', sans-serif;
        padding: 0;
        margin: 0;
        margin-left: 32px;
        overflow-y: auto;
    }
</style>
<section id="button-area">
    <slot name="button"></slot>
</section>
<section id="location-area">
    <h3>Part Location and Owners</h3>
    <p class="part-info">
        I am located at <button class="location-link"><span></span>${clipboardIcon}</button>
        and my id is <button class="id-link"><span></span>${clipboardIcon}</button>
    </p>
    <slot name="ancestor-info"></slot>
</section>
<section id="subparts-list-wrapper">
    <h3>Subparts</h3>
    <ol id="subparts-area">
        <slot></slot>
    </ol>
</section>
`;

class EditorSubpartsPane extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // define and bind methods
        this.getLocationStringFor = _utils_subparts_js__WEBPACK_IMPORTED_MODULE_2__["getLocationStringFor"].bind(this);
        this.onLocationLinkClick = _utils_subparts_js__WEBPACK_IMPORTED_MODULE_2__["onLocationLinkClick"].bind(this);

        // Bound methods
        this.onAddSubpart = this.onAddSubpart.bind(this);
        this.onSubpartItemClick = this.onSubpartItemClick.bind(this);
        this.onSubpartItemMouseEnter = this.onSubpartItemMouseEnter.bind(this);
        this.onSubpartItemMouseLeave = this.onSubpartItemMouseLeave.bind(this);
        this.createAddPartButton = this.createAddPartButton.bind(this);
        this.createSubpartComponent = this.createSubpartComponent.bind(this);
        this.getLocationViews = this.getLocationViews.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.headerEl = this._shadowRoot.getElementById('location-area');
            this.myLocationArea = this.headerEl.querySelector('p');
            this.myLocationButton = this.myLocationArea.querySelector('.location-link');
            this.myIdButton = this.myLocationArea.querySelector('.id-link');

            // Add event listener to buttons
            this.myLocationButton.addEventListener('click', this.onLocationLinkClick);
            this.myIdButton.addEventListener('click', this.onLocationLinkClick);
        }
    }

    disconnectedCallback(){
        this.myLocationButton.removeEventListener('click', this.onLocationLinkClick);
        this.myIdButton.removeEventListener('click', this.onLocationLinkClick);
    }

    render(aModel){
        this.model = aModel;
        this.headerEl = this._shadowRoot.getElementById('location-area');

        // Clear any DOM children
        this.innerHTML = "";


        // Create location link elements
        // and also the self-location element
        let myLocationText = this.getLocationStringFor(this.model);
        this.myLocationButton.querySelector('span').textContent = myLocationText;
        this.myIdButton.querySelector('span').textContent = this.model.id.toString();
        if(this.model.type == 'world'){
            this.headerEl.classList.add('hidden');
        } else {
            this.headerEl.classList.remove('hidden');

            // Create the info elements
            ['stack', 'card', 'owner'].forEach(kind => {
                let infoEl = document.createElement('editor-location-info');
                infoEl.setAttribute('slot', 'ancestor-info');
                infoEl.setAttribute('kind', kind);
                infoEl.render(this.model);
                this.appendChild(infoEl);
            });
        }

        // Create the "add subpart" buttons for parts that are accepted by the
        // current Model part.
        this.model.acceptedSubpartTypes.forEach(partType => {
            let element = this.createAddPartButton(partType);
            this.appendChild(element);
        });

        let labelHeader = this._shadowRoot.querySelector('#subparts-list-wrapper > h3');
        if(this.model.subparts.length){
            labelHeader.textContent = "Current Subparts";
        } else {
            labelHeader.textContent = "There are no subparts";
        }

        this.model.subparts.forEach(subpart => {
            let element = this.createSubpartComponent(subpart);
            this.appendChild(element);
        });
    }

    createSubpartComponent(aPart){
        let wrapper = document.createElement('li');
        wrapper.classList.add('subpart-item');
        wrapper.setAttribute('ref-id', aPart.id);
        wrapper.addEventListener('click', this.onSubpartItemClick);
        wrapper.addEventListener('mouseenter', this.onSubpartItemMouseEnter);
        wrapper.addEventListener('mouseleave', this.onSubpartItemMouseLeave);

        // Add icon area an SVG for Part
        let iconArea = document.createElement('div');
        iconArea.classList.add('icon-display-area');
        let iconImage;
        if(Object.keys(_utils_icons_js__WEBPACK_IMPORTED_MODULE_1__["default"]).includes(aPart.type)){
            iconImage = _utils_icons_js__WEBPACK_IMPORTED_MODULE_1__["default"][aPart.type];
        } else {
            iconImage = _utils_icons_js__WEBPACK_IMPORTED_MODULE_1__["default"].generic;
        }
        iconArea.innerHTML = iconImage;
        wrapper.append(iconArea);

        // Add label, name, and id info
        let labelArea = document.createElement('h3');
        labelArea.textContent = `a ${aPart.type[0].toUpperCase()}${aPart.type.slice(1)}`;
        wrapper.append(labelArea);
        let name = aPart.partProperties.getPropertyNamed(
            aPart,
            'name'
        );
        if(name && name != ""){
            let nameArea = document.createElement('span');
            nameArea.classList.add('name-span');
            nameArea.textContent = `"${name}"`;
            wrapper.append(nameArea);
        }

        let idArea = document.createElement('span');
        idArea.classList.add('id-span');
        idArea.textContent = `(${aPart.id})`;
        wrapper.append(idArea);

        return wrapper;
    }

    createAddPartButton(aPartName){
        let button = document.createElement('button');
        let icon = _utils_icons_js__WEBPACK_IMPORTED_MODULE_1__["default"][aPartName];
        if(!icon){
            icon = _utils_icons_js__WEBPACK_IMPORTED_MODULE_1__["default"].generic;
        }
        button.setAttribute('slot', 'button');
        button.setAttribute('data-type', aPartName);
        button.setAttribute('title', `Add a ${aPartName} to this ${this.model.type}`);
        button.classList.add('add-part-button');
        button.addEventListener('click', this.onAddSubpart);
        button.innerHTML = icon;
        return button;
    }

    onSubpartItemClick(event){
        let id = event.currentTarget.getAttribute('ref-id');
        let targetPart = window.System.partsById[id];
        if(targetPart){
            window.System.editor.render(targetPart);
        }
    }

    onSubpartItemMouseEnter(event){
        this.getLocationViews(event).forEach((view) => {
            view.highlight("rgb(54, 172, 100)"); // green
        });
    }

    onSubpartItemMouseLeave(event){
        this.getLocationViews(event).forEach((view) => {
            view.unhighlight();
        });
    }

    onAddSubpart(event){
        let type = event.currentTarget.getAttribute('data-type');
        if(type){
            this.model.sendMessage({
                type: 'command',
                commandName: 'newModel',
                args: [
                    type,
                    this.model.id
                ]
            }, this.model);
        }
        this.render(this.model);
    }

    getLocationViews(event){
        let targetId = event.currentTarget.getAttribute('ref-id');
        let span = event.currentTarget.querySelector('span');
        return window.System.findViewsById(targetId);
    }
};




/***/ }),

/***/ "./js/objects/views/editors/EditorTab.js":
/*!***********************************************!*\
  !*** ./js/objects/views/editors/EditorTab.js ***!
  \***********************************************/
/*! exports provided: EditorTab, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorTab", function() { return EditorTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditorTab; });
// PREAMBLE

const templateString = `
<style>
    :host {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding: 6px;
        opacity: 0.5;
        border-bottom: 2px solid rgba(100, 100, 100, 0.7);
        transition: border 0.2s linear, opacity 0.2s linear;
        user-select: none;
    }

    :host([active="true"]){
        border-bottom: 2px solid rgba(200, 0, 0, 0.9);
        opacity: 1.0;
        transition: border 0.2s linear, opacity 0.2s linear;
    }

    :host(:hover){
        cursor: pointer;
    }
</style>
<span id="label">
    <slot></slot>
</span>
`;

class EditorTab extends HTMLElement {
    constructor(){
        super();

        // Setup template and shadow root
        const template = document.createElement('template');
        template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

        // Bound methods
        this.onClick = this.onClick.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            this.addEventListener('click', this.onClick);

            // If the tab is currently activated, emit
            // the tab-activaed message
            if(this.getAttribute('active') == "true"){
                let event = new CustomEvent("tab-activated", {
                    bubbles: true
                });
                this.dispatchEvent(event);
            }
        }
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.onClick);
    }

    onClick(event){
        let isActive = (this.getAttribute('active') == "true");
        if(!isActive){
            this.setAttribute('active', 'true');
            let event = new CustomEvent("tab-activated", {
                bubbles: true
            });
            this.dispatchEvent(event);
        }
    }
};




/***/ }),

/***/ "./js/objects/views/editors/utils/subparts.js":
/*!****************************************************!*\
  !*** ./js/objects/views/editors/utils/subparts.js ***!
  \****************************************************/
/*! exports provided: getLocationStringFor, onLocationLinkClick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocationStringFor", function() { return getLocationStringFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onLocationLinkClick", function() { return onLocationLinkClick; });
 const getLocationStringFor = (aPart) => {
        let result = "";
        let currentPart = aPart;
        let currentOwner = aPart._owner;
        while(currentOwner){
            let indexInParent = currentOwner.subparts.filter((subpart) => {
                return subpart.type == currentPart.type;
            }).indexOf(currentPart) + 1;
            result += `${currentPart.type} ${indexInParent} of `;
            currentPart = currentPart._owner;
            currentOwner = currentOwner._owner;
        }
        result += 'this world';
        return result;
}


const onLocationLinkClick = (event) => {
        let text = event.currentTarget.querySelector('span').textContent;
        let input = document.createElement('input');
        input.style.position = 'absolute';
        input.style.opacity = 0;
        document.body.append(input);
        let currentFocus = document.activeElement;
        input.focus();
        input.value = text;
        console.log(input.value);
        input.select();
        document.execCommand('copy');
        input.remove();
        currentFocus.focus();
}




/***/ }),

/***/ "./js/objects/views/navigator/CardRow.js":
/*!***********************************************!*\
  !*** ./js/objects/views/navigator/CardRow.js ***!
  \***********************************************/
/*! exports provided: CardRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardRow", function() { return CardRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CardRow; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PartView.js */ "./js/objects/views/PartView.js");
/**
 * Navigator Card Row
 * --------------------------------------------
 * I am a view on a given Stack that shows each
 * subpart card item as a wrapped lens view along
 * a row.
 */


const templateString = `
<style>
    :host {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
    }
</style>
<slot name="cards"></slot>
`;

class CardRow extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        this.wantsHalo = false;

        // Set up template
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            this.template.content.cloneNode(true)
        );

        // Bound methods
        this.initView = this.initView.bind(this);
        this.addWrappedCard = this.addWrappedCard.bind(this);
        this.handleCurrentChange = this.handleCurrentChange.bind(this);
        this.handlePartAdded = this.handlePartAdded.bind(this);
        this.handlePartRemoved = this.handlePartRemoved.bind(this);
        this.showInitially = this.showInitially.bind(this);
        this.onWrapperClick = this.onWrapperClick.bind(this);
    }

    afterConnected(){
        // we don't want the context menu to open in the nav since
        // it doens't make sense atm and will error
        this.removeEventListener('contextmenu', this.onContextMenuClick);
    }

    afterModelSet(){
        this.removeAttribute('part-id');
        this.setAttribute('card-id', this.model.id);
        this.onPropChange('current', this.handleCurrentChange);

        // Find the Stack Model's main view element.
        // We add the st-view-added/removed CustomEvent listeners
        // here so we can react only to direct stack additions
        // to the Stack (and not, say, to Windows or other nested kinds)
        let stackView = window.System.findViewById(this.model.id);
        stackView.addEventListener('st-view-added', this.handlePartAdded);
        stackView.addEventListener('st-view-removed', this.handlePartRemoved);
    }

    afterModelUnset(removedModel){
        let stackView = window.System.findViewById(removedModel.id);
        stackView.removeEventListener('st-view-added', this.handlePartAdded);
        stackView.removeEventListener('st-view-removed', this.handlePartRemoved);
    }

    handleCurrentChange(){
        if(!this.model.currentCard){
            return;
        }
        let wrappers = Array.from(this.querySelectorAll('wrapped-view'));
        wrappers.forEach(wrapper => {
            let wrappedId = wrapper.getAttribute('wrapped-id');
            if(wrappedId == this.model.currentCard.id.toString()){
                wrapper.classList.add('current');
            } else {
                wrapper.classList.remove('current');
            }
        });
    }

    handlePartAdded(event){
        // This handler is for the st-view-added
        // CustomEvent that is triggered by System when
        // newModel() has completed.
        if(event.detail.partType == 'card'){
            let cardPart = window.System.partsById[event.detail.partId];
            this.addWrappedCard(cardPart);
            this.showInitially();
        }
    }

    handlePartRemoved(event){
        if(event.detail.partType == 'card'){
            let wrappedView = this.querySelector(`wrapped-view[wrapped-id="${event.detail.partId}"]`);
            if(wrappedView){
                wrappedView.remove();
            }

            // Update number display of all wrapped views in the row
            Array.from(this.querySelectorAll(`wrapped-view`)).forEach(wrapper => {
                wrapper.updateNumberDisplay();
            });
        }
    }

    onWrapperClick(event){
        let wrapperIsCurrent = event.target.classList.contains('current');
        if(this.model && !wrapperIsCurrent){
            this.model.goToCardById(event.target.getAttribute('wrapped-id'));
        }
    }

    initView(){
        // First, we clear out any existing children
        this.innerHTML = "";

        // We iterate over each card of the stack and:
        // * Create a clone of the card view element;
        // * Attach the correct model;
        // * Set it to be a lensed view;
        // * Do the same for all children, recursively
        this.model.subparts.filter(subpart => {
            return subpart.type == 'card';
        }).forEach(cardPart => {
            this.addWrappedCard(cardPart);
        });

        // Update setting the current
        this.handleCurrentChange();
    }

    showInitially(){
        // Nothing for now
    }

    addWrappedCard(aCard){
        // Insert the lensed CardView into the wrapper
        let wrapper = document.createElement('wrapped-view');
        wrapper.setAttribute('slot', 'cards');
        wrapper.addEventListener('click', this.onWrapperClick);
        this.appendChild(wrapper);
        wrapper.setModel(aCard);
    }

    subpartOrderChanged(id, currentIndex, newIndex){
        let subpartNode = this.childNodes[currentIndex];
        if(!subpartNode){
            // this could be a model subpart which is not a card and hence not
            // displayed in the CardRow
            return;
        }
        if(newIndex == this.childNodes.length - 1){
            this.appendChild(subpartNode);
        } else {
            // we need to account for whether the index of this
            // is before or after the newIndex
            if(currentIndex < newIndex){
                newIndex = newIndex + 1;
            }
            let referenceNode = this.childNodes[newIndex];
            this.insertBefore(subpartNode, referenceNode);
        }
        // Update number display of all wrapped views in the row
        Array.from(this.querySelectorAll(`wrapped-view`)).forEach(wrapper => {
            wrapper.updateNumberDisplay();
        });
    }

};




/***/ }),

/***/ "./js/objects/views/navigator/Navigator.js":
/*!*************************************************!*\
  !*** ./js/objects/views/navigator/Navigator.js ***!
  \*************************************************/
/*! exports provided: STNavigator, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STNavigator", function() { return STNavigator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return STNavigator; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PartView.js */ "./js/objects/views/PartView.js");
/* harmony import */ var _WrappedView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WrappedView.js */ "./js/objects/views/navigator/WrappedView.js");
/* harmony import */ var _StackRow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StackRow.js */ "./js/objects/views/navigator/StackRow.js");
/* harmony import */ var _CardRow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CardRow.js */ "./js/objects/views/navigator/CardRow.js");
/**
 * SimpleTalk Navigator Webcomponent
 * ------------------------------------------
 * This is a standalone component that allows
 * authors to navigate the WorldStack and individual
 * Stacks therein using a convenient pop-out tray from
 * the bottom of the screen.
 **/





// Add any needed customElements
window.customElements.define('nav-stack-row', _StackRow_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
window.customElements.define('nav-card-row', _CardRow_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
window.customElements.define('wrapped-view', _WrappedView_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

const stackIcon = `
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-stack" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <polyline points="12 4 4 8 12 12 20 8 12 4"></polyline>
   <polyline points="4 12 12 16 20 12"></polyline>
   <polyline points="4 16 12 20 20 16"></polyline>
</svg>
`;

const cardIcon = `
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   class="icon icon-tabler icon-tabler-stack"
   width="50"
   height="20.833309"
   viewBox="0 0 24 9.9999884"
   stroke-width="2"
   stroke="currentColor"
   fill="none"
   stroke-linecap="round"
   stroke-linejoin="round"
   version="1.1"
   id="svg893">
  <metadata
     id="metadata899">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs
     id="defs897" />
  <path
     stroke="none"
     d="M -2.7669151,-1.2564948 H 21.233085 V 22.743505 H -2.7669151 Z"
     fill="none"
     id="path885" />
  <polyline
     points="12 4 4 8 12 12 20 8 12 4"
     id="polyline887"
     transform="translate(0,-3)" />
</svg>
`;

const templateString = `
<style>
    :host {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        bottom: 0;
        min-height: 271px;
        background-color: white;
        backdrop-filter: blur(4px);
        transition: transform 0.2s ease-out;
        padding: 20px;
        transform: translateY(100%);
        border-top: 1px solid rgba(50, 50, 50, 0.4);
        overflow-y: hidden;
        overflow-x: auto;
        z-index: 1000;
    }

    .nav-display-row {
        box-sizing: border-box;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 15px;
    }
    .nav-icon {
        color: gray;
        margin-right: 30px;
    }
</style>
<div id="stacks-display" class="nav-display-row">
    <div id="stack-icon" class="nav-icon">${stackIcon}</div>
    <slot name="stack-row"></slot>
</div>
<div id="cards-display" class="nav-display-row">
    <div id="card-icon" class="nav-icon">${cardIcon}</div>
    <slot name="card-row"></slot>
</div>
`;

class STNavigator extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();

        this.initialized = false;
        this.wantsHalo = false;

        // Set up template
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            this.template.content.cloneNode(true)
        );

        // Bound methods
        this.toggle = this.toggle.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleCurrentChange = this.handleCurrentChange.bind(this);
        this.handlePartAdded = this.handlePartAdded.bind(this);
        this.handlePartRemoved = this.handlePartRemoved.bind(this);
        this.createCardRowFor = this.createCardRowFor.bind(this);
    }

    afterConnected(){
        // we don't want the context menu to open in the nav since
        // it doens't make sense atm and will error
        this.removeEventListener('contextmenu', this.onContextMenuClick);
    }

    afterDisconnected(){
        let worldView = document.querySelector('st-world');
        worldView.removeEventListener('st-view-added', this.handlePartAdded);
        worldView.removeEventListener('st-view-removed', this.handlePartRemoved);
    }

    afterModelSet(){
        this.removeAttribute('part-id');

        // Respond to the System part-added CustomEvent
        let worldView = document.querySelector('st-world');
        worldView.addEventListener('st-view-added', this.handlePartAdded);
        worldView.addEventListener('st-view-removed', this.handlePartRemoved);

        // Add a StackRow view.
        this.stackRowEl = this.querySelector(':scope > nav-stack-row');
        if(!this.stackRowEl){
            this.stackRowEl = document.createElement('nav-stack-row');
            this.stackRowEl.setAttribute('slot', 'stack-row');
            this.appendChild(this.stackRowEl);
        }
        this.stackRowEl.setModel(this.model);

        // Create any needed CardRow views for all stacks
        // currently in the world
        this.model.subparts.filter(subpart => {
            return subpart.type == 'stack';
        }).forEach(stackPart => {
            this.createCardRowFor(stackPart);
        });

        // Init the StackRow
        this.stackRowEl.initView();
        
        // Update the current card/stack values
        this.handleCurrentChange();

        // Respond to eventual current-ness prop
        // changes from the WorldStack.
        this.onPropChange('current', this.handleCurrentChange);
    }

    handleCurrentChange(){
        // If we get here, this means that the current *stack* has changed.
        // So we need to find the correct CardRow for it and set it
        // to be the slotted one in the shadow DOM
        let currentStackId = this.model.currentStack.id.toString();
        Array.from(this.querySelectorAll('nav-card-row')).forEach(cardRow => {
            let rowId = cardRow.getAttribute('stack-id');
            cardRow.removeAttribute('slot');
            if(currentStackId == rowId){
                cardRow.setAttribute('slot', 'card-row');
                Array.from(cardRow.querySelectorAll('wrapped-view')).forEach(wrapper => {
                    wrapper.updateScaling();
                });
            }
        });
    }

    handlePartAdded(event){
        // If a new stack is added, we need to create
        // a new CardRow for it.
        if(event.detail.partType == 'stack'){
            let stackPart = window.System.partsById[event.detail.partId];
            this.createCardRowFor(stackPart);
        }
    }

    handlePartRemoved(event){
        // If a stack has been removed, we need to
        // remove the corresponding CardRow
        if(event.detail.partType == 'stack'){
            let cardRow = this.querySelector(`[stack-id="${event.detail.partId}"]`);
            if(cardRow){
                cardRow.remove();
            }
        }
    }

    createCardRowFor(aStack){
        let cardRow = document.createElement('nav-card-row');
        cardRow.setAttribute('stack-id', aStack.id);
        cardRow.setModel(aStack);
        this.appendChild(cardRow);
        cardRow.initView();
    }

    toggle(){
        this.classList.toggle('open');
        if(this.classList.contains('open')){
            this.open();
        } else {
            this.close();
        }
    }

    open(){
        this.style.transform = "translateY(0)";
    }

    close(){
        this.style.transform = "translateY(100%)";
    }

    
};




/***/ }),

/***/ "./js/objects/views/navigator/StackRow.js":
/*!************************************************!*\
  !*** ./js/objects/views/navigator/StackRow.js ***!
  \************************************************/
/*! exports provided: StackRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackRow", function() { return StackRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StackRow; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PartView.js */ "./js/objects/views/PartView.js");
/**
 * Navigator Stack Row
 * --------------------------------------------
 * I am a view on the WorldStack that shows each
 * subpart stack item as a wrapped lens view along
 * a row.
 */


const templateString = `
<style>
    :host {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
    }
</style>
<slot name="stacks"></slot>
`;

class StackRow extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();
        this.wantsHalo = false;

        // Set up template
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            this.template.content.cloneNode(true)
        );

        // Bound methods
        this.initView = this.initView.bind(this);
        this.addWrappedStack = this.addWrappedStack.bind(this);
        this.handleCurrentChange = this.handleCurrentChange.bind(this);
        this.handlePartAdded = this.handlePartAdded.bind(this);
        this.handlePartRemoved = this.handlePartRemoved.bind(this);
        this.showInitially = this.showInitially.bind(this);
        this.onWrapperClick = this.onWrapperClick.bind(this);
    }

    afterConnected(){
        // we don't want the context menu to open in the nav since
        // it doens't make sense atm and will error
        this.removeEventListener('contextmenu', this.onContextMenuClick);
    }


    afterModelSet(){
        this.removeAttribute('part-id');
        this.setAttribute('stack-id', this.model.id);
        this.onPropChange('current', this.handleCurrentChange);

        // Find the World Model's main view element.
        // We add the st-view-added CustomEvent listener
        // here so we can react only to direct stack additions
        // to the WorldStack (and not, say, to Windows or other nested kinds)
        let worldView = document.querySelector('st-world');
        worldView.addEventListener('st-view-added', this.handlePartAdded);
        worldView.addEventListener('st-view-removed', this.handlePartRemoved);
    }

    afterModelUnset(){
        let worldView = document.querySelector('st-world');
        worldView.removeEventListener('st-view-added', this.handlePartAdded);
        worldView.removeEventListener('st-view-removed', this.handlePartRemoved);
    }

    handleCurrentChange(){
        let currentId = this.model.currentStack.id;
        let wrappedViews = Array.from(
            this.querySelectorAll('wrapped-view')
        );
        wrappedViews.forEach(wrapper => {
            let wrappedId = wrapper.getAttribute('wrapped-id');
            if(wrappedId == this.model.currentStack.id.toString()){
                wrapper.classList.add('current');
            } else {
                wrapper.classList.remove('current');
            }
        });
    }

    handlePartAdded(event){
        // This handler is for the st-view-added
        // CustomEvent that is triggered by System when
        // newModel() has completed.
        if(event.detail.partType == 'stack'){
            let stackPart = window.System.partsById[event.detail.partId];
            this.addWrappedStack(stackPart);
            this.showInitially();
        }
    }

    handlePartRemoved(event){
        if(event.detail.partType == 'stack'){
            let wrappedView = this.querySelector(`wrapped-view[wrapped-id="${event.detail.partId}"]`);
            if(wrappedView){
                wrappedView.remove();
            }

            // Update numbers of remaining wrapped views in this StackRow
            Array.from(this.querySelectorAll('wrapped-view')).forEach(wrapper => {
                wrapper.updateNumberDisplay();
            });
        }
    }

    onWrapperClick(event){
        let wrapperIsCurrent = event.target.classList.contains('current');
        if(this.model && !wrapperIsCurrent){
            this.model.goToStackById(
                event.target.getAttribute('wrapped-id')
            );
        }
    }

    initView(){
        // Remove any existing wrapped views
        this.innerHTML = "";

        // We iterate over each corresponding Stack and:
        // * Create a clone of its view node;
        // * Attach the correct model;
        // * Set it to be a lensed view
        // * Do the same for all children, recursively
        this.model.subparts.filter(subpart => {
            return subpart.type == 'stack';
        }).forEach(stackPart => {
            this.addWrappedStack(stackPart);
        });

        // Setup the initial current-ness display
        this.handleCurrentChange();
    }

    showInitially(){
        // Nothing for now
    }

    addWrappedStack(aStack){  
        // Insert the lensed StackView into the wrapper
        let wrapper = document.createElement('wrapped-view');
        wrapper.setAttribute("slot", "stacks");
        wrapper.addEventListener('click', this.onWrapperClick);
        this.appendChild(wrapper);
        wrapper.setModel(aStack);
    }

    subpartOrderChanged(id, currentIndex, newIndex){
        let subpartNode = this.childNodes[currentIndex];
        if(!subpartNode){
            // this could be a model subpart which is not a stack and hence not
            // displayed in the StackRow
            return;
        }
        if(newIndex == this.childNodes.length - 1){
            this.appendChild(subpartNode);
        } else {
            // we need to account for whether the index of this
            // is before or after the newIndex
            if(currentIndex < newIndex){
                newIndex = newIndex + 1;
            }
            let referenceNode = this.childNodes[newIndex];
            this.insertBefore(subpartNode, referenceNode);
        }
        // Update number display of all wrapped views in the row
        Array.from(this.querySelectorAll(`wrapped-view`)).forEach(wrapper => {
            wrapper.updateNumberDisplay();
        });
    }
};




/***/ }),

/***/ "./js/objects/views/navigator/WrappedView.js":
/*!***************************************************!*\
  !*** ./js/objects/views/navigator/WrappedView.js ***!
  \***************************************************/
/*! exports provided: WrappedView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WrappedView", function() { return WrappedView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WrappedView; });
/* harmony import */ var _PartView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PartView.js */ "./js/objects/views/PartView.js");
/**
 * WrappedView Component
 * ---------------------------------------
 * I am a plain Webcomponent whose purpose is to
 * wrap a visual copy of an actual SimpleTalk View
 * element and display it in a scaled down format.
 * I make a cloned copy of the underlying view and
 * attach it to the same model as the original.
 **/


const templateString = `
<style>
    #number-display {
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        transition: opacity 0.2s ease-in;
        font-size: 2.2rem;
    }

    #number-display > span {
        transform: translateY(-10px);
        transition: transform 0.2s linear;
        pointer-events: none;
    }

    :host(:not(.current)) > #number-display {
        opacity: 0.8;
        background-color: rgba(200, 200, 200, 0.5);
        transition: opacity 0.2s ease-out;
        z-index: 1000;
    }

    :host(:not(.current)) > #number-display > span {
        transform: translateY(0px);
        transition: transform 0.2s linear;
    }
</style>
<div id="number-display">
    <span></span>
</div>
<slot name="wrapped-view"></slot>
`;


class WrappedView extends _PartView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(){
        super();
        this.wantsHalo = false;

        // Set up template and shadowDom
        this.template = document.createElement('template');
        this.template.innerHTML = templateString;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(
            this.template.content.cloneNode(true)
        );

        // Bind methods
        this.onChildSlotted = this.onChildSlotted.bind(this);
        this.updateScaling = this.updateScaling.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.addWrappedView = this.addWrappedView.bind(this);
        this._recursivelyUpdateLensViews = this._recursivelyUpdateLensViews.bind(this);
    }

    connectedCallback(){
        if(this.isConnected){
            // Bind a listener for the slot change.
            // This will be triggered whenever any
            // underlying element is slotted, so we
            // know to recompute the appropriate sizing
            // and styling
            let slotEl = this._shadowRoot.querySelector('slot');
            slotEl.addEventListener('slotchange', this.onChildSlotted);

            // we don't want the context menu to open in the nav since
            // it doens't make sense atm and will error
            this.removeEventListener('contextmenu', this.onContextMenuClick);
        }
    }

    disconnectedCallback(){
        let slotEl = this._shadowRoot.querySelector('slot');
        slotEl.removeEventListener('slotchange', this.onChildSlotted);
    }

    onChildSlotted(event){
        //this.updateScaling();
        //this.updateNumberDisplay();
    }

    afterModelSet(){
        this.onPropChange('number', this.handleNumberChange);
        this.removeAttribute('part-id');
        this.addWrappedView(this.model);
        this.updateNumberDisplay();
    }

    updateScaling(){
        let firstChild = this.children[0];
        // We need to find the element corresponding to the
        // actual view for the lens-ed part, in order to get
        // its current dimensions.
        let partId = firstChild.getAttribute('lens-part-id');
        let refElement = document.querySelector(`st-world`);
        let wrapBox = this.getBoundingClientRect();
        let innerBox = document.querySelector(`st-world`).getBoundingClientRect();
        let scalingX = (wrapBox.width / innerBox.width);
        let refElementBox = refElement.getBoundingClientRect();
        firstChild.style.width = `${refElementBox.width}px`;
        firstChild.style.height = `${refElementBox.height}px`;
        firstChild.style.transform = `scale(${scalingX})`;
        firstChild.style.transformOrigin = "0px 0px";
    }

    updateNumberDisplay(){
        let firstChild = this.children[0];
        let model = firstChild.model;
        // we only want to look at subparts of the same type (stack or card)
        let subparts = model._owner.subparts.filter((part) => {
            return model.type == part.type;
        });
        let numDisplay = this._shadowRoot.querySelector('#number-display > span');
        numDisplay.innerText = subparts.indexOf(model) + 1;
    }

    handleNumberChange(){
        // Update number display of all wrapped views in the row
        Array.from(this.parentNode.querySelectorAll(`wrapped-view`)).forEach(wrapper => {
            wrapper.updateNumberDisplay();
        });
    }

    addWrappedView(aPartModel){
        // First, clear out any existing
        // child elements
        this.innerHTML = "";

        // Create a lensed copy of the given
        // view and update key attributes on it
        let originalView = document.querySelector(`[part-id="${aPartModel.id}"]`);
        let lensedView = originalView.cloneNode(true);
        lensedView.setAttribute('lens-part-id', aPartModel.id);
        lensedView.setAttribute('slot', 'wrapped-view');
        lensedView.style.pointerEvents = "none";
        lensedView.wantsHalo = false;

        // Inline the initial scaling style properties.
        // We begin with an extremely small amount which will
        // be adjusted later during updateScaling();
        lensedView.style.transform = `scale(${0.001})`;
        lensedView.style.transformOrigin = "0px 0px";
        
        // Recursively create lens views of all subpart children
        // and append them in the correct places
        lensedView.isLensed = true;
        lensedView.setModel(aPartModel);
        lensedView.removeAttribute('part-id');
        if(lensedView.handleCurrentChange){
            lensedView.handleCurrentChange();
        }
        this._recursivelyUpdateLensViews(lensedView, aPartModel.id);

        // Insert the root lensed view into the wrapper
        this.setAttribute('wrapped-id', aPartModel.id);
        this.appendChild(lensedView);
        this.updateScaling();
    }

    _recursivelyUpdateLensViews(lensedView, anId){
        let subViews = Array.from(lensedView.children).filter(child => {
            return child.isPartView;
        });
        subViews.forEach(subView => {
            subView.isLensed = true;
            subView.wantsHalo = false;
            let subId = subView.getAttribute('part-id');
            subView.setAttribute('lens-part-id', subId);
            let model = window.System.partsById[subId];
            subView.setModel(model);
            subView.removeAttribute('part-id');
            this._recursivelyUpdateLensViews(subView, subId);
        });
    }

    /** PartView Overrides **/
    styleCSS(){
        // Do nothing
    }

    styleTextCSS(){
        // Do nothing
    }

    layoutChanged(){
        // Do nothing
    }
};




/***/ }),

/***/ "./js/ohm/interpreter-semantics.js":
/*!*****************************************!*\
  !*** ./js/ohm/interpreter-semantics.js ***!
  \*****************************************/
/*! exports provided: createInterpreterSemantics, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInterpreterSemantics", function() { return createInterpreterSemantics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createInterpreterSemantics; });
/* harmony import */ var _objects_ExecutionStack_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/ExecutionStack.js */ "./js/objects/ExecutionStack.js");


// Helpers
function findNearestParentOfKind(aPart, aPartType){
    let owner = aPart._owner;
    while(owner){
        if(owner.type == aPartType){
            return owner;
        }
        owner = owner._owner;
    }
    throw new Error(`'this' is a ${aPart.type}, not a ${aPartType} or does not have a parent of a ${aPartType}!`);
}

// check for possibleAncestor.acceptsSubpart(aPart.type)
// and if not go to owner and check again
function findFirstPossibleAncestor(aPart, aPartType){
    if(_subpartCheck(aPart, aPartType)){
        return aPart;
    } else {
        let owner = aPart._owner;
        while(owner){
            if(_subpartCheck(owner, aPartType)){
                return owner;
            }
            owner = owner._owner;
        }
    }
    throw new Error(`a ${aPart.type}, does not accept nor has any ancestors which accept part type ${aPartType}`);
}

function _subpartCheck(aPart, aPartType){
    if(aPartType == 'part'){
        return aPart.acceptedSubpartTypes.length > 0;
    }
    return aPart.acceptsSubpart(aPartType);
}

class STVariableReferenceError extends Error {
    constructor(...args){
        super(...args);
    }
};
Object.defineProperty(
    STVariableReferenceError.prototype,
    'name',
    {
        value: 'STVariableReferenceError'
    }
);

const createInterpreterSemantics = (partContext, systemContext) => {
    return {
        Script: function(scriptParts, _){
            return scriptParts.interpret();
        },
        MessageHandler: function(handlerOpen, lineTerm, optionalStatementList, handlerClose){
            let {messageName, parameters} = handlerOpen.interpret();
            let handlerFunction = function(senders, ...args){

                // In the grammar, the StatementList is
                // an optional rule, meaning the result of the rule
                // is an empty array (no statementlist) or a single
                // item array (the statementlist)
                if(optionalStatementList.children.length == 0){
                    return;
                }
                let statementList = optionalStatementList.children[0];

                // Next, we initialize a new ActivationContext
                // that will hold all variable information for
                // the execution of this handler.
                // We push it to the top of the current execution stack
                // and set the argument variables to locals
                args.forEach((argValue, index) => {
                    let argName = parameters[index];
                    systemContext.executionStack.current.setLocal(
                        argName,
                        argValue
                    );
                });

                // Because StatementList is both optional *and* made up
                // of iterable StatementLine rules (ie, 'StatementLine+' in grammar),
                // we need to "unwrap" these nodes without calling interpret() on them.
                // This ensures that expressions within the statements, like variable lookups,
                // are not called before any preceding statements have been interpreted and
                // the corresponding messages have already been sent. For example, statement 1 might
                // set a variable that statement 2 needs to lookup and use, so we want the lookup to
                // occur after statement 1 has been interpreted and the message for it has
                // been sent.
                statementList.children.forEach(statementLines => {
                    statementLines.children.forEach(statementLine => {
                        let message = statementLine.interpret();
                    });
                });
            };

            partContext._commandHandlers[messageName] = handlerFunction;
        },

        MessageHandlerOpen: function(literalOn, messageName, optionalParameterList){
            // Because the ParameterList here is optional, if
            // it is set it will be in the form of a size 1 array.
            // This single array item will itself be an array of the
            // parameter variable names.
            // Otherwise, an empty array indicates no params
            // are passed in for this handler
            let params = optionalParameterList.interpret();
            if(params.length > 0){
                params = params[0];
            }
            return {
                messageName: messageName.sourceString,
                parameters: params
            };
        },

        ParameterList: function(parameterString){
            return parameterString.asIteration().children.map(child => {
                return child.sourceString;
            });
        },


        InClause: function(inLiteral, objectSpecifier){
            return objectSpecifier.interpret();
        },

        Command_answer: function(answer, expression){
            let msg = {
                type: "command",
                commandName: "answer",
                args: [
                    expression.interpret()
                ]
            };
            return msg;
        },

        Command_goToDirection: function(goToLiteral, nextPrevious, systemObject){
            let args = [];
            args.push(nextPrevious.sourceString);
            if (systemObject.sourceString){
                args.push(systemObject.sourceString);
            }

            let msg = {
                type: "command",
                commandName: "go to direction",
                args: args
            };
            return msg;
        },

        Command_goToByObjectSpecifier: function(goToLiteral, objectSpecifier){
            let args = [
                objectSpecifier.interpret() // id of the object
            ];

            let msg = {
                type: "command",
                commandName: "go to",
                args: args
            };
            return msg;
        },

        Command_goToWebsite: function(goToLiteral, websiteLiteral, url){
            let args = [
                url.interpret()
            ];

            let msg = {
                type: "command",
                commandName: "go to website",
                args: args
            };
            return msg;
        },

        Command_addProperty: function(addLiteral, propertyLiteral, propNameAsLiteral, toLiteral, systemObject){
            let specifiedObjectId = systemObject.interpret()[0] || null;
            let args = [
                propNameAsLiteral.interpret(), // The property name
                specifiedObjectId
            ];

            let msg = {
                type: "command",
                commandName: "newProperty",
                args: args
            };
            return msg;
        },

        Command_addModel: function(addLiteral, newPartType, optionalPartName){
            // here no owner has been provided so we assume it is the first possible one
            let parent = findFirstPossibleAncestor(partContext, newPartType.sourceString);
            let args = [
                newPartType.sourceString,
                parent.id
            ];
            let optionalName = optionalPartName.interpret();
            if(optionalName && optionalName.length){
                args.push(optionalName[0]);
            }

            let msg = {
                type: "command",
                commandName: "newModel",
                args: args
            };
            return msg;
        },

        Command_addModelTo: function(addLiteral, newPartType, optionalPartName, toLiteral, objectSpecifier){
            let args = [
                newPartType.sourceString, // The kind of part to add
                objectSpecifier.interpret() // id of the parent model part
            ];

            let optionalName = optionalPartName.interpret();
            if(optionalName && optionalName.length){
                args.push(optionalName[0]);
            }

            let msg = {
                type: "command",
                commandName: "newModel",
                args: args
            };
            return msg;
        },

        Command_putVariable: function(putLiteral, value, intoLiteral, globalLiteral, destination){
            let global = false;
            if(globalLiteral.sourceString){
                global = true;
            };
            let args = [
                value.interpret(),
                destination.sourceString,
                global
            ];
            let msg = {
                type: "command",
                commandName: 'putInto',
                args
            };
            return msg;
        },

        Command_deleteProperty: function(deleteLiteral, propertyLiteral, propNameAsLiteral, fromLiteral, systemObject){
            let specifiedObjectId = systemObject.interpret()[0] || null;
            let args = [
                propNameAsLiteral.interpret(), // The property name
                specifiedObjectId
            ];

            let msg = {
                type: "command",
                commandName: "deleteProperty",
                args: args
            };
            return msg;
        },

        Command_deleteModel: function(deleteLiteral, objectSpecifier){
            let args = [
                objectSpecifier.interpret() // id of the object
            ];

            let msg = {
                type: "command",
                commandName: "deleteModel",
                args: args
            };
            return msg;
        },

        Command_setProperty: function(setLiteral, propNameAsLiteral, toLiteral, literalOrVarName, optionalInClause){
            let specifiedObjectId = optionalInClause.interpret()[0] || null;
            let args = [
                propNameAsLiteral.interpret(), // The property name
                literalOrVarName.interpret(), // The value or a var representing the value
                specifiedObjectId
            ];

            let msg = {
                type: "command",
                commandName: "setProperty",
                args: args
            };
            return msg;
        },

        Command_setSelection: function(setLiteral, selectionLiteral, propNameAsLiteral, toLiteral, literalOrVarName, optionalInClause){
            let specifiedObjectId = optionalInClause.interpret()[0] || null;
            let args = [
                propNameAsLiteral.interpret(), // The property name
                literalOrVarName.interpret(), // The value or a var representing the value
                specifiedObjectId
            ];

            let msg = {
                type: "command",
                commandName: "setSelection",
                args: args
            };
            return msg;
        },

        Command_ask: function(askLiteral, question){
            return {
                type: "command",
                commandName: "ask",
                args: [ question.interpret() ]
            };
        },

        Command_tellCommand: function(tellLiteral, objectSpecifier, toLiteral, command){
            return {
                type: 'command',
                commandName: 'tell',
                args: [
                    objectSpecifier.interpret(),
                    command.interpret()
                ]
            };
        },

        Command_arbitraryCommand: function(commandName, optionalArgumentList){
            // Because the argument list is optional here, it will
            // be either an empty array (no arguments) or a size 1
            // array (which itself will contain an array of the arguments)
            let optionalArguments = optionalArgumentList.interpret();
            if(optionalArguments.length > 0){
                optionalArguments = optionalArguments[0];
            }

            return {
                type: "command",
                commandName: commandName.sourceString,
                args: optionalArguments
            };
        },

        CommandArgumentList: function(list){
            return list.asIteration().interpret();
        },

        StatementLine: function(statement, newline){
            let message = statement.interpret();

            // Some statements, like if-then controls
            // and repeat controls, do not result in
            // messages but return null.
            // We ignore these.
            if(message && typeof(message) !== 'string'){
                let commandResult = partContext.sendMessage(message, partContext);
                systemContext.executionStack.current.setLocal('it', commandResult);
                return null;
            } else {
                return message;
            }
        },

        Statement: function(actualStatement, optionalComment){
            return actualStatement.interpret();
        },

        Expression_addExpr: function(firstExpression, operation, secondExpression){
            let first = firstExpression.interpret();
            let second = secondExpression.interpret();
            return first + second;
        },

        Expression_minusExpr: function(firstExpr, operation, secondExpr){
            let first = firstExpr.interpret();
            let second = secondExpr.interpret();
            return first - second;
        },

        Expression_divideExpr: function(firstExpr, operation, secondExpr){
            let first = firstExpr.interpret();
            let second = secondExpr.interpret();
            return first / second;
        },

        Expression_moduloDivideExpr: function(firstExpr, operation, secondExpr){
            let first = firstExpr.interpret();
            let second = secondExpr.interpret();
            return first % second;
        },

        Expression_timesExpr: function(firstExpression, operation, secondExpression){
            let first = firstExpression.interpret();
            let second = secondExpression.interpret();
            return first * second;
        },

        Expression_stringConcatExpr: function(firstExpression, operation, secondExpression){
            // When we encounter the "&" operator, we coerce both expressions into
            // a string
            let first = firstExpression.interpret().toString();
            let second = secondExpression.interpret().toString();
            return `${first}${second}`;
        },

        Factor_parenFactor: function(leftParen, expression, rightParen){
            return expression.interpret();
        },

        Factor_notFactor: function(notLiteral, expression){
            return !expression.interpret();
        },

        EqualityConditional: function(expr1, comparatorLiteral, expr2){
            let first = expr1.interpret();
            let second = expr2.interpret();
            return first === second;
        },

        NonEqualityConditional: function(expr1, comparatorLiteral, expr2){
            let first = expr1.interpret();
            let second = expr2.interpret();
            return first !== second;
        },

        Conditional_gtComparison: function(expr1, gtLiteral, expr2){
            let first = expr1.interpret();
            let second = expr2.interpret();
            return first > second;
        },

        Conditional_ltComparison: function(expr1, ltLiteral, expr2){
            let first = expr1.interpret();
            let second = expr2.interpret();
            return first < second;
        },

        Conditional_gteComparison: function(expr1, gteLiteral, expr2){
            let first = expr1.interpret();
            let second = expr2.interpret();
            return first >= second;
        },

        Conditional_lteComparison: function(expr1, lteLiteral, expr2){
            let first = expr1.interpret();
            let second = expr2.interpret();
            return first <= second;
        },

        ThereIsAnObjectConditional: function(thereLiteral, isLiteral, aOrAnLiteral, objectSpecifier){
            try{
                objectSpecifier.interpret();
                return true;
            } catch(e){
                return false;
            };
        },

        ThereIsNotAnObjectConditional: function(thereLiteral, isLiteral, notLiteral, aOrAnLiteral, inClause){
            try{
                objectSpecifier.interpret();
                return false;
            } catch(e){
                return true;
            };
        },

        ThereIsAPropertyConditional_withSpecifier: function(thereLiteral, isLiteral, aLiteral, propertyLiteral, propName, ofLiteral, objectSpecifier){
            let targetId = objectSpecifier.interpret();
            let target = systemContext.partsById[targetId];
            if(!target){
                throw new Error(`Could not find part with id ${targetId} (${this.sourceString})`);
            }
            let property = target.partProperties.findPropertyNamed(propName.interpret());
            if(property){
                return true;
            }
            return false;
        },

        ThereIsAPropertyConditional_withoutSpecifier: function(thereLiteral, isLiteral, aLiteral, propertyLiteral, propName){
            let property = partContext.partProperties.findPropertyNamed(propName.interpret());
            if(property){
                return true;
            }
            return false;
        },

        ThereIsNotAPropertyConditional_withSpecifier: function(thereLiteral, isLiteral, notLiteral, aLiteral, propertyLiteral, propName, ofLiteral, objectSpecifier){
            let targetId = objectSpecifier.interpret();
            let target = systemContext.partsById[targetId];
            if(!target){
                throw new Error(`Could not find part with id ${targetId} (${this.sourceString})`);
            }
            let property = target.partProperties.findPropertyNamed(propName.interpret());
            if(property){
                return false;
            }
            return true;
        },

        ThereIsNotAPropertyConditional_withoutSpecifier: function(thereLiteral, isLiteral, notLiteral, aLiteral, propLiteral, propName){
            let property = partContext.partProperties.findPropertyNamed(propName.interpret());
            if(property){
                return false;
            }
            return true;
        },

        IfThenInline: function(ifLiteral, conditional, thenLiteral, statement, optionalComment){
            let shouldEvaluate = conditional.interpret();
            if(shouldEvaluate){
                return statement.interpret();
            } else {
                return null;
            }
        },

        IfThenSingleline_withoutElse: function(ifLine, lineTerm1, thenLine){
            let condition = ifLine.interpret();
            if(condition){
                return thenLine.interpret();
            } else {
                return null;
            }
        },

        IfThenSingleline_withElse: function(ifLine, lineTerm1, thenLine, lineTerm2, elseLine){
            let condition = ifLine.interpret();
            if(condition){
                return thenLine.interpret();
            } else {
                return elseLine.interpret();
            }
        },

        IfThenMultiline_withElse: function(ifLine, lineTerm, multiThen, multiElse, endIfLine){
            let condition = ifLine.interpret();
            if(condition){
                return multiThen.interpret();
            } else {
                return multiElse.interpret();
            }
        },

        IfThenMultiline_withoutElse: function(ifLine, lineTerm, multiThen, endIfLine){
            let condition = ifLine.interpret();
            if(condition){
                return multiThen.interpret();
            }
            return null;
        },

        IfLine: function(ifLiteral, conditional, optionalComment){
            return conditional.interpret();
        },

        ThenLine: function(thenLiteral, statement, optionalComment){
            return statement.interpret();
        },

        ElseLine: function(elseLiteral, statement, optionalComment){
            return statement.interpret();
        },

        ControlStatementLine: function(statementLine){
            return statementLine.interpret();
        },

        MultiThen: function(thenLiteral, optionalComment, lintTerm, controlStatementLines){
            return controlStatementLines.interpret();
        },

        MultiElse: function(elseLiteral, optionalComment, lineTerm, controlStatementLines){
            return controlStatementLines.interpret();
        },

        KindConditional: function(expr1, comparatorLiteral, expr2){
            // TODO: Flesh out this function to account for
            // various object types and their kind comparisons
            return false;
        },

        NotKindConditional: function(expr1, comparatorLiteral, expr2){
            // TODO: Flesh out this function to account for
            // various object types and their kind comparisons
            return true;
        },

        RepeatControlForm_forNumTimes: function(repeatLit, optionalForLit, intOrVar, timesLit){
            return {
                repeatType: 'forNumTimes',
                numTimes: intOrVar.interpret()
            };
        },

        RepeatControlForm_untilCondition: function(repeatLit, untilLit, conditional){
            return {
                repeatType: 'untilCondition',
                condition: conditional
            };
        },

        RepeatControlForm_whileCondition: function(repeatLit, whileLit, conditional){
            return {
                repeatType: 'whileCondition',
                condition: conditional
            };
        },

        RepeatControlForm_withStartFinish: function(repeatLit, withLit, varName, eqLit, firstVal, toLit, secondVal){
            return {
                repeatType: 'withStartFinish',
                varName: varName.sourceString,
                start: firstVal.interpret(),
                finish: secondVal.interpret()
            };
        },

        RepeatAdjust_exit: function(_){
            return 'exit repeat';
        },

        RepeatAdjust_next: function(_){
            return 'next repeat';
        },

        RepeatBlock: function(repeatControl, lineTerm, statementLineOrRepAdjustPlus, endLiteral){
            let repeatInfo = repeatControl.interpret();
            let statementLines = statementLineOrRepAdjustPlus.children;
            switch(repeatInfo.repeatType){
            case 'forNumTimes':
                for(let i = 1; i <= repeatInfo.numTimes; i++){
                    let shouldBreak = false;
                    let shouldPass = false;
                    for(let j = 0; j < statementLines.length; j++){
                        let currentStatement = statementLines[j];
                        let result = currentStatement.interpret();
                        if(result == 'exit repeat'){
                            shouldBreak = true;
                            break; // break out of this inner loop
                        } else if(result == 'next repeat'){
                            shouldPass = true;
                            break; // break out of this inner loop
                        }
                    }
                    if(shouldPass){
                        i += 1;
                    }
                    if(shouldBreak){
                        break; // break out of the main for loop
                    }
                }
                break; // Break out of the switch
            case 'untilCondition':
                let untilTestCondition = repeatInfo.condition.interpret();
                while(!untilTestCondition){
                    let shouldBreak = false;
                    for(let i = 0; i < statementLines.length; i++){
                        let currentStatement = statementLines[i];
                        let result = currentStatement.interpret();
                        if(result){
                            if(result == 'exit repeat'){
                                shouldBreak = true;
                                break;
                            } else if(result == 'next repeat'){
                                break;
                            }
                        }
                    }
                    if(shouldBreak){
                        break; // break out of the outer while loop
                    }
                    untilTestCondition = repeatInfo.condition.interpret();
                }
                break; // Break out of the switch case
            case 'whileCondition':
                let whileTestCondition = repeatInfo.condition.interpret();
                while(whileTestCondition){
                    let shouldBreak = false;
                    for(let i = 0; i < statementLines.length; i++){
                        let currentStatement = statementLines[i];
                        let result = currentStatement.interpret();
                        if(result == 'exit repeat'){
                            shouldBreak = true;
                            break; // break out of this inner loop
                        } else if(result == "next repeat"){
                            break; // break out of this inner loop
                        }
                    }
                    if(shouldBreak){
                        break; // break out of outer while loop (end repeat)
                    }
                    whileTestCondition = repeatInfo.condition.interpret();
                }
                break; // break out of switch case
            case 'withStartFinish':
                // For now, we assume that start is less than
                // finish. We should probably throw an error if
                // otherwise
                if(repeatInfo.start > repeatInfo.finish){
                    throw new Error(`Repeat error: start greater than finish`);
                }

                for(let i = repeatInfo.start; i <= repeatInfo.finish; i++){
                    systemContext.executionStack.current.setLocal(repeatInfo.varName, i);
                    let shouldBreak = false;
                    let shouldPass = false;
                    for(let j = 0; j < statementLines.length; j++){
                        let currentStatement = statementLines[j];
                        let result = currentStatement.interpret();
                        if(result == "exit repeat"){
                            shouldBreak = true;
                            break; // break out of this inner loop
                        } else if(result == "next repeat"){
                            shouldPass = true;
                            break; // break out of this inner loop
                        }
                    }
                    if(shouldPass){
                        i += 1;
                    }
                    if(shouldBreak){
                        break; // break out of the outer (repeat) loop
                    }
                }
            }
            return null;
        },

        PropertyValue_withSpecifier: function(theLiteral, propName, ofLiteral, objectSpecifier){
            let targetId = objectSpecifier.interpret();
            let target = systemContext.partsById[targetId];
            if(!target){
                throw new Error(`Could not find part with id ${targetId} (${this.sourceString})`);
            }
            return target.partProperties.getPropertyNamed(
                target,
                propName.interpret()
            );
        },

        PropertyValue_withoutSpecifier: function(theLiteral, propName){
            return partContext.partProperties.getPropertyNamed(
                partContext,
                propName.interpret()
            );
        },

        /** Object Specifiers **/


        /**
         * The partByTarget Partial Specifier
         * refers to partials that specify a part
         * specified in the "target" PartProperty
         * of the context part. The value of the
         * target property is any valid ObjectSpecifier
         * string.
         */
        PartialSpecifier_partByTarget(targetLiteral){
            return (context) => {
                let targetPropValue = context.partProperties.getPropertyNamed(context, "target");
                // use the partContext since the context object might not have any semantics set on it
                // For example, a context object/part which does not have a script which has been
                // compiled will not have had context._semantics set.
                let semantics = partContext._semantics;
                let matchObject = systemContext.grammar.match(targetPropValue, 'ObjectSpecifier');
                let targetId = semantics(matchObject).interpret();
                return systemContext.partsById[targetId];
            };
        },

        /**
         * The currentCard Partial Specifier
         * refers to partials that specify the current card
         * depending on the stack context.
         */
        PartialSpecifier_currentCard: function(currentLiteral, cardLiteral){
            return function(contextPart){
                return contextPart.currentCard;
            };
        },

        /**
         * The partByIndex Partial Specifier
         * refers to partials that specify a part
         * type and an integer literal, for ex:
         *     field 3
         * The above example refers to the third
         * field part in its owner/parent part.
         */
        PartialSpecifier_partByIndex: function(objectType, integerLiteral){
            let index = integerLiteral.interpret();
            if(index < 1){
                throw new Error(`Part indices must be 1 or greater`);
            }
            return function(contextPart){
                if(objectType.sourceString == 'part'){
                    if(index > contextPart.subparts.length){
                        throw new Error(`${contextPart.type}[${contextPart.id}] does not have a part numbered ${index}`);
                    }
                    return contextPart.subparts[index-1];
                } else {
                    let partsOfType = contextPart.subparts.filter(subpart => {
                        return subpart.type == objectType.sourceString;
                    });
                    if(index > partsOfType.length){
                        throw new Error(`${contextPart.type}[${contextPart.id}] does not have a ${objectType.sourceString} numbered ${index}`);
                    }
                    return partsOfType[index-1];
                }
            };
        },

        /**
         * The partByNumericalIndex Partial Specifier
         * refers to partial that specify a part
         * type preceded by the English word for the
         * number. For the moment we accept first - tenth
         * Example:
         *     sixth button
         */
        PartialSpecifier_partByNumericalIndex: function(numericalKeyword, objectType){
            let index = numericalKeyword.interpret();
            return function(contextPart){
                if(objectType.sourceString == 'part'){
                    if(index > contextPart.subparts.length){
                        throw new Error(`${contextPart.type}[${contextPart.id}] does not have a part numbered ${index}`);
                    }
                    if(index < 0){
                        // An index of -1 indicates the "last"
                        // item of the desired collection was
                        // specified
                        return contextPart.subparts[contextPart.subparts.length - 1];
                    } else {
                        return contextPart.subparts[index-1];
                    }
                } else {
                    let partsOfType = contextPart.subparts.filter(subpart => {
                        return subpart.type == objectType.sourceString;
                    });
                    if(index > partsOfType.length){
                        throw new Error(`${contextPart.type}[${contextPart.id}] does not have a ${objectType.sourceString} numbered ${index}`);
                    }
                    if(index < 0){
                        // An index of -1 indicates the "last"
                        // item of the desired collection was
                        // specified
                        return partsOfType[partsOfType.length - 1];
                    } else {
                        return partsOfType[index-1];
                    }
                }
            };
        },

        /**
         * The partByName Partial Specifier
         * refers to a partial that specifies a part
         * by its name property. Example:
         *     card "My Custom Card"
         */
        PartialSpecifier_partByName: function(objectType, stringLiteral){
            let name = stringLiteral.interpret();
            if(objectType.sourceString == 'part'){
                return function(contextPart){
                    let found = contextPart.subparts.filter(subpart => {
                        let foundName = subpart.partProperties.getPropertyNamed(
                            subpart,
                            'name'
                        );
                        return name == foundName;
                    });
                    if(found.length){
                        return found[0];
                    }
                    throw new Error(`${contextPart.type}[${contextPart.id}] does not have a part named "${name}"`);
                };
            } else {
                return function(contextPart){
                    let found = contextPart.subparts.filter(subpart => {
                        return subpart.type == objectType.sourceString;
                    }).filter(subpart => {
                        let foundName = subpart.partProperties.getPropertyNamed(
                            subpart,
                            'name'
                        );
                        return foundName == name;
                    });
                    if(found.length){
                        return found[0];
                    }
                    throw new Error(`${contextPart.type}[${contextPart.id}] does not have a ${objectType.sourceString} named "${name}"`);
                };
            }
        },

        /**
         * The 'this' specifier is a terminal (final)
         * specifier that refers to one of three things:
         * 1. the type of the current part executing the script,
         *    example: this button
         * 2. Card, which refers to the card that owns the
         *    part that is currently executing the script, ex:
         *    this card
         * 3. Stack, which refers to the stack that owns the
         *    part that is currently executing the script, ex:
         *    this stack
         */
        TerminalSpecifier_thisSystemObject: function(thisLiteral, systemObject){
            let targetType = systemObject.sourceString;
            return function(contextPart){
                if(targetType == partContext.type){
                    return partContext;
                } else {
                    return findNearestParentOfKind(partContext, targetType);
                }
            };
        },

        /**
         * The 'current' specifier is a terminal (final)
         * specifier that refers to either the current card or stack
         * being displayed to the user.
         * There are only two possible valid options:
         *     `current card`
         *     `current stack`
         */
        TerminalSpecifier_currentSystemObject: function(currentLiteral, systemObject){
            let targetType = systemObject.sourceString;
            return function(contextPart){
                if(targetType == 'stack'){
                    return systemContext.getCurrentStackModel();
                } else if(targetType == 'card'){
                    return systemContext.getCurrentCardModel();
                } else {
                    throw new Error(`${targetType} cannot be a 'current' system object`);
                }
            };
        },

        /**
         * The partById specifier is a terminal (final)
         * specifier that refers to a given part type
         * by its unique system id. For any kind of part,
         * we use `part id <objectId>`
         * Examples: `card id 266` `part id 5`
         */
        TerminalSpecifier_partById: function(objectType, idLiteral, objectId){
            let id = objectId.sourceString;
            let found = systemContext.partsById[id];
            if(!found){
                throw new Error(`Cannot find ${objectType.sourceString} with id ${objectId}`);
            }
            return function(context){
                return found;
            };
        },

        /**
         * A "prefixed" queried specifier is just
         * a PartialSpecifier with "of" in front of it, indicating
         * that a different partial will precede it be queried inside of it.
         * Example `of button "My Button"`
         */
        QueriedSpecifier_prefixed: function(partialSpecifier, ofLiteral){
            return partialSpecifier.interpret();
        },

        /**
         * A nested queried specifier is one that has two
         * or more prefixed specifiers. The simplest would be
         * something like:
         *     `of card "My Card" of stack "Another named stack"`
         */
        QueriedSpecifier_nested: function(firstQuery, secondQuery){
            return function(contextPart){
                let inner = secondQuery.interpret()(contextPart);
                let outer = firstQuery.interpret()(inner);
                return outer;
            };
        },

        /**
         * An ObjectSpecifier without an annotated
         * rule means it was interpreted as just
         * a TerminalSpecifier of some sort.
         * However, we need to extract the id
         * and return that result, since that is what is
         * expected of all interpreted ObjectSpecifiers
         */
        ObjectSpecifier_singleTerminal: function(terminalSpecifier){
            let found = terminalSpecifier.interpret()();
            return found.id;
        },

        /**
         * A Compound with terminal specifier is a QueriedSpecifier
         * that finishes with a Terminal specifier.
         * Example: `of button 3 of card "Some named card" of current stack`
         */
        ObjectSpecifier_compoundQueryWithTerminal: function(queriedSpecifier, terminalSpecifier){
            // The terminal here is the ultimate part context
            let finalPart = terminalSpecifier.interpret()();
            let result = queriedSpecifier.interpret()(finalPart);
            return result.id;
        },

        /**
         * A Compound without terminal specifier is a QueriedSpecifier
         * that finishes with a Partial specifier.
         * Example: `of button 3 of first card` (which can continue `..of current stack` etc)
         * `first button of first area of stack 3`
         * `first button of area two of stack 3`
         */
        ObjectSpecifier_compoundQueryWithoutTerminal: function(queriedSpecifier, partialSpecifier){
            // if the partialSpecfier refers to either area, card or stack
            // then go to its owner for the context
            // if it refers to the current card then find the owner for the context
            let children = partialSpecifier.children[0].children;
            let systemObjectString;
            if(children[0].sourceString == "current" && children[1].sourceString == "card"){
                systemObjectString = "card";
            } else {
                children.forEach((child) => {
                    if(child.ctorName == "systemObject"){
                        systemObjectString = child.sourceString;
                    }
                });
            }
            let finalPart = findFirstPossibleAncestor(partContext, systemObjectString);
            let finalPartial = partialSpecifier.interpret()(finalPart);
            let result = queriedSpecifier.interpret()(finalPartial);
            return result.id;
        },

        /**
         * A single non-terminal ObjectSpecifier is just a Partial
         * specifier by itself. When present outside of a QueriedSpecifier,
         * it will be interpreted in the current context and treated
         * as terminal/final. For example:
         *     button 4
         * by itself as a whole specifier will be interpreted as
         * `button 4 of this card`
         */
        ObjectSpecifier_singleNonTerminal: function(partialSpecifier){
            // A single non-terminal object specifier is one
            // whose terminal object is implicitly assumed to
            // be the card or the stack in which the current context part
            // exists.
            let children = partialSpecifier.children[0].children;
            let systemObjectString;
            if(children[0].sourceString == "current" && children[1].sourceString == "card"){
                return systemContext.getCurrentCardModel().id;
            } else {
                children.forEach((child) => {
                    if(child.sourceString == "part" || child.sourceString == "target" || child.ctorName == 'systemObject'){
                        systemObjectString = child.sourceString;
                    }
                });
            }
            // the systemObject is the target (defined in it's "target" part property), then we need to
            // first get the target property value (string) and interpret that
            if(systemObjectString == "target"){
                let targetPropValue = partContext.partProperties.getPropertyNamed(partContext, "target");
                let semantics = partContext._semantics;
                let matchObject = systemContext.grammar.match(targetPropValue, 'ObjectSpecifier');
                let targetId = semantics(matchObject).interpret();
                return targetId;
            } else if(systemObjectString == "current card"){
                systemObjectString = "card";
            }
            let finalPart = findFirstPossibleAncestor(partContext, systemObjectString);
            let result = partialSpecifier.interpret()(finalPart);
            return result.id;
        },

        ObjectSpecifier_singleTerminal: function(terminalSpecifier){
            let result = terminalSpecifier.interpret()(partContext);
            return result.id;
        },

        anyLiteral: function(theLiteral){
            return theLiteral.interpret();
        },

        stringLiteral: function(openQuote, text, closeQuote){
            return text.sourceString;
        },

        booleanLiteral: function(text){
            if(text.sourceString == 'true'){
                return true;
            }
            if(text.sourceString == 'false'){
                return false;
            }
            throw new Error(`Invalid boolean literal: ${text}`);
        },

        integerLiteral: function(negativeSign, integer){
            let int = parseInt(integer.sourceString);
            let hasNegative = (negativeSign.sourceString == "-");
            if(hasNegative){
                return -1 * int;
            }
            return int; 
        },

        floatLiteral: function(negativeSign, onesPlace, decimal, restPlace){
            let floatString = `${onesPlace.sourceString}.${restPlace.sourceString}`;
            let hasNegative = (negativeSign.sourceString == "-");
            let result = parseFloat(floatString);
            if(hasNegative){
                return -1 * result;
            }
            return result;
        },

        numericalKeyword: function(numeralName){
            switch(numeralName.sourceString){
            case 'first':
                return 1;
            case 'second':
                return 2;
            case 'third':
                return 3;
            case 'fourth':
                return 4;
            case 'fifth':
                return 5;
            case 'sixth':
                return 6;
            case 'seventh':
                return 7;
            case 'eighth':
                return 8;
            case 'ninth':
                return 9;
            case 'tenth':
                return 10;
            }

            return -1;
        },

        variableName: function(letterPlus, optionalDigits){
            // Lookup the variable in the part's
            // current execution context
            // If the variable is not a key on the object,
            // we throw an error: this means the variable has not yet
            // been defined but is being looked up.
            let value = systemContext.executionStack.current.get(this.sourceString);
            if(value == undefined){
                throw new STVariableReferenceError(
                    `Variable ${this.sourceString} has not been defined`);
            }
            return value;
        },

        comment: function(dashesLiteral, nonLineTerminatorChars){
            // Interpret doesn't do anything
            // with comments.
            return null;
        },

        _terminal(){

        }
    };
};





/***/ }),

/***/ "./node_modules/ohm-js/dist/built-in-rules.js":
/*!****************************************************!*\
  !*** ./node_modules/ohm-js/dist/built-in-rules.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ohm = __webpack_require__(/*! .. */ "./node_modules/ohm-js/src/main.js");
module.exports = ohm.makeRecipe(["grammar",{"source":"BuiltInRules {\n\n  alnum  (an alpha-numeric character)\n    = letter\n    | digit\n\n  letter  (a letter)\n    = lower\n    | upper\n    | unicodeLtmo\n\n  digit  (a digit)\n    = \"0\"..\"9\"\n\n  hexDigit  (a hexadecimal digit)\n    = digit\n    | \"a\"..\"f\"\n    | \"A\"..\"F\"\n\n  ListOf<elem, sep>\n    = NonemptyListOf<elem, sep>\n    | EmptyListOf<elem, sep>\n\n  NonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  EmptyListOf<elem, sep>\n    = /* nothing */\n\n  listOf<elem, sep>\n    = nonemptyListOf<elem, sep>\n    | emptyListOf<elem, sep>\n\n  nonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  emptyListOf<elem, sep>\n    = /* nothing */\n\n}"},"BuiltInRules",null,null,{"alnum":["define",{"sourceInterval":[18,78]},"an alpha-numeric character",[],["alt",{"sourceInterval":[60,78]},["app",{"sourceInterval":[60,66]},"letter",[]],["app",{"sourceInterval":[73,78]},"digit",[]]]],"letter":["define",{"sourceInterval":[82,142]},"a letter",[],["alt",{"sourceInterval":[107,142]},["app",{"sourceInterval":[107,112]},"lower",[]],["app",{"sourceInterval":[119,124]},"upper",[]],["app",{"sourceInterval":[131,142]},"unicodeLtmo",[]]]],"digit":["define",{"sourceInterval":[146,177]},"a digit",[],["range",{"sourceInterval":[169,177]},"0","9"]],"hexDigit":["define",{"sourceInterval":[181,254]},"a hexadecimal digit",[],["alt",{"sourceInterval":[219,254]},["app",{"sourceInterval":[219,224]},"digit",[]],["range",{"sourceInterval":[231,239]},"a","f"],["range",{"sourceInterval":[246,254]},"A","F"]]],"ListOf":["define",{"sourceInterval":[258,336]},null,["elem","sep"],["alt",{"sourceInterval":[282,336]},["app",{"sourceInterval":[282,307]},"NonemptyListOf",[["param",{"sourceInterval":[297,301]},0],["param",{"sourceInterval":[303,306]},1]]],["app",{"sourceInterval":[314,336]},"EmptyListOf",[["param",{"sourceInterval":[326,330]},0],["param",{"sourceInterval":[332,335]},1]]]]],"NonemptyListOf":["define",{"sourceInterval":[340,388]},null,["elem","sep"],["seq",{"sourceInterval":[372,388]},["param",{"sourceInterval":[372,376]},0],["star",{"sourceInterval":[377,388]},["seq",{"sourceInterval":[378,386]},["param",{"sourceInterval":[378,381]},1],["param",{"sourceInterval":[382,386]},0]]]]],"EmptyListOf":["define",{"sourceInterval":[392,434]},null,["elem","sep"],["seq",{"sourceInterval":[438,438]}]],"listOf":["define",{"sourceInterval":[438,516]},null,["elem","sep"],["alt",{"sourceInterval":[462,516]},["app",{"sourceInterval":[462,487]},"nonemptyListOf",[["param",{"sourceInterval":[477,481]},0],["param",{"sourceInterval":[483,486]},1]]],["app",{"sourceInterval":[494,516]},"emptyListOf",[["param",{"sourceInterval":[506,510]},0],["param",{"sourceInterval":[512,515]},1]]]]],"nonemptyListOf":["define",{"sourceInterval":[520,568]},null,["elem","sep"],["seq",{"sourceInterval":[552,568]},["param",{"sourceInterval":[552,556]},0],["star",{"sourceInterval":[557,568]},["seq",{"sourceInterval":[558,566]},["param",{"sourceInterval":[558,561]},1],["param",{"sourceInterval":[562,566]},0]]]]],"emptyListOf":["define",{"sourceInterval":[572,614]},null,["elem","sep"],["seq",{"sourceInterval":[616,616]}]]}]);


/***/ }),

/***/ "./node_modules/ohm-js/dist/ohm-grammar.js":
/*!*************************************************!*\
  !*** ./node_modules/ohm-js/dist/ohm-grammar.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ohm = __webpack_require__(/*! .. */ "./node_modules/ohm-js/src/main.js");
module.exports = ohm.makeRecipe(["grammar",{"source":"Ohm {\n\n  Grammars\n    = Grammar*\n\n  Grammar\n    = ident SuperGrammar? \"{\" Rule* \"}\"\n\n  SuperGrammar\n    = \"<:\" ident\n\n  Rule\n    = ident Formals? ruleDescr? \"=\"  RuleBody  -- define\n    | ident Formals?            \":=\" OverrideRuleBody  -- override\n    | ident Formals?            \"+=\" RuleBody  -- extend\n\n  RuleBody\n    = \"|\"? NonemptyListOf<TopLevelTerm, \"|\">\n\n  TopLevelTerm\n    = Seq caseName  -- inline\n    | Seq\n\n  OverrideRuleBody\n    = \"|\"? NonemptyListOf<OverrideTopLevelTerm, \"|\">\n\n  OverrideTopLevelTerm\n    = \"...\"  -- superSplice\n    | TopLevelTerm\n\n  Formals\n    = \"<\" ListOf<ident, \",\"> \">\"\n\n  Params\n    = \"<\" ListOf<Seq, \",\"> \">\"\n\n  Alt\n    = NonemptyListOf<Seq, \"|\">\n\n  Seq\n    = Iter*\n\n  Iter\n    = Pred \"*\"  -- star\n    | Pred \"+\"  -- plus\n    | Pred \"?\"  -- opt\n    | Pred\n\n  Pred\n    = \"~\" Lex  -- not\n    | \"&\" Lex  -- lookahead\n    | Lex\n\n  Lex\n    = \"#\" Base  -- lex\n    | Base\n\n  Base\n    = ident Params? ~(ruleDescr? \"=\" | \":=\" | \"+=\")  -- application\n    | oneCharTerminal \"..\" oneCharTerminal           -- range\n    | terminal                                       -- terminal\n    | \"(\" Alt \")\"                                    -- paren\n\n  ruleDescr  (a rule description)\n    = \"(\" ruleDescrText \")\"\n\n  ruleDescrText\n    = (~\")\" any)*\n\n  caseName\n    = \"--\" (~\"\\n\" space)* name (~\"\\n\" space)* (\"\\n\" | &\"}\")\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n  ident  (an identifier)\n    = name\n\n  terminal\n    = \"\\\"\" terminalChar* \"\\\"\"\n\n  oneCharTerminal\n    = \"\\\"\" terminalChar \"\\\"\"\n\n  terminalChar\n    = escapeChar\n    | ~\"\\\\\" ~\"\\\"\" ~\"\\n\" any\n\n  escapeChar  (an escape sequence)\n    = \"\\\\\\\\\"                                     -- backslash\n    | \"\\\\\\\"\"                                     -- doubleQuote\n    | \"\\\\\\'\"                                     -- singleQuote\n    | \"\\\\b\"                                      -- backspace\n    | \"\\\\n\"                                      -- lineFeed\n    | \"\\\\r\"                                      -- carriageReturn\n    | \"\\\\t\"                                      -- tab\n    | \"\\\\u\" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape\n    | \"\\\\x\" hexDigit hexDigit                    -- hexEscape\n\n  space\n   += comment\n\n  comment\n    = \"//\" (~\"\\n\" any)* &(\"\\n\" | end)  -- singleLine\n    | \"/*\" (~\"*/\" any)* \"*/\"  -- multiLine\n\n  tokens = token*\n\n  token = caseName | comment | ident | operator | punctuation | terminal | any\n\n  operator = \"<:\" | \"=\" | \":=\" | \"+=\" | \"*\" | \"+\" | \"?\" | \"~\" | \"&\"\n\n  punctuation = \"<\" | \">\" | \",\" | \"--\"\n}"},"Ohm",null,"Grammars",{"Grammars":["define",{"sourceInterval":[9,32]},null,[],["star",{"sourceInterval":[24,32]},["app",{"sourceInterval":[24,31]},"Grammar",[]]]],"Grammar":["define",{"sourceInterval":[36,83]},null,[],["seq",{"sourceInterval":[50,83]},["app",{"sourceInterval":[50,55]},"ident",[]],["opt",{"sourceInterval":[56,69]},["app",{"sourceInterval":[56,68]},"SuperGrammar",[]]],["terminal",{"sourceInterval":[70,73]},"{"],["star",{"sourceInterval":[74,79]},["app",{"sourceInterval":[74,78]},"Rule",[]]],["terminal",{"sourceInterval":[80,83]},"}"]]],"SuperGrammar":["define",{"sourceInterval":[87,116]},null,[],["seq",{"sourceInterval":[106,116]},["terminal",{"sourceInterval":[106,110]},"<:"],["app",{"sourceInterval":[111,116]},"ident",[]]]],"Rule_define":["define",{"sourceInterval":[131,181]},null,[],["seq",{"sourceInterval":[131,170]},["app",{"sourceInterval":[131,136]},"ident",[]],["opt",{"sourceInterval":[137,145]},["app",{"sourceInterval":[137,144]},"Formals",[]]],["opt",{"sourceInterval":[146,156]},["app",{"sourceInterval":[146,155]},"ruleDescr",[]]],["terminal",{"sourceInterval":[157,160]},"="],["app",{"sourceInterval":[162,170]},"RuleBody",[]]]],"Rule_override":["define",{"sourceInterval":[188,248]},null,[],["seq",{"sourceInterval":[188,235]},["app",{"sourceInterval":[188,193]},"ident",[]],["opt",{"sourceInterval":[194,202]},["app",{"sourceInterval":[194,201]},"Formals",[]]],["terminal",{"sourceInterval":[214,218]},":="],["app",{"sourceInterval":[219,235]},"OverrideRuleBody",[]]]],"Rule_extend":["define",{"sourceInterval":[255,305]},null,[],["seq",{"sourceInterval":[255,294]},["app",{"sourceInterval":[255,260]},"ident",[]],["opt",{"sourceInterval":[261,269]},["app",{"sourceInterval":[261,268]},"Formals",[]]],["terminal",{"sourceInterval":[281,285]},"+="],["app",{"sourceInterval":[286,294]},"RuleBody",[]]]],"Rule":["define",{"sourceInterval":[120,305]},null,[],["alt",{"sourceInterval":[131,305]},["app",{"sourceInterval":[131,170]},"Rule_define",[]],["app",{"sourceInterval":[188,235]},"Rule_override",[]],["app",{"sourceInterval":[255,294]},"Rule_extend",[]]]],"RuleBody":["define",{"sourceInterval":[309,362]},null,[],["seq",{"sourceInterval":[324,362]},["opt",{"sourceInterval":[324,328]},["terminal",{"sourceInterval":[324,327]},"|"]],["app",{"sourceInterval":[329,362]},"NonemptyListOf",[["app",{"sourceInterval":[344,356]},"TopLevelTerm",[]],["terminal",{"sourceInterval":[358,361]},"|"]]]]],"TopLevelTerm_inline":["define",{"sourceInterval":[385,408]},null,[],["seq",{"sourceInterval":[385,397]},["app",{"sourceInterval":[385,388]},"Seq",[]],["app",{"sourceInterval":[389,397]},"caseName",[]]]],"TopLevelTerm":["define",{"sourceInterval":[366,418]},null,[],["alt",{"sourceInterval":[385,418]},["app",{"sourceInterval":[385,397]},"TopLevelTerm_inline",[]],["app",{"sourceInterval":[415,418]},"Seq",[]]]],"OverrideRuleBody":["define",{"sourceInterval":[422,491]},null,[],["seq",{"sourceInterval":[445,491]},["opt",{"sourceInterval":[445,449]},["terminal",{"sourceInterval":[445,448]},"|"]],["app",{"sourceInterval":[450,491]},"NonemptyListOf",[["app",{"sourceInterval":[465,485]},"OverrideTopLevelTerm",[]],["terminal",{"sourceInterval":[487,490]},"|"]]]]],"OverrideTopLevelTerm_superSplice":["define",{"sourceInterval":[522,543]},null,[],["terminal",{"sourceInterval":[522,527]},"..."]],"OverrideTopLevelTerm":["define",{"sourceInterval":[495,562]},null,[],["alt",{"sourceInterval":[522,562]},["app",{"sourceInterval":[522,527]},"OverrideTopLevelTerm_superSplice",[]],["app",{"sourceInterval":[550,562]},"TopLevelTerm",[]]]],"Formals":["define",{"sourceInterval":[566,606]},null,[],["seq",{"sourceInterval":[580,606]},["terminal",{"sourceInterval":[580,583]},"<"],["app",{"sourceInterval":[584,602]},"ListOf",[["app",{"sourceInterval":[591,596]},"ident",[]],["terminal",{"sourceInterval":[598,601]},","]]],["terminal",{"sourceInterval":[603,606]},">"]]],"Params":["define",{"sourceInterval":[610,647]},null,[],["seq",{"sourceInterval":[623,647]},["terminal",{"sourceInterval":[623,626]},"<"],["app",{"sourceInterval":[627,643]},"ListOf",[["app",{"sourceInterval":[634,637]},"Seq",[]],["terminal",{"sourceInterval":[639,642]},","]]],["terminal",{"sourceInterval":[644,647]},">"]]],"Alt":["define",{"sourceInterval":[651,685]},null,[],["app",{"sourceInterval":[661,685]},"NonemptyListOf",[["app",{"sourceInterval":[676,679]},"Seq",[]],["terminal",{"sourceInterval":[681,684]},"|"]]]],"Seq":["define",{"sourceInterval":[689,704]},null,[],["star",{"sourceInterval":[699,704]},["app",{"sourceInterval":[699,703]},"Iter",[]]]],"Iter_star":["define",{"sourceInterval":[719,736]},null,[],["seq",{"sourceInterval":[719,727]},["app",{"sourceInterval":[719,723]},"Pred",[]],["terminal",{"sourceInterval":[724,727]},"*"]]],"Iter_plus":["define",{"sourceInterval":[743,760]},null,[],["seq",{"sourceInterval":[743,751]},["app",{"sourceInterval":[743,747]},"Pred",[]],["terminal",{"sourceInterval":[748,751]},"+"]]],"Iter_opt":["define",{"sourceInterval":[767,783]},null,[],["seq",{"sourceInterval":[767,775]},["app",{"sourceInterval":[767,771]},"Pred",[]],["terminal",{"sourceInterval":[772,775]},"?"]]],"Iter":["define",{"sourceInterval":[708,794]},null,[],["alt",{"sourceInterval":[719,794]},["app",{"sourceInterval":[719,727]},"Iter_star",[]],["app",{"sourceInterval":[743,751]},"Iter_plus",[]],["app",{"sourceInterval":[767,775]},"Iter_opt",[]],["app",{"sourceInterval":[790,794]},"Pred",[]]]],"Pred_not":["define",{"sourceInterval":[809,824]},null,[],["seq",{"sourceInterval":[809,816]},["terminal",{"sourceInterval":[809,812]},"~"],["app",{"sourceInterval":[813,816]},"Lex",[]]]],"Pred_lookahead":["define",{"sourceInterval":[831,852]},null,[],["seq",{"sourceInterval":[831,838]},["terminal",{"sourceInterval":[831,834]},"&"],["app",{"sourceInterval":[835,838]},"Lex",[]]]],"Pred":["define",{"sourceInterval":[798,862]},null,[],["alt",{"sourceInterval":[809,862]},["app",{"sourceInterval":[809,816]},"Pred_not",[]],["app",{"sourceInterval":[831,838]},"Pred_lookahead",[]],["app",{"sourceInterval":[859,862]},"Lex",[]]]],"Lex_lex":["define",{"sourceInterval":[876,892]},null,[],["seq",{"sourceInterval":[876,884]},["terminal",{"sourceInterval":[876,879]},"#"],["app",{"sourceInterval":[880,884]},"Base",[]]]],"Lex":["define",{"sourceInterval":[866,903]},null,[],["alt",{"sourceInterval":[876,903]},["app",{"sourceInterval":[876,884]},"Lex_lex",[]],["app",{"sourceInterval":[899,903]},"Base",[]]]],"Base_application":["define",{"sourceInterval":[918,979]},null,[],["seq",{"sourceInterval":[918,963]},["app",{"sourceInterval":[918,923]},"ident",[]],["opt",{"sourceInterval":[924,931]},["app",{"sourceInterval":[924,930]},"Params",[]]],["not",{"sourceInterval":[932,963]},["alt",{"sourceInterval":[934,962]},["seq",{"sourceInterval":[934,948]},["opt",{"sourceInterval":[934,944]},["app",{"sourceInterval":[934,943]},"ruleDescr",[]]],["terminal",{"sourceInterval":[945,948]},"="]],["terminal",{"sourceInterval":[951,955]},":="],["terminal",{"sourceInterval":[958,962]},"+="]]]]],"Base_range":["define",{"sourceInterval":[986,1041]},null,[],["seq",{"sourceInterval":[986,1022]},["app",{"sourceInterval":[986,1001]},"oneCharTerminal",[]],["terminal",{"sourceInterval":[1002,1006]},".."],["app",{"sourceInterval":[1007,1022]},"oneCharTerminal",[]]]],"Base_terminal":["define",{"sourceInterval":[1048,1106]},null,[],["app",{"sourceInterval":[1048,1056]},"terminal",[]]],"Base_paren":["define",{"sourceInterval":[1113,1168]},null,[],["seq",{"sourceInterval":[1113,1124]},["terminal",{"sourceInterval":[1113,1116]},"("],["app",{"sourceInterval":[1117,1120]},"Alt",[]],["terminal",{"sourceInterval":[1121,1124]},")"]]],"Base":["define",{"sourceInterval":[907,1168]},null,[],["alt",{"sourceInterval":[918,1168]},["app",{"sourceInterval":[918,963]},"Base_application",[]],["app",{"sourceInterval":[986,1022]},"Base_range",[]],["app",{"sourceInterval":[1048,1056]},"Base_terminal",[]],["app",{"sourceInterval":[1113,1124]},"Base_paren",[]]]],"ruleDescr":["define",{"sourceInterval":[1172,1231]},"a rule description",[],["seq",{"sourceInterval":[1210,1231]},["terminal",{"sourceInterval":[1210,1213]},"("],["app",{"sourceInterval":[1214,1227]},"ruleDescrText",[]],["terminal",{"sourceInterval":[1228,1231]},")"]]],"ruleDescrText":["define",{"sourceInterval":[1235,1266]},null,[],["star",{"sourceInterval":[1255,1266]},["seq",{"sourceInterval":[1256,1264]},["not",{"sourceInterval":[1256,1260]},["terminal",{"sourceInterval":[1257,1260]},")"]],["app",{"sourceInterval":[1261,1264]},"any",[]]]]],"caseName":["define",{"sourceInterval":[1270,1338]},null,[],["seq",{"sourceInterval":[1285,1338]},["terminal",{"sourceInterval":[1285,1289]},"--"],["star",{"sourceInterval":[1290,1304]},["seq",{"sourceInterval":[1291,1302]},["not",{"sourceInterval":[1291,1296]},["terminal",{"sourceInterval":[1292,1296]},"\n"]],["app",{"sourceInterval":[1297,1302]},"space",[]]]],["app",{"sourceInterval":[1305,1309]},"name",[]],["star",{"sourceInterval":[1310,1324]},["seq",{"sourceInterval":[1311,1322]},["not",{"sourceInterval":[1311,1316]},["terminal",{"sourceInterval":[1312,1316]},"\n"]],["app",{"sourceInterval":[1317,1322]},"space",[]]]],["alt",{"sourceInterval":[1326,1337]},["terminal",{"sourceInterval":[1326,1330]},"\n"],["lookahead",{"sourceInterval":[1333,1337]},["terminal",{"sourceInterval":[1334,1337]},"}"]]]]],"name":["define",{"sourceInterval":[1342,1382]},"a name",[],["seq",{"sourceInterval":[1363,1382]},["app",{"sourceInterval":[1363,1372]},"nameFirst",[]],["star",{"sourceInterval":[1373,1382]},["app",{"sourceInterval":[1373,1381]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[1386,1418]},null,[],["alt",{"sourceInterval":[1402,1418]},["terminal",{"sourceInterval":[1402,1405]},"_"],["app",{"sourceInterval":[1412,1418]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[1422,1452]},null,[],["alt",{"sourceInterval":[1437,1452]},["terminal",{"sourceInterval":[1437,1440]},"_"],["app",{"sourceInterval":[1447,1452]},"alnum",[]]]],"ident":["define",{"sourceInterval":[1456,1489]},"an identifier",[],["app",{"sourceInterval":[1485,1489]},"name",[]]],"terminal":["define",{"sourceInterval":[1493,1531]},null,[],["seq",{"sourceInterval":[1508,1531]},["terminal",{"sourceInterval":[1508,1512]},"\""],["star",{"sourceInterval":[1513,1526]},["app",{"sourceInterval":[1513,1525]},"terminalChar",[]]],["terminal",{"sourceInterval":[1527,1531]},"\""]]],"oneCharTerminal":["define",{"sourceInterval":[1535,1579]},null,[],["seq",{"sourceInterval":[1557,1579]},["terminal",{"sourceInterval":[1557,1561]},"\""],["app",{"sourceInterval":[1562,1574]},"terminalChar",[]],["terminal",{"sourceInterval":[1575,1579]},"\""]]],"terminalChar":["define",{"sourceInterval":[1583,1640]},null,[],["alt",{"sourceInterval":[1602,1640]},["app",{"sourceInterval":[1602,1612]},"escapeChar",[]],["seq",{"sourceInterval":[1619,1640]},["not",{"sourceInterval":[1619,1624]},["terminal",{"sourceInterval":[1620,1624]},"\\"]],["not",{"sourceInterval":[1625,1630]},["terminal",{"sourceInterval":[1626,1630]},"\""]],["not",{"sourceInterval":[1631,1636]},["terminal",{"sourceInterval":[1632,1636]},"\n"]],["app",{"sourceInterval":[1637,1640]},"any",[]]]]],"escapeChar_backslash":["define",{"sourceInterval":[1683,1738]},null,[],["terminal",{"sourceInterval":[1683,1689]},"\\\\"]],"escapeChar_doubleQuote":["define",{"sourceInterval":[1745,1802]},null,[],["terminal",{"sourceInterval":[1745,1751]},"\\\""]],"escapeChar_singleQuote":["define",{"sourceInterval":[1809,1866]},null,[],["terminal",{"sourceInterval":[1809,1815]},"\\'"]],"escapeChar_backspace":["define",{"sourceInterval":[1873,1928]},null,[],["terminal",{"sourceInterval":[1873,1878]},"\\b"]],"escapeChar_lineFeed":["define",{"sourceInterval":[1935,1989]},null,[],["terminal",{"sourceInterval":[1935,1940]},"\\n"]],"escapeChar_carriageReturn":["define",{"sourceInterval":[1996,2056]},null,[],["terminal",{"sourceInterval":[1996,2001]},"\\r"]],"escapeChar_tab":["define",{"sourceInterval":[2063,2112]},null,[],["terminal",{"sourceInterval":[2063,2068]},"\\t"]],"escapeChar_unicodeEscape":["define",{"sourceInterval":[2119,2178]},null,[],["seq",{"sourceInterval":[2119,2160]},["terminal",{"sourceInterval":[2119,2124]},"\\u"],["app",{"sourceInterval":[2125,2133]},"hexDigit",[]],["app",{"sourceInterval":[2134,2142]},"hexDigit",[]],["app",{"sourceInterval":[2143,2151]},"hexDigit",[]],["app",{"sourceInterval":[2152,2160]},"hexDigit",[]]]],"escapeChar_hexEscape":["define",{"sourceInterval":[2185,2240]},null,[],["seq",{"sourceInterval":[2185,2208]},["terminal",{"sourceInterval":[2185,2190]},"\\x"],["app",{"sourceInterval":[2191,2199]},"hexDigit",[]],["app",{"sourceInterval":[2200,2208]},"hexDigit",[]]]],"escapeChar":["define",{"sourceInterval":[1644,2240]},"an escape sequence",[],["alt",{"sourceInterval":[1683,2240]},["app",{"sourceInterval":[1683,1689]},"escapeChar_backslash",[]],["app",{"sourceInterval":[1745,1751]},"escapeChar_doubleQuote",[]],["app",{"sourceInterval":[1809,1815]},"escapeChar_singleQuote",[]],["app",{"sourceInterval":[1873,1878]},"escapeChar_backspace",[]],["app",{"sourceInterval":[1935,1940]},"escapeChar_lineFeed",[]],["app",{"sourceInterval":[1996,2001]},"escapeChar_carriageReturn",[]],["app",{"sourceInterval":[2063,2068]},"escapeChar_tab",[]],["app",{"sourceInterval":[2119,2160]},"escapeChar_unicodeEscape",[]],["app",{"sourceInterval":[2185,2208]},"escapeChar_hexEscape",[]]]],"space":["extend",{"sourceInterval":[2244,2263]},null,[],["app",{"sourceInterval":[2256,2263]},"comment",[]]],"comment_singleLine":["define",{"sourceInterval":[2281,2327]},null,[],["seq",{"sourceInterval":[2281,2312]},["terminal",{"sourceInterval":[2281,2285]},"//"],["star",{"sourceInterval":[2286,2298]},["seq",{"sourceInterval":[2287,2296]},["not",{"sourceInterval":[2287,2292]},["terminal",{"sourceInterval":[2288,2292]},"\n"]],["app",{"sourceInterval":[2293,2296]},"any",[]]]],["lookahead",{"sourceInterval":[2299,2312]},["alt",{"sourceInterval":[2301,2311]},["terminal",{"sourceInterval":[2301,2305]},"\n"],["app",{"sourceInterval":[2308,2311]},"end",[]]]]]],"comment_multiLine":["define",{"sourceInterval":[2334,2370]},null,[],["seq",{"sourceInterval":[2334,2356]},["terminal",{"sourceInterval":[2334,2338]},"/*"],["star",{"sourceInterval":[2339,2351]},["seq",{"sourceInterval":[2340,2349]},["not",{"sourceInterval":[2340,2345]},["terminal",{"sourceInterval":[2341,2345]},"*/"]],["app",{"sourceInterval":[2346,2349]},"any",[]]]],["terminal",{"sourceInterval":[2352,2356]},"*/"]]],"comment":["define",{"sourceInterval":[2267,2370]},null,[],["alt",{"sourceInterval":[2281,2370]},["app",{"sourceInterval":[2281,2312]},"comment_singleLine",[]],["app",{"sourceInterval":[2334,2356]},"comment_multiLine",[]]]],"tokens":["define",{"sourceInterval":[2374,2389]},null,[],["star",{"sourceInterval":[2383,2389]},["app",{"sourceInterval":[2383,2388]},"token",[]]]],"token":["define",{"sourceInterval":[2393,2469]},null,[],["alt",{"sourceInterval":[2401,2469]},["app",{"sourceInterval":[2401,2409]},"caseName",[]],["app",{"sourceInterval":[2412,2419]},"comment",[]],["app",{"sourceInterval":[2422,2427]},"ident",[]],["app",{"sourceInterval":[2430,2438]},"operator",[]],["app",{"sourceInterval":[2441,2452]},"punctuation",[]],["app",{"sourceInterval":[2455,2463]},"terminal",[]],["app",{"sourceInterval":[2466,2469]},"any",[]]]],"operator":["define",{"sourceInterval":[2473,2538]},null,[],["alt",{"sourceInterval":[2484,2538]},["terminal",{"sourceInterval":[2484,2488]},"<:"],["terminal",{"sourceInterval":[2491,2494]},"="],["terminal",{"sourceInterval":[2497,2501]},":="],["terminal",{"sourceInterval":[2504,2508]},"+="],["terminal",{"sourceInterval":[2511,2514]},"*"],["terminal",{"sourceInterval":[2517,2520]},"+"],["terminal",{"sourceInterval":[2523,2526]},"?"],["terminal",{"sourceInterval":[2529,2532]},"~"],["terminal",{"sourceInterval":[2535,2538]},"&"]]],"punctuation":["define",{"sourceInterval":[2542,2578]},null,[],["alt",{"sourceInterval":[2556,2578]},["terminal",{"sourceInterval":[2556,2559]},"<"],["terminal",{"sourceInterval":[2562,2565]},">"],["terminal",{"sourceInterval":[2568,2571]},","],["terminal",{"sourceInterval":[2574,2578]},"--"]]]}]);


/***/ }),

/***/ "./node_modules/ohm-js/dist/operations-and-attributes.js":
/*!***************************************************************!*\
  !*** ./node_modules/ohm-js/dist/operations-and-attributes.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ohm = __webpack_require__(/*! .. */ "./node_modules/ohm-js/src/main.js");
module.exports = ohm.makeRecipe(["grammar",{"source":"OperationsAndAttributes {\n\n  AttributeSignature =\n    name\n\n  OperationSignature =\n    name Formals?\n\n  Formals\n    = \"(\" ListOf<name, \",\"> \")\"\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n}"},"OperationsAndAttributes",null,"AttributeSignature",{"AttributeSignature":["define",{"sourceInterval":[29,58]},null,[],["app",{"sourceInterval":[54,58]},"name",[]]],"OperationSignature":["define",{"sourceInterval":[62,100]},null,[],["seq",{"sourceInterval":[87,100]},["app",{"sourceInterval":[87,91]},"name",[]],["opt",{"sourceInterval":[92,100]},["app",{"sourceInterval":[92,99]},"Formals",[]]]]],"Formals":["define",{"sourceInterval":[104,143]},null,[],["seq",{"sourceInterval":[118,143]},["terminal",{"sourceInterval":[118,121]},"("],["app",{"sourceInterval":[122,139]},"ListOf",[["app",{"sourceInterval":[129,133]},"name",[]],["terminal",{"sourceInterval":[135,138]},","]]],["terminal",{"sourceInterval":[140,143]},")"]]],"name":["define",{"sourceInterval":[147,187]},"a name",[],["seq",{"sourceInterval":[168,187]},["app",{"sourceInterval":[168,177]},"nameFirst",[]],["star",{"sourceInterval":[178,187]},["app",{"sourceInterval":[178,186]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[191,223]},null,[],["alt",{"sourceInterval":[207,223]},["terminal",{"sourceInterval":[207,210]},"_"],["app",{"sourceInterval":[217,223]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[227,257]},null,[],["alt",{"sourceInterval":[242,257]},["terminal",{"sourceInterval":[242,245]},"_"],["app",{"sourceInterval":[252,257]},"alnum",[]]]]}]);


/***/ }),

/***/ "./node_modules/ohm-js/extras/VisitorFamily.js":
/*!*****************************************************!*\
  !*** ./node_modules/ohm-js/extras/VisitorFamily.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const assert = __webpack_require__(/*! ../src/common */ "./node_modules/ohm-js/src/common.js").assert;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Helpers

function getProp(name, thing, fn) {
  return fn(thing[name]);
}

function mapProp(name, thing, fn) {
  return thing[name].map(fn);
}

// Returns a function that will walk a single property of a node.
// `descriptor` is a string indicating the property name, optionally ending
// with '[]' (e.g., 'children[]').
function getPropWalkFn(descriptor) {
  const parts = descriptor.split(/ ?\[\]/);
  if (parts.length === 2) {
    return mapProp.bind(null, parts[0]);
  }
  return getProp.bind(null, descriptor);
}

function getProps(walkFns, thing, fn) {
  return walkFns.map(walkFn => walkFn(thing, fn));
}

function getWalkFn(shape) {
  if (typeof shape === 'string') {
    return getProps.bind(null, [getPropWalkFn(shape)]);
  } else if (Array.isArray(shape)) {
    return getProps.bind(null, shape.map(getPropWalkFn));
  } else {
    assert(typeof shape === 'function', 'Expected a string, Array, or function');
    assert(shape.length === 2, 'Expected a function of arity 2, got ' + shape.length);
    return shape;
  }
}

function isRestrictedIdentifier(str) {
  return /^[a-zA-Z_][0-9a-zA-Z_]*$/.test(str);
}

function trim(s) {
  return s.trim();
}

function parseSignature(sig) {
  const parts = sig.split(/[()]/).map(trim);
  if (parts.length === 3 && parts[2] === '') {
    const name = parts[0];
    let params = [];
    if (parts[1].length > 0) {
      params = parts[1].split(',').map(trim);
    }
    if (isRestrictedIdentifier(name) && params.every(isRestrictedIdentifier)) {
      return {name, formals: params};
    }
  }
  throw new Error('Invalid operation signature: ' + sig);
}

/*
  A VisitorFamily contains a set of recursive operations that are defined over some kind of
  tree structure. The `config` parameter specifies how to walk the tree:
  - 'getTag' is function which, given a node in the tree, returns the node's 'tag' (type)
  - 'shapes' an object that maps from a tag to a value that describes how to recursively
    evaluate the operation for nodes of that type. The value can be:
    * a string indicating the property name that holds that node's only child
    * an Array of property names (or an empty array indicating a leaf type), or
    * a function taking two arguments (node, fn), and returning an Array which is the result
      of apply `fn` to each of the node's children.
 */
function VisitorFamily(config) {
  this._shapes = config.shapes;
  this._getTag = config.getTag;

  this.Adapter = function(thing, family) {
    this._adaptee = thing;
    this._family = family;
  };
  this.Adapter.prototype.valueOf = function() {
    throw new Error('heeey!');
  };
  this.operations = {};

  this._arities = Object.create(null);
  this._getChildren = Object.create(null);

  const self = this;
  Object.keys(this._shapes).forEach(k => {
    const shape = self._shapes[k];
    self._getChildren[k] = getWalkFn(shape);

    // A function means the arity isn't fixed, so don't put an entry in the arity map.
    if (typeof shape !== 'function') {
      self._arities[k] = Array.isArray(shape) ? shape.length : 1;
    }
  });
  this._wrap = function(thing) { return new self.Adapter(thing, self); };
}

VisitorFamily.prototype.wrap = function(thing) {
  return this._wrap(thing);
};

VisitorFamily.prototype._checkActionDict = function(dict) {
  const self = this;
  Object.keys(dict).forEach(k => {
    assert(k in self._getChildren, "Unrecognized action name '" + k + "'");
    const action = dict[k];
    assert(typeof action === 'function', "Key '" + k + "': expected function, got " + action);
    if (k in self._arities) {
      const expected = self._arities[k];
      const actual = dict[k].length;
      assert(actual === expected,
          "Action '" + k + "' has the wrong arity: expected " + expected + ', got ' + actual);
    }
  });
};

VisitorFamily.prototype.addOperation = function(signature, actions) {
  const sig = parseSignature(signature);
  const name = sig.name;
  this._checkActionDict(actions);
  this.operations[name] = {
    name,
    formals: sig.formals,
    actions
  };

  const family = this;
  this.Adapter.prototype[name] = function() {
    const tag = family._getTag(this._adaptee);
    assert(tag in family._getChildren, "getTag returned unrecognized tag '" + tag + "'");
    assert(tag in actions, "No action for '" + tag + "' in operation '" + name + "'");

    // Create an "arguments object" from the arguments that were passed to this
    // operation / attribute.
    const args = Object.create(null);
    for (let i = 0; i < arguments.length; i++) {
      args[sig.formals[i]] = arguments[i];
    }

    const oldArgs = this.args;
    this.args = args;
    const ans = actions[tag].apply(this, family._getChildren[tag](this._adaptee, family._wrap));
    this.args = oldArgs;
    return ans;
  };
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = VisitorFamily;


/***/ }),

/***/ "./node_modules/ohm-js/extras/index.js":
/*!*********************************************!*\
  !*** ./node_modules/ohm-js/extras/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  VisitorFamily: __webpack_require__(/*! ./VisitorFamily */ "./node_modules/ohm-js/extras/VisitorFamily.js"),
  semanticsForToAST: __webpack_require__(/*! ./semantics-toAST */ "./node_modules/ohm-js/extras/semantics-toAST.js").semantics,
  toAST: __webpack_require__(/*! ./semantics-toAST */ "./node_modules/ohm-js/extras/semantics-toAST.js").helper
};


/***/ }),

/***/ "./node_modules/ohm-js/extras/semantics-toAST.js":
/*!*******************************************************!*\
  !*** ./node_modules/ohm-js/extras/semantics-toAST.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const pexprs = __webpack_require__(/*! ../src/pexprs */ "./node_modules/ohm-js/src/pexprs.js");
const MatchResult = __webpack_require__(/*! ../src/MatchResult */ "./node_modules/ohm-js/src/MatchResult.js");
const Grammar = __webpack_require__(/*! ../src/Grammar */ "./node_modules/ohm-js/src/Grammar.js");
const extend = __webpack_require__(/*! util-extend */ "./node_modules/util-extend/extend.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

const defaultOperation = {
  _terminal() {
    return this.primitiveValue;
  },

  _nonterminal(children) {
    const ctorName = this._node.ctorName;
    const mapping = this.args.mapping;

    // without customization
    if (!mapping.hasOwnProperty(ctorName)) {
      // intermediate node
      if (this._node instanceof pexprs.Alt || this._node instanceof pexprs.Apply) {
        return children[0].toAST(mapping);
      }

      // lexical rule
      if (this.isLexical()) {
        return this.sourceString;
      }

      // singular node (e.g. only surrounded by literals or lookaheads)
      const realChildren = children.filter(child => !child.isTerminal());
      if (realChildren.length === 1) {
        return realChildren[0].toAST(mapping);
      }

      // rest: terms with multiple children
    }

    // direct forward
    if (typeof mapping[ctorName] === 'number') {
      return children[mapping[ctorName]].toAST(mapping);
    }

    // named/mapped children or unnamed children ('0', '1', '2', ...)
    const propMap = mapping[ctorName] || children;
    const node = {
      type: ctorName
    };
    for (const prop in propMap) {
      const mappedProp = mapping[ctorName] && mapping[ctorName][prop];
      if (typeof mappedProp === 'number') {
        // direct forward
        node[prop] = children[mappedProp].toAST(mapping);
      } else if ((typeof mappedProp === 'string') || (typeof mappedProp === 'boolean') ||
          (mappedProp === null)) {
        // primitive value
        node[prop] = mappedProp;
      } else if ((typeof mappedProp === 'object') && (mappedProp instanceof Number)) {
        // primitive number (must be unboxed)
        node[prop] = Number(mappedProp);
      } else if (typeof mappedProp === 'function') {
        // computed value
        node[prop] = mappedProp.call(this, children);
      } else if (mappedProp === undefined) {
        if (children[prop] && !children[prop].isTerminal()) {
          node[prop] = children[prop].toAST(mapping);
        } else {
          // delete predefined 'type' properties, like 'type', if explicitely removed
          delete node[prop];
        }
      }
    }
    return node;
  },

  _iter(children) {
    if (this._node.isOptional()) {
      if (this.numChildren === 0) {
        return null;
      } else {
        return children[0].toAST(this.args.mapping);
      }
    }

    return children.map(function(child) {
      return child.toAST(this.args.mapping);
    }, this);
  },

  NonemptyListOf(first, sep, rest) {
    return [first.toAST(this.args.mapping)].concat(rest.toAST(this.args.mapping));
  },

  EmptyListOf() {
    return [];
  }
};

// Returns a plain JavaScript object that includes an abstract syntax tree (AST)
// for the given match result `res` containg a concrete syntax tree (CST) and grammar.
// The optional `mapping` parameter can be used to customize how the nodes of the CST
// are mapped to the AST (see /doc/extras.md#toastmatchresult-mapping).
function toAST(res, mapping) {
  if (!(res instanceof MatchResult) || res.failed()) {
    throw new Error('toAST() expects a succesfull MatchResult as first parameter');
  }

  mapping = extend({}, mapping);
  const operation = extend({}, defaultOperation);
  for (const termName in mapping) {
    if (typeof mapping[termName] === 'function') {
      operation[termName] = mapping[termName];
      delete mapping[termName];
    }
  }
  const g = res._cst.grammar;
  const s = g.createSemantics().addOperation('toAST(mapping)', operation);
  return s(res).toAST(mapping);
}

// Returns a semantics containg the toAST(mapping) operation for the given grammar g.
function semanticsForToAST(g) {
  if (!(g instanceof Grammar)) {
    throw new Error('semanticsToAST() expects a Grammar as parameter');
  }

  return g.createSemantics().addOperation('toAST(mapping)', defaultOperation);
}

module.exports = {
  helper: toAST,
  semantics: semanticsForToAST
};


/***/ }),

/***/ "./node_modules/ohm-js/node_modules/is-buffer/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/ohm-js/node_modules/is-buffer/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/ohm-js/package.json":
/*!******************************************!*\
  !*** ./node_modules/ohm-js/package.json ***!
  \******************************************/
/*! exports provided: _args, _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _spec, _where, author, bin, bugs, contributors, dependencies, description, devDependencies, engines, homepage, keywords, license, main, name, repository, scripts, types, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_args\":[[\"ohm-js@15.4.1\",\"/Users/danielkrasner/REPOS/ULex/SimpleTalk\"]],\"_from\":\"ohm-js@15.4.1\",\"_id\":\"ohm-js@15.4.1\",\"_inBundle\":false,\"_integrity\":\"sha512-ob5b6hnlg6tR73Zxd8ON/MQND36SgEDbKQYrzdDVVyTNa3d3aJ/YyobB7mItJ8YXNTZGgZ/eUiLtfo2CU0uREA==\",\"_location\":\"/ohm-js\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"ohm-js@15.4.1\",\"name\":\"ohm-js\",\"escapedName\":\"ohm-js\",\"rawSpec\":\"15.4.1\",\"saveSpec\":null,\"fetchSpec\":\"15.4.1\"},\"_requiredBy\":[\"/\"],\"_resolved\":\"https://registry.npmjs.org/ohm-js/-/ohm-js-15.4.1.tgz\",\"_spec\":\"15.4.1\",\"_where\":\"/Users/danielkrasner/REPOS/ULex/SimpleTalk\",\"author\":{\"name\":\"Alex Warth\",\"email\":\"alexwarth@gmail.com\",\"url\":\"http://tinlizzie.org/~awarth\"},\"bin\":{\"ohm-js\":\"src/ohm-cmd.js\"},\"bugs\":{\"url\":\"https://github.com/harc/ohm/issues\"},\"contributors\":[{\"name\":\"Patrick Dubroy\",\"email\":\"pdubroy@gmail.com\"},{\"name\":\"Meixian Li\",\"email\":\"lmeixian@gmail.com\"},{\"name\":\"Marko Röder\",\"email\":\"m.roeder@photon-software.de\"},{\"name\":\"Tony Garnock-Jones\",\"email\":\"tonygarnockjones@gmail.com\"},{\"name\":\"Saketh Kasibatla\",\"email\":\"sake.kasi@gmail.com\"},{\"name\":\"Lionel Landwerlin\",\"email\":\"llandwerlin@gmail.com\"},{\"name\":\"Jason Merrill\",\"email\":\"jwmerrill@gmail.com\"},{\"name\":\"Ray Toal\",\"email\":\"rtoal@lmu.edu\"},{\"name\":\"Yoshiki Ohshima\",\"email\":\"Yoshiki.Ohshima@acm.org\"},{\"name\":\"stagas\",\"email\":\"gstagas@gmail.com\"},{\"name\":\"Jonathan Edwards\",\"email\":\"JonathanMEdwards@gmail.com\"},{\"name\":\"Neil Jewers\",\"email\":\"njjewers@uwaterloo.ca\"},{\"name\":\"Mike Niebling\",\"email\":\"(none)\",\"url\":\"none\"},{\"name\":\"Arthur Carabott\",\"email\":\"arthurc@gmail.com\"},{\"name\":\"AngryPowman\",\"email\":\"angrypowman@qq.com\"},{\"name\":\"Luca Guzzon\",\"email\":\"luca.guzzon@gmail.com\"},{\"name\":\"Leslie Ying\",\"email\":\"acetophore@users.noreply.github.com\"},{\"name\":\"Stan Rozenraukh\",\"email\":\"stan@stanistan.com\"},{\"name\":\"Stephan Seidt\",\"email\":\"stephan.seidt@gmail.com\"},{\"name\":\"Thomas Nyberg\",\"email\":\"tomnyberg@gmail.com\"},{\"name\":\"Justin Chase\",\"email\":\"justin.m.chase@gmail.com\"},{\"name\":\"Vse Mozhet Byt\",\"email\":\"vsemozhetbyt@gmail.com\"},{\"name\":\"Wil Chung\",\"email\":\"10446+iamwilhelm@users.noreply.github.com\"},{\"name\":\"Daniel Tomlinson\",\"email\":\"DanielTomlinson@me.com\"},{\"name\":\"abego\",\"email\":\"ub@abego-software.de\"},{\"name\":\"acslk\",\"email\":\"d_vd415@hotmail.com\"},{\"name\":\"codeZeilen\",\"email\":\"codeZeilen@users.noreply.github.com\"},{\"name\":\"owch\",\"email\":\"bowenrainyday@gmail.com\"},{\"name\":\"sfinnie\",\"email\":\"scott.finnie@gmail.com\"},{\"name\":\"Milan Lajtoš\",\"email\":\"milan.lajtos@me.com\"}],\"dependencies\":{\"is-buffer\":\"^2.0.4\",\"util-extend\":\"^1.0.3\"},\"description\":\"An object-oriented language for parsing and pattern matching\",\"devDependencies\":{\"@types/tape\":\"^4.13.0\",\"eslint\":\"^7.9.0\",\"eslint-config-google\":\"^0.14.0\",\"eslint-plugin-camelcase-ohm\":\"^0.2.1\",\"eslint-plugin-no-extension-in-require\":\"^0.2.0\",\"eslint-plugin-tape\":\"^1.1.0\",\"husky\":\"^4.2.5\",\"jsdom\":\"^9.9.1\",\"json\":\"^9.0.6\",\"markscript\":\"^0.5.0\",\"node-static\":\"^0.7.11\",\"nodemon\":\"^2.0.4\",\"ohm-grammar-ecmascript\":\"^0.5.0\",\"tap-spec\":\"^5.0.0\",\"tape\":\"^5.0.1\",\"tape-catch\":\"^1.0.6\",\"ts-loader\":\"^8.0.4\",\"ts-node\":\"^9.0.0\",\"typescript\":\"^4.0.3\",\"walk-sync\":\"^2.2.0\",\"webpack\":\"^4.44.2\",\"webpack-cli\":\"^3.3.12\"},\"engines\":{\"node\":\">=0.12.1\"},\"homepage\":\"https://ohmlang.github.io/\",\"keywords\":[\"parser\",\"compiler\",\"pattern matching\",\"pattern-matching\",\"ometa\",\"ometa/js\",\"ometa-js\",\"ometajs\",\"rapid\",\"prototyping\"],\"license\":\"MIT\",\"main\":\"src/main.js\",\"name\":\"ohm-js\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/harc/ohm.git\"},\"scripts\":{\"bootstrap\":\"bash bin/bootstrap --test || (echo 'Bootstrap failed.' && mv -v dist/ohm-grammar.js.old dist/ohm-grammar.js && mv -v dist/built-in-rules.js.old dist/built-in-rules.js && mv -v dist/operations-and-attributes.js.old dist/operations-and-attributes.js)\",\"build\":\"yarn build-debug && webpack --mode=production\",\"build-debug\":\"webpack --mode=development\",\"clean\":\"rm -f dist/ohm.js dist/ohm.min.js\",\"lint\":\"eslint . --ignore-path ../.eslintignore\",\"postinstall\":\"node bin/dev-setup.js\",\"postpublish\":\"rm README.md\",\"pre-commit\":\"yarn run lint && yarn run build && yarn run test\",\"prebootstrap\":\"bash bin/prebootstrap\",\"prebuild-debug\":\"bash ../bin/update-env.sh\",\"prepublishOnly\":\"cp ../README.md .\",\"pretest\":\"bash ../bin/update-env.sh\",\"test\":\"(tape 'test/**/*.js' | tap-spec) && ts-node test/test-typings.ts\",\"test-watch\":\"bash bin/test-watch\",\"unsafe-bootstrap\":\"bash bin/bootstrap\",\"version-package\":\"bash bin/version\",\"watch\":\"webpack --mode=development --watch\"},\"types\":\"index.d.ts\",\"version\":\"15.4.1\"}");

/***/ }),

/***/ "./node_modules/ohm-js/src/Builder.js":
/*!********************************************!*\
  !*** ./node_modules/ohm-js/src/Builder.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const GrammarDecl = __webpack_require__(/*! ./GrammarDecl */ "./node_modules/ohm-js/src/GrammarDecl.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Builder() {}

Builder.prototype = {
  currentDecl: null,
  currentRuleName: null,

  newGrammar(name) {
    return new GrammarDecl(name);
  },

  grammar(metaInfo, name, superGrammar, defaultStartRule, rules) {
    const gDecl = new GrammarDecl(name);
    if (superGrammar) {
      gDecl.withSuperGrammar(this.fromRecipe(superGrammar));
    }
    if (defaultStartRule) {
      gDecl.withDefaultStartRule(defaultStartRule);
    }
    if (metaInfo && metaInfo.source) {
      gDecl.withSource(metaInfo.source);
    }

    this.currentDecl = gDecl;
    Object.keys(rules).forEach(ruleName => {
      this.currentRuleName = ruleName;
      const ruleRecipe = rules[ruleName];

      const action = ruleRecipe[0]; // define/extend/override
      const metaInfo = ruleRecipe[1];
      const description = ruleRecipe[2];
      const formals = ruleRecipe[3];
      const body = this.fromRecipe(ruleRecipe[4]);

      let source;
      if (gDecl.source && metaInfo && metaInfo.sourceInterval) {
        source = gDecl.source.subInterval(
            metaInfo.sourceInterval[0],
            metaInfo.sourceInterval[1] - metaInfo.sourceInterval[0]);
      }
      gDecl[action](ruleName, formals, body, description, source);
    });
    this.currentRuleName = this.currentDecl = null;
    return gDecl.build();
  },

  terminal(x) {
    return new pexprs.Terminal(x);
  },

  range(from, to) {
    return new pexprs.Range(from, to);
  },

  param(index) {
    return new pexprs.Param(index);
  },

  alt(/* term1, term2, ... */) {
    let terms = [];
    for (let idx = 0; idx < arguments.length; idx++) {
      let arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
  },

  seq(/* factor1, factor2, ... */) {
    let factors = [];
    for (let idx = 0; idx < arguments.length; idx++) {
      let arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
  },

  star(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Star(expr);
  },

  plus(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Plus(expr);
  },

  opt(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Opt(expr);
  },

  not(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Not(expr);
  },

  la(expr) {
    // TODO: temporary to still be able to read old recipes
    return this.lookahead(expr);
  },

  lookahead(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lookahead(expr);
  },

  lex(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lex(expr);
  },

  app(ruleName, optParams) {
    if (optParams && optParams.length > 0) {
      optParams = optParams.map(function(param) {
        return param instanceof pexprs.PExpr ? param :
          this.fromRecipe(param);
      }, this);
    }
    return new pexprs.Apply(ruleName, optParams);
  },

  // Note that unlike other methods in this class, this method cannot be used as a
  // convenience constructor. It only works with recipes, because it relies on
  // `this.currentDecl` and `this.currentRuleName` being set.
  splice(beforeTerms, afterTerms) {
    return new pexprs.Splice(
        this.currentDecl.superGrammar,
        this.currentRuleName,
        beforeTerms.map(term => this.fromRecipe(term)),
        afterTerms.map(term => this.fromRecipe(term)));
  },

  fromRecipe(recipe) {
    // the meta-info of 'grammar' is processed in Builder.grammar
    const result = this[recipe[0]].apply(this,
      recipe[0] === 'grammar' ? recipe.slice(1) : recipe.slice(2));

    const metaInfo = recipe[1];
    if (metaInfo) {
      if (metaInfo.sourceInterval && this.currentDecl) {
        result.withSource(
            this.currentDecl.sourceInterval.apply(this.currentDecl, metaInfo.sourceInterval)
        );
      }
    }
    return result;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Builder;


/***/ }),

/***/ "./node_modules/ohm-js/src/CaseInsensitiveTerminal.js":
/*!************************************************************!*\
  !*** ./node_modules/ohm-js/src/CaseInsensitiveTerminal.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const Failure = __webpack_require__(/*! ./Failure */ "./node_modules/ohm-js/src/Failure.js");
const TerminalNode = __webpack_require__(/*! ./nodes */ "./node_modules/ohm-js/src/nodes.js").TerminalNode;
const assert = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js").assert;
const {PExpr, Terminal} = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

class CaseInsensitiveTerminal extends PExpr {
  constructor(param) {
    super();
    this.obj = param;
  }

  _getString(state) {
    const terminal = state.currentApplication().args[this.obj.index];
    assert(terminal instanceof Terminal, 'expected a Terminal expression');
    return terminal.obj;
  }

  // Implementation of the PExpr API

  allowsSkippingPrecedingSpace() {
    return true;
  }

  eval(state) {
    const inputStream = state.inputStream;
    const origPos = inputStream.pos;
    const matchStr = this._getString(state);
    if (!inputStream.matchString(matchStr, true)) {
      state.processFailure(origPos, this);
      return false;
    } else {
      state.pushBinding(new TerminalNode(state.grammar, matchStr), origPos);
      return true;
    }
  }

  generateExample(grammar, examples, inSyntacticContext, actuals) {
    // Start with a example generated from the Terminal...
    const str = this.obj.generateExample(grammar, examples, inSyntacticContext, actuals).value;

    // ...and randomly switch characters to uppercase/lowercase.
    let value = '';
    for (let i = 0; i < str.length; ++i) {
      value += Math.random() < 0.5 ? str[i].toLocaleLowerCase() : str[i].toLocaleUpperCase();
    }
    return {value};
  }

  getArity() {
    return 1;
  }

  substituteParams(actuals) {
    return new CaseInsensitiveTerminal(this.obj.substituteParams(actuals));
  }

  toDisplayString() {
    return this.obj.toDisplayString() + ' (case-insensitive)';
  }

  toFailure(grammar) {
    return new Failure(this, this.obj.toFailure(grammar) + ' (case-insensitive)', 'description');
  }

  _isNullable(grammar, memo) {
    return this.obj._isNullable(grammar, memo);
  }
}

module.exports = CaseInsensitiveTerminal;


/***/ }),

/***/ "./node_modules/ohm-js/src/Failure.js":
/*!********************************************!*\
  !*** ./node_modules/ohm-js/src/Failure.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

/*
  `Failure`s represent expressions that weren't matched while parsing. They are used to generate
  error messages automatically. The interface of `Failure`s includes the collowing methods:

  - getText() : String
  - getType() : String  (one of {"description", "string", "code"})
  - isDescription() : bool
  - isStringTerminal() : bool
  - isCode() : bool
  - isFluffy() : bool
  - makeFluffy() : void
  - subsumes(Failure) : bool
*/

function isValidType(type) {
  return type === 'description' || type === 'string' || type === 'code';
}

function Failure(pexpr, text, type) {
  if (!isValidType(type)) {
    throw new Error('invalid Failure type: ' + type);
  }
  this.pexpr = pexpr;
  this.text = text;
  this.type = type;
  this.fluffy = false;
}

Failure.prototype.getPExpr = function() {
  return this.pexpr;
};

Failure.prototype.getText = function() {
  return this.text;
};

Failure.prototype.getType = function() {
  return this.type;
};

Failure.prototype.isDescription = function() {
  return this.type === 'description';
};

Failure.prototype.isStringTerminal = function() {
  return this.type === 'string';
};

Failure.prototype.isCode = function() {
  return this.type === 'code';
};

Failure.prototype.isFluffy = function() {
  return this.fluffy;
};

Failure.prototype.makeFluffy = function() {
  this.fluffy = true;
};

Failure.prototype.clearFluffy = function() {
  this.fluffy = false;
};

Failure.prototype.subsumes = function(that) {
  return this.getText() === that.getText() &&
      this.type === that.type &&
      (!this.isFluffy() || this.isFluffy() && that.isFluffy());
};

Failure.prototype.toString = function() {
  return this.type === 'string' ?
    JSON.stringify(this.getText()) :
    this.getText();
};

Failure.prototype.clone = function() {
  const failure = new Failure(this.pexpr, this.text, this.type);
  if (this.isFluffy()) {
    failure.makeFluffy();
  }
  return failure;
};

Failure.prototype.toKey = function() {
  return this.toString() + '#' + this.type;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Failure;


/***/ }),

/***/ "./node_modules/ohm-js/src/Grammar.js":
/*!********************************************!*\
  !*** ./node_modules/ohm-js/src/Grammar.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const CaseInsensitiveTerminal = __webpack_require__(/*! ./CaseInsensitiveTerminal */ "./node_modules/ohm-js/src/CaseInsensitiveTerminal.js");
const Matcher = __webpack_require__(/*! ./Matcher */ "./node_modules/ohm-js/src/Matcher.js");
const Semantics = __webpack_require__(/*! ./Semantics */ "./node_modules/ohm-js/src/Semantics.js");
const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function getSortedRuleValues(grammar) {
  return Object.keys(grammar.rules).sort().map(name => grammar.rules[name]);
}

function Grammar(
    name,
    superGrammar,
    rules,
    optDefaultStartRule) {
  this.name = name;
  this.superGrammar = superGrammar;
  this.rules = rules;
  if (optDefaultStartRule) {
    if (!(optDefaultStartRule in rules)) {
      throw new Error("Invalid start rule: '" + optDefaultStartRule +
                      "' is not a rule in grammar '" + name + "'");
    }
    this.defaultStartRule = optDefaultStartRule;
  }
}

let ohmGrammar;
let buildGrammar;

// This method is called from main.js once Ohm has loaded.
Grammar.initApplicationParser = function(grammar, builderFn) {
  ohmGrammar = grammar;
  buildGrammar = builderFn;
};

Grammar.prototype = {
  matcher() {
    return new Matcher(this);
  },

  // Return true if the grammar is a built-in grammar, otherwise false.
  // NOTE: This might give an unexpected result if called before BuiltInRules is defined!
  isBuiltIn() {
    return this === Grammar.ProtoBuiltInRules || this === Grammar.BuiltInRules;
  },

  equals(g) {
    if (this === g) {
      return true;
    }
    // Do the cheapest comparisons first.
    if (g == null ||
        this.name !== g.name ||
        this.defaultStartRule !== g.defaultStartRule ||
        !(this.superGrammar === g.superGrammar || this.superGrammar.equals(g.superGrammar))) {
      return false;
    }
    const myRules = getSortedRuleValues(this);
    const otherRules = getSortedRuleValues(g);
    return myRules.length === otherRules.length && myRules.every((rule, i) => {
      return rule.description === otherRules[i].description &&
             rule.formals.join(',') === otherRules[i].formals.join(',') &&
             rule.body.toString() === otherRules[i].body.toString();
    });
  },

  match(input, optStartApplication) {
    const m = this.matcher();
    m.replaceInputRange(0, 0, input);
    return m.match(optStartApplication);
  },

  trace(input, optStartApplication) {
    const m = this.matcher();
    m.replaceInputRange(0, 0, input);
    return m.trace(optStartApplication);
  },

  semantics() {
    // TODO: Remove this eventually! Deprecated in v0.12.
    throw new Error('semantics() is deprecated -- use createSemantics() instead.');
  },

  createSemantics() {
    return Semantics.createSemantics(this);
  },

  extendSemantics(superSemantics) {
    return Semantics.createSemantics(this, superSemantics._getSemantics());
  },

  // Check that every key in `actionDict` corresponds to a semantic action, and that it maps to
  // a function of the correct arity. If not, throw an exception.
  _checkTopDownActionDict(what, name, actionDict) {
    function isSpecialAction(a) {
      return a === '_iter' || a === '_terminal' || a === '_nonterminal' || a === '_default';
    }

    const problems = [];
    for (const k in actionDict) {
      const v = actionDict[k];
      if (!isSpecialAction(k) && !(k in this.rules)) {
        problems.push("'" + k + "' is not a valid semantic action for '" + this.name + "'");
      } else if (typeof v !== 'function') {
        problems.push(
            "'" + k + "' must be a function in an action dictionary for '" + this.name + "'");
      } else {
        const actual = v.length;
        const expected = this._topDownActionArity(k);
        if (actual !== expected) {
          problems.push(
              "Semantic action '" + k + "' has the wrong arity: " +
              'expected ' + expected + ', got ' + actual);
        }
      }
    }
    if (problems.length > 0) {
      const prettyProblems = problems.map(problem => '- ' + problem);
      const error = new Error(
          "Found errors in the action dictionary of the '" + name + "' " + what + ':\n' +
          prettyProblems.join('\n'));
      error.problems = problems;
      throw error;
    }
  },

  // Return the expected arity for a semantic action named `actionName`, which
  // is either a rule name or a special action name like '_nonterminal'.
  _topDownActionArity(actionName) {
    if (actionName === '_iter' || actionName === '_nonterminal' || actionName === '_default') {
      return 1;
    } else if (actionName === '_terminal') {
      return 0;
    }
    return this.rules[actionName].body.getArity();
  },

  _inheritsFrom(grammar) {
    let g = this.superGrammar;
    while (g) {
      if (g.equals(grammar, true)) {
        return true;
      }
      g = g.superGrammar;
    }
    return false;
  },

  toRecipe(optVarName) {
    const metaInfo = {};
    // Include the grammar source if it is available.
    if (this.source) {
      metaInfo.source = this.source.contents;
    }

    let superGrammar = null;
    if (this.superGrammar && !this.superGrammar.isBuiltIn()) {
      superGrammar = JSON.parse(this.superGrammar.toRecipe());
    }

    let startRule = null;
    if (this.defaultStartRule) {
      startRule = this.defaultStartRule;
    }

    const rules = {};
    const self = this;
    Object.keys(this.rules).forEach(ruleName => {
      const ruleInfo = self.rules[ruleName];
      const body = ruleInfo.body;
      const isDefinition = !self.superGrammar || !self.superGrammar.rules[ruleName];

      let operation;
      if (isDefinition) {
        operation = 'define';
      } else {
        operation = body instanceof pexprs.Extend ? 'extend' : 'override';
      }

      const metaInfo = {};
      if (ruleInfo.source && self.source) {
        const adjusted = ruleInfo.source.relativeTo(self.source);
        metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
      }

      const description = isDefinition ? ruleInfo.description : null;
      const bodyRecipe = body.outputRecipe(ruleInfo.formals, self.source);

      rules[ruleName] = [
        operation, // "define"/"extend"/"override"
        metaInfo,
        description,
        ruleInfo.formals,
        bodyRecipe
      ];
    });

    return JSON.stringify([
      'grammar',
      metaInfo,
      this.name,
      superGrammar,
      startRule,
      rules
    ]);
  },

  // TODO: Come up with better names for these methods.
  // TODO: Write the analog of these methods for inherited attributes.
  toOperationActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },
  toAttributeActionDictionaryTemplate() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },

  _toOperationOrAttributeActionDictionaryTemplate() {
    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus
    // should appear next to other cases of AddExpr.

    const sb = new common.StringBuffer();
    sb.append('{');

    let first = true;
    for (const ruleName in this.rules) {
      const body = this.rules[ruleName].body;
      if (first) {
        first = false;
      } else {
        sb.append(',');
      }
      sb.append('\n');
      sb.append('  ');
      this.addSemanticActionTemplate(ruleName, body, sb);
    }

    sb.append('\n}');
    return sb.contents();
  },

  addSemanticActionTemplate(ruleName, body, sb) {
    sb.append(ruleName);
    sb.append(': function(');
    const arity = this._topDownActionArity(ruleName);
    sb.append(common.repeat('_', arity).join(', '));
    sb.append(') {\n');
    sb.append('  }');
  },

  // Parse a string which expresses a rule application in this grammar, and return the
  // resulting Apply node.
  parseApplication(str) {
    let app;
    if (str.indexOf('<') === -1) {
      // simple application
      app = new pexprs.Apply(str);
    } else {
      // parameterized application
      const cst = ohmGrammar.match(str, 'Base_application');
      app = buildGrammar(cst, {});
    }

    // Ensure that the application is valid.
    if (!(app.ruleName in this.rules)) {
      throw errors.undeclaredRule(app.ruleName, this.name);
    }
    const formals = this.rules[app.ruleName].formals;
    if (formals.length !== app.args.length) {
      const source = this.rules[app.ruleName].source;
      throw errors.wrongNumberOfParameters(app.ruleName, formals.length, app.args.length, source);
    }
    return app;
  }
};

// The following grammar contains a few rules that couldn't be written  in "userland".
// At the bottom of src/main.js, we create a sub-grammar of this grammar that's called
// `BuiltInRules`. That grammar contains several convenience rules, e.g., `letter` and
// `digit`, and is implicitly the super-grammar of any grammar whose super-grammar
// isn't specified.
Grammar.ProtoBuiltInRules = new Grammar(
    'ProtoBuiltInRules', // name
    undefined, // supergrammar
    {
      any: {
        body: pexprs.any,
        formals: [],
        description: 'any character',
        primitive: true
      },
      end: {
        body: pexprs.end,
        formals: [],
        description: 'end of input',
        primitive: true
      },

      caseInsensitive: {
        body: new CaseInsensitiveTerminal(new pexprs.Param(0)),
        formals: ['str'],
        primitive: true
      },
      lower: {
        body: new pexprs.UnicodeChar('Ll'),
        formals: [],
        description: 'a lowercase letter',
        primitive: true
      },
      upper: {
        body: new pexprs.UnicodeChar('Lu'),
        formals: [],
        description: 'an uppercase letter',
        primitive: true
      },
      // Union of Lt (titlecase), Lm (modifier), and Lo (other), i.e. any letter not in Ll or Lu.
      unicodeLtmo: {
        body: new pexprs.UnicodeChar('Ltmo'),
        formals: [],
        description: 'a Unicode character in Lt, Lm, or Lo',
        primitive: true
      },

      // These rules are not truly primitive (they could be written in userland) but are defined
      // here for bootstrapping purposes.
      spaces: {
        body: new pexprs.Star(new pexprs.Apply('space')),
        formals: []
      },
      space: {
        body: new pexprs.Range('\x00', ' '),
        formals: [],
        description: 'a space'
      }
    }
);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Grammar;


/***/ }),

/***/ "./node_modules/ohm-js/src/GrammarDecl.js":
/*!************************************************!*\
  !*** ./node_modules/ohm-js/src/GrammarDecl.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const Grammar = __webpack_require__(/*! ./Grammar */ "./node_modules/ohm-js/src/Grammar.js");
const InputStream = __webpack_require__(/*! ./InputStream */ "./node_modules/ohm-js/src/InputStream.js");
const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Constructors

function GrammarDecl(name) {
  this.name = name;
}

// Helpers

GrammarDecl.prototype.sourceInterval = function(startIdx, endIdx) {
  return this.source.subInterval(startIdx, endIdx - startIdx);
};

GrammarDecl.prototype.ensureSuperGrammar = function() {
  if (!this.superGrammar) {
    this.withSuperGrammar(
        // TODO: The conditional expression below is an ugly hack. It's kind of ok because
        // I doubt anyone will ever try to declare a grammar called `BuiltInRules`. Still,
        // we should try to find a better way to do this.
        this.name === 'BuiltInRules' ?
            Grammar.ProtoBuiltInRules :
            Grammar.BuiltInRules);
  }
  return this.superGrammar;
};

GrammarDecl.prototype.ensureSuperGrammarRuleForOverriding = function(name, source) {
  const ruleInfo = this.ensureSuperGrammar().rules[name];
  if (!ruleInfo) {
    throw errors.cannotOverrideUndeclaredRule(name, this.superGrammar.name, source);
  }
  return ruleInfo;
};

GrammarDecl.prototype.installOverriddenOrExtendedRule = function(name, formals, body, source) {
  const duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, source);
  }
  const ruleInfo = this.ensureSuperGrammar().rules[name];
  const expectedFormals = ruleInfo.formals;
  const expectedNumFormals = expectedFormals ? expectedFormals.length : 0;
  if (formals.length !== expectedNumFormals) {
    throw errors.wrongNumberOfParameters(name, expectedNumFormals, formals.length, source);
  }
  return this.install(name, formals, body, ruleInfo.description, source);
};

GrammarDecl.prototype.install = function(name, formals, body, description, source) {
  this.rules[name] = {
    body: body.introduceParams(formals),
    formals,
    description,
    source
  };
  return this;
};

// Stuff that you should only do once

GrammarDecl.prototype.withSuperGrammar = function(superGrammar) {
  if (this.superGrammar) {
    throw new Error('the super grammar of a GrammarDecl cannot be set more than once');
  }
  this.superGrammar = superGrammar;
  this.rules = Object.create(superGrammar.rules);

  // Grammars with an explicit supergrammar inherit a default start rule.
  if (!superGrammar.isBuiltIn()) {
    this.defaultStartRule = superGrammar.defaultStartRule;
  }
  return this;
};

GrammarDecl.prototype.withDefaultStartRule = function(ruleName) {
  this.defaultStartRule = ruleName;
  return this;
};

GrammarDecl.prototype.withSource = function(source) {
  this.source = new InputStream(source).interval(0, source.length);
  return this;
};

// Creates a Grammar instance, and if it passes the sanity checks, returns it.
GrammarDecl.prototype.build = function() {
  const grammar = new Grammar(
      this.name,
      this.ensureSuperGrammar(),
      this.rules,
      this.defaultStartRule);

  // TODO: change the pexpr.prototype.assert... methods to make them add
  // exceptions to an array that's provided as an arg. Then we'll be able to
  // show more than one error of the same type at a time.
  // TODO: include the offending pexpr in the errors, that way we can show
  // the part of the source that caused it.
  const grammarErrors = [];
  let grammarHasInvalidApplications = false;
  Object.keys(grammar.rules).forEach(ruleName => {
    const body = grammar.rules[ruleName].body;
    try {
      body.assertChoicesHaveUniformArity(ruleName);
    } catch (e) {
      grammarErrors.push(e);
    }
    try {
      body.assertAllApplicationsAreValid(ruleName, grammar);
    } catch (e) {
      grammarErrors.push(e);
      grammarHasInvalidApplications = true;
    }
  });
  if (!grammarHasInvalidApplications) {
    // The following check can only be done if the grammar has no invalid applications.
    Object.keys(grammar.rules).forEach(ruleName => {
      const body = grammar.rules[ruleName].body;
      try {
        body.assertIteratedExprsAreNotNullable(grammar, []);
      } catch (e) {
        grammarErrors.push(e);
      }
    });
  }
  if (grammarErrors.length > 0) {
    errors.throwErrors(grammarErrors);
  }
  if (this.source) {
    grammar.source = this.source;
  }

  return grammar;
};

// Rule declarations

GrammarDecl.prototype.define = function(name, formals, body, description, source) {
  this.ensureSuperGrammar();
  if (this.superGrammar.rules[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.superGrammar.name, source);
  } else if (this.rules[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.name, source);
  }
  const duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, source);
  }
  return this.install(name, formals, body, description, source);
};

GrammarDecl.prototype.override = function(name, formals, body, descIgnored, source) {
  this.ensureSuperGrammarRuleForOverriding(name, source);
  this.installOverriddenOrExtendedRule(name, formals, body, source);
  return this;
};

GrammarDecl.prototype.extend = function(name, formals, fragment, descIgnored, source) {
  const ruleInfo = this.ensureSuperGrammar().rules[name];
  if (!ruleInfo) {
    throw errors.cannotExtendUndeclaredRule(name, this.superGrammar.name, source);
  }
  const body = new pexprs.Extend(this.superGrammar, name, fragment);
  body.source = fragment.source;
  this.installOverriddenOrExtendedRule(name, formals, body, source);
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = GrammarDecl;


/***/ }),

/***/ "./node_modules/ohm-js/src/InputStream.js":
/*!************************************************!*\
  !*** ./node_modules/ohm-js/src/InputStream.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const Interval = __webpack_require__(/*! ./Interval */ "./node_modules/ohm-js/src/Interval.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function InputStream(source) {
  this.source = source;
  this.pos = 0;
  this.examinedLength = 0;
}

InputStream.prototype = {
  atEnd() {
    const ans = this.pos === this.source.length;
    this.examinedLength = Math.max(this.examinedLength, this.pos + 1);
    return ans;
  },

  next() {
    const ans = this.source[this.pos++];
    this.examinedLength = Math.max(this.examinedLength, this.pos);
    return ans;
  },

  matchString(s, optIgnoreCase) {
    let idx;
    if (optIgnoreCase) {
      /*
        Case-insensitive comparison is a tricky business. Some notable gotchas include the
        "Turkish I" problem (http://www.i18nguy.com/unicode/turkish-i18n.html) and the fact
        that the German Esszet (ß) turns into "SS" in upper case.

        This is intended to be a locale-invariant comparison, which means it may not obey
        locale-specific expectations (e.g. "i" => "İ").
       */
      for (idx = 0; idx < s.length; idx++) {
        const actual = this.next();
        const expected = s[idx];
        if (actual == null || actual.toUpperCase() !== expected.toUpperCase()) {
          return false;
        }
      }
      return true;
    }
    // Default is case-sensitive comparison.
    for (idx = 0; idx < s.length; idx++) {
      if (this.next() !== s[idx]) { return false; }
    }
    return true;
  },

  sourceSlice(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  },

  interval(startIdx, optEndIdx) {
    return new Interval(this.source, startIdx, optEndIdx ? optEndIdx : this.pos);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = InputStream;


/***/ }),

/***/ "./node_modules/ohm-js/src/Interval.js":
/*!*********************************************!*\
  !*** ./node_modules/ohm-js/src/Interval.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const assert = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js").assert;
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const util = __webpack_require__(/*! ./util */ "./node_modules/ohm-js/src/util.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Interval(sourceString, startIdx, endIdx) {
  this.sourceString = sourceString;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
}

Interval.coverage = function(/* interval1, interval2, ... */) {
  const sourceString = arguments[0].sourceString;
  let startIdx = arguments[0].startIdx;
  let endIdx = arguments[0].endIdx;
  for (let idx = 1; idx < arguments.length; idx++) {
    const interval = arguments[idx];
    if (interval.sourceString !== sourceString) {
      throw errors.intervalSourcesDontMatch();
    } else {
      startIdx = Math.min(startIdx, arguments[idx].startIdx);
      endIdx = Math.max(endIdx, arguments[idx].endIdx);
    }
  }
  return new Interval(sourceString, startIdx, endIdx);
};

Interval.prototype = {
  coverageWith(/* interval1, interval2, ... */) {
    const intervals = Array.prototype.slice.call(arguments);
    intervals.push(this);
    return Interval.coverage.apply(undefined, intervals);
  },

  collapsedLeft() {
    return new Interval(this.sourceString, this.startIdx, this.startIdx);
  },

  collapsedRight() {
    return new Interval(this.sourceString, this.endIdx, this.endIdx);
  },

  getLineAndColumn() {
    return util.getLineAndColumn(this.sourceString, this.startIdx);
  },

  getLineAndColumnMessage() {
    const range = [this.startIdx, this.endIdx];
    return util.getLineAndColumnMessage(this.sourceString, this.startIdx, range);
  },

  // Returns an array of 0, 1, or 2 intervals that represents the result of the
  // interval difference operation.
  minus(that) {
    if (this.sourceString !== that.sourceString) {
      throw errors.intervalSourcesDontMatch();
    } else if (this.startIdx === that.startIdx && this.endIdx === that.endIdx) {
      // `this` and `that` are the same interval!
      return [
      ];
    } else if (this.startIdx < that.startIdx && that.endIdx < this.endIdx) {
      // `that` splits `this` into two intervals
      return [
        new Interval(this.sourceString, this.startIdx, that.startIdx),
        new Interval(this.sourceString, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.endIdx && that.endIdx < this.endIdx) {
      // `that` contains a prefix of `this`
      return [
        new Interval(this.sourceString, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.startIdx && that.startIdx < this.endIdx) {
      // `that` contains a suffix of `this`
      return [
        new Interval(this.sourceString, this.startIdx, that.startIdx)
      ];
    } else {
      // `that` and `this` do not overlap
      return [
        this
      ];
    }
  },

  // Returns a new Interval that has the same extent as this one, but which is relative
  // to `that`, an Interval that fully covers this one.
  relativeTo(that) {
    if (this.sourceString !== that.sourceString) {
      throw errors.intervalSourcesDontMatch();
    }
    assert(this.startIdx >= that.startIdx && this.endIdx <= that.endIdx,
        'other interval does not cover this one');
    return new Interval(this.sourceString,
        this.startIdx - that.startIdx,
        this.endIdx - that.startIdx);
  },

  // Returns a new Interval which contains the same contents as this one,
  // but with whitespace trimmed from both ends. (This only makes sense when
  // the input stream is a string.)
  trimmed() {
    const contents = this.contents;
    const startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
    const endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
    return new Interval(this.sourceString, startIdx, endIdx);
  },

  subInterval(offset, len) {
    const newStartIdx = this.startIdx + offset;
    return new Interval(this.sourceString, newStartIdx, newStartIdx + len);
  }
};

Object.defineProperties(Interval.prototype, {
  contents: {
    get() {
      if (this._contents === undefined) {
        this._contents = this.sourceString.slice(this.startIdx, this.endIdx);
      }
      return this._contents;
    },
    enumerable: true
  },
  length: {
    get() { return this.endIdx - this.startIdx; },
    enumerable: true
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Interval;



/***/ }),

/***/ "./node_modules/ohm-js/src/MatchResult.js":
/*!************************************************!*\
  !*** ./node_modules/ohm-js/src/MatchResult.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const util = __webpack_require__(/*! ./util */ "./node_modules/ohm-js/src/util.js");
const Interval = __webpack_require__(/*! ./Interval */ "./node_modules/ohm-js/src/Interval.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function MatchResult(
    matcher,
    input,
    startExpr,
    cst,
    cstOffset,
    rightmostFailurePosition,
    optRecordedFailures) {

  this.matcher = matcher;
  this.input = input;
  this.startExpr = startExpr;
  this._cst = cst;
  this._cstOffset = cstOffset;
  this._rightmostFailurePosition = rightmostFailurePosition;
  this._rightmostFailures = optRecordedFailures;

  if (this.failed()) {
    common.defineLazyProperty(this, 'message', function() {
      const detail = 'Expected ' + this.getExpectedText();
      return util.getLineAndColumnMessage(this.input, this.getRightmostFailurePosition()) + detail;
    });
    common.defineLazyProperty(this, 'shortMessage', function() {
      const detail = 'expected ' + this.getExpectedText();
      const errorInfo = util.getLineAndColumn(this.input, this.getRightmostFailurePosition());
      return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum + ': ' + detail;
    });
  }
}

MatchResult.prototype.succeeded = function() {
  return !!this._cst;
};

MatchResult.prototype.failed = function() {
  return !this.succeeded();
};

MatchResult.prototype.getRightmostFailurePosition = function() {
  return this._rightmostFailurePosition;
};

MatchResult.prototype.getRightmostFailures = function() {
  if (!this._rightmostFailures) {
    this.matcher.setInput(this.input);
    const matchResultWithFailures =
        this.matcher._match(this.startExpr, false, this.getRightmostFailurePosition());
    this._rightmostFailures = matchResultWithFailures.getRightmostFailures();
  }
  return this._rightmostFailures;
};

MatchResult.prototype.toString = function() {
  return this.succeeded() ?
      '[match succeeded]' :
      '[match failed at position ' + this.getRightmostFailurePosition() + ']';
};

// Return a string summarizing the expected contents of the input stream when
// the match failure occurred.
MatchResult.prototype.getExpectedText = function() {
  if (this.succeeded()) {
    throw new Error('cannot get expected text of a successful MatchResult');
  }

  const sb = new common.StringBuffer();
  let failures = this.getRightmostFailures();

  // Filter out the fluffy failures to make the default error messages more useful
  failures = failures.filter(failure => !failure.isFluffy());

  for (let idx = 0; idx < failures.length; idx++) {
    if (idx > 0) {
      if (idx === failures.length - 1) {
        sb.append(failures.length > 2 ? ', or ' : ' or ');
      } else {
        sb.append(', ');
      }
    }
    sb.append(failures[idx].toString());
  }
  return sb.contents();
};

MatchResult.prototype.getInterval = function() {
  const pos = this.getRightmostFailurePosition();
  return new Interval(this.input, pos, pos);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = MatchResult;


/***/ }),

/***/ "./node_modules/ohm-js/src/MatchState.js":
/*!***********************************************!*\
  !*** ./node_modules/ohm-js/src/MatchState.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const InputStream = __webpack_require__(/*! ./InputStream */ "./node_modules/ohm-js/src/InputStream.js");
const MatchResult = __webpack_require__(/*! ./MatchResult */ "./node_modules/ohm-js/src/MatchResult.js");
const PosInfo = __webpack_require__(/*! ./PosInfo */ "./node_modules/ohm-js/src/PosInfo.js");
const Trace = __webpack_require__(/*! ./Trace */ "./node_modules/ohm-js/src/Trace.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

const applySpaces = new pexprs.Apply('spaces');

function MatchState(matcher, startExpr, optPositionToRecordFailures) {
  this.matcher = matcher;
  this.startExpr = startExpr;

  this.grammar = matcher.grammar;
  this.input = matcher.input;
  this.inputStream = new InputStream(matcher.input);
  this.memoTable = matcher.memoTable;

  this._bindings = [];
  this._bindingOffsets = [];
  this._applicationStack = [];
  this._posStack = [0];
  this.inLexifiedContextStack = [false];

  this.rightmostFailurePosition = -1;
  this._rightmostFailurePositionStack = [];
  this._recordedFailuresStack = [];

  if (optPositionToRecordFailures !== undefined) {
    this.positionToRecordFailures = optPositionToRecordFailures;
    this.recordedFailures = Object.create(null);
  }
}

MatchState.prototype = {
  posToOffset(pos) {
    return pos - this._posStack[this._posStack.length - 1];
  },

  enterApplication(posInfo, app) {
    this._posStack.push(this.inputStream.pos);
    this._applicationStack.push(app);
    this.inLexifiedContextStack.push(false);
    posInfo.enter(app);
    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
    this.rightmostFailurePosition = -1;
  },

  exitApplication(posInfo, optNode) {
    const origPos = this._posStack.pop();
    this._applicationStack.pop();
    this.inLexifiedContextStack.pop();
    posInfo.exit();

    this.rightmostFailurePosition = Math.max(
        this.rightmostFailurePosition,
        this._rightmostFailurePositionStack.pop());

    if (optNode) {
      this.pushBinding(optNode, origPos);
    }
  },

  enterLexifiedContext() {
    this.inLexifiedContextStack.push(true);
  },

  exitLexifiedContext() {
    this.inLexifiedContextStack.pop();
  },

  currentApplication() {
    return this._applicationStack[this._applicationStack.length - 1];
  },

  inSyntacticContext() {
    if (typeof this.inputStream.source !== 'string') {
      return false;
    }
    const currentApplication = this.currentApplication();
    if (currentApplication) {
      return currentApplication.isSyntactic() && !this.inLexifiedContext();
    } else {
      // The top-level context is syntactic if the start application is.
      return this.startExpr.factors[0].isSyntactic();
    }
  },

  inLexifiedContext() {
    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
  },

  skipSpaces() {
    this.pushFailuresInfo();
    this.eval(applySpaces);
    this.popBinding();
    this.popFailuresInfo();
    return this.inputStream.pos;
  },

  skipSpacesIfInSyntacticContext() {
    return this.inSyntacticContext() ?
        this.skipSpaces() :
        this.inputStream.pos;
  },

  maybeSkipSpacesBefore(expr) {
    if (expr instanceof pexprs.Apply && expr.isSyntactic()) {
      return this.skipSpaces();
    } else if (expr.allowsSkippingPrecedingSpace() && expr !== applySpaces) {
      return this.skipSpacesIfInSyntacticContext();
    } else {
      return this.inputStream.pos;
    }
  },

  pushBinding(node, origPos) {
    this._bindings.push(node);
    this._bindingOffsets.push(this.posToOffset(origPos));
  },

  popBinding() {
    this._bindings.pop();
    this._bindingOffsets.pop();
  },

  numBindings() {
    return this._bindings.length;
  },

  truncateBindings(newLength) {
    // Yes, this is this really faster than setting the `length` property (tested with
    // bin/es5bench on Node v6.1.0).
    while (this._bindings.length > newLength) {
      this.popBinding();
    }
  },

  getCurrentPosInfo() {
    return this.getPosInfo(this.inputStream.pos);
  },

  getPosInfo(pos) {
    let posInfo = this.memoTable[pos];
    if (!posInfo) {
      posInfo = this.memoTable[pos] = new PosInfo();
    }
    return posInfo;
  },

  processFailure(pos, expr) {
    this.rightmostFailurePosition = Math.max(this.rightmostFailurePosition, pos);

    if (this.recordedFailures && pos === this.positionToRecordFailures) {
      const app = this.currentApplication();
      if (app) {
        // Substitute parameters with the actual pexprs that were passed to
        // the current rule.
        expr = expr.substituteParams(app.args);
      } else {
        // This branch is only reached for the "end-check" that is
        // performed after the top-level application. In that case,
        // expr === pexprs.end so there is no need to substitute
        // parameters.
      }

      this.recordFailure(expr.toFailure(this.grammar), false);
    }
  },

  recordFailure(failure, shouldCloneIfNew) {
    const key = failure.toKey();
    if (!this.recordedFailures[key]) {
      this.recordedFailures[key] = shouldCloneIfNew ? failure.clone() : failure;
    } else if (this.recordedFailures[key].isFluffy() && !failure.isFluffy()) {
      this.recordedFailures[key].clearFluffy();
    }
  },

  recordFailures(failures, shouldCloneIfNew) {
    const self = this;
    Object.keys(failures).forEach(key => {
      self.recordFailure(failures[key], shouldCloneIfNew);
    });
  },

  cloneRecordedFailures() {
    if (!this.recordedFailures) {
      return undefined;
    }

    const ans = Object.create(null);
    const self = this;
    Object.keys(this.recordedFailures).forEach(key => {
      ans[key] = self.recordedFailures[key].clone();
    });
    return ans;
  },

  getRightmostFailurePosition() {
    return this.rightmostFailurePosition;
  },

  _getRightmostFailureOffset() {
    return this.rightmostFailurePosition >= 0 ?
        this.posToOffset(this.rightmostFailurePosition) :
        -1;
  },

  // Returns the memoized trace entry for `expr` at `pos`, if one exists, `null` otherwise.
  getMemoizedTraceEntry(pos, expr) {
    const posInfo = this.memoTable[pos];
    if (posInfo && expr.ruleName) {
      const memoRec = posInfo.memo[expr.toMemoKey()];
      if (memoRec && memoRec.traceEntry) {
        const entry = memoRec.traceEntry.cloneWithExpr(expr);
        entry.isMemoized = true;
        return entry;
      }
    }
    return null;
  },

  // Returns a new trace entry, with the currently active trace array as its children.
  getTraceEntry(pos, expr, succeeded, bindings) {
    if (expr instanceof pexprs.Apply) {
      const app = this.currentApplication();
      const actuals = app ? app.args : [];
      expr = expr.substituteParams(actuals);
    }
    return this.getMemoizedTraceEntry(pos, expr) ||
           new Trace(this.input, pos, this.inputStream.pos, expr, succeeded, bindings, this.trace);
  },

  isTracing() {
    return !!this.trace;
  },

  hasNecessaryInfo(memoRec) {
    if (this.trace && !memoRec.traceEntry) {
      return false;
    }

    if (this.recordedFailures &&
        this.inputStream.pos + memoRec.rightmostFailureOffset === this.positionToRecordFailures) {
      return !!memoRec.failuresAtRightmostPosition;
    }

    return true;
  },


  useMemoizedResult(origPos, memoRec) {
    if (this.trace) {
      this.trace.push(memoRec.traceEntry);
    }

    const memoRecRightmostFailurePosition = this.inputStream.pos + memoRec.rightmostFailureOffset;
    this.rightmostFailurePosition =
        Math.max(this.rightmostFailurePosition, memoRecRightmostFailurePosition);
    if (this.recordedFailures &&
        this.positionToRecordFailures === memoRecRightmostFailurePosition &&
        memoRec.failuresAtRightmostPosition) {
      this.recordFailures(memoRec.failuresAtRightmostPosition, true);
    }

    this.inputStream.examinedLength =
        Math.max(this.inputStream.examinedLength, memoRec.examinedLength + origPos);

    if (memoRec.value) {
      this.inputStream.pos += memoRec.matchLength;
      this.pushBinding(memoRec.value, origPos);
      return true;
    }
    return false;
  },

  // Evaluate `expr` and return `true` if it succeeded, `false` otherwise. On success, `bindings`
  // will have `expr.getArity()` more elements than before, and the input stream's position may
  // have increased. On failure, `bindings` and position will be unchanged.
  eval(expr) {
    const inputStream = this.inputStream;
    const origNumBindings = this._bindings.length;

    let origRecordedFailures;
    if (this.recordedFailures) {
      origRecordedFailures = this.recordedFailures;
      this.recordedFailures = Object.create(null);
    }

    const origPos = inputStream.pos;
    const memoPos = this.maybeSkipSpacesBefore(expr);

    let origTrace;
    if (this.trace) {
      origTrace = this.trace;
      this.trace = [];
    }

    // Do the actual evaluation.
    const ans = expr.eval(this);

    if (this.trace) {
      const bindings = this._bindings.slice(origNumBindings);
      const traceEntry = this.getTraceEntry(memoPos, expr, ans, bindings);
      traceEntry.isImplicitSpaces = expr === applySpaces;
      traceEntry.isRootNode = expr === this.startExpr;
      origTrace.push(traceEntry);
      this.trace = origTrace;
    }

    if (ans) {
      if (this.recordedFailures && inputStream.pos === this.positionToRecordFailures) {
        const self = this;
        Object.keys(this.recordedFailures).forEach(key => {
          self.recordedFailures[key].makeFluffy();
        });
      }
    } else {
      // Reset the position and the bindings.
      inputStream.pos = origPos;
      this.truncateBindings(origNumBindings);
    }

    if (this.recordedFailures) {
      this.recordFailures(origRecordedFailures, false);
    }

    return ans;
  },

  getMatchResult() {
    this.eval(this.startExpr);
    let rightmostFailures;
    if (this.recordedFailures) {
      const self = this;
      rightmostFailures = Object.keys(this.recordedFailures).map(key => self.recordedFailures[key]);
    }
    return new MatchResult(
        this.matcher,
        this.input,
        this.startExpr,
        this._bindings[0],
        this._bindingOffsets[0],
        this.rightmostFailurePosition,
        rightmostFailures);
  },

  getTrace() {
    this.trace = [];
    const matchResult = this.getMatchResult();

    // The trace node for the start rule is always the last entry. If it is a syntactic rule,
    // the first entry is for an application of 'spaces'.
    // TODO(pdubroy): Clean this up by introducing a special `Match<startAppl>` rule, which will
    // ensure that there is always a single root trace node.
    const rootTrace = this.trace[this.trace.length - 1];
    rootTrace.result = matchResult;
    return rootTrace;
  },

  pushFailuresInfo() {
    this._rightmostFailurePositionStack.push(this.rightmostFailurePosition);
    this._recordedFailuresStack.push(this.recordedFailures);
  },

  popFailuresInfo() {
    this.rightmostFailurePosition = this._rightmostFailurePositionStack.pop();
    this.recordedFailures = this._recordedFailuresStack.pop();
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = MatchState;


/***/ }),

/***/ "./node_modules/ohm-js/src/Matcher.js":
/*!********************************************!*\
  !*** ./node_modules/ohm-js/src/Matcher.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const MatchState = __webpack_require__(/*! ./MatchState */ "./node_modules/ohm-js/src/MatchState.js");

const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Matcher(grammar) {
  this.grammar = grammar;
  this.memoTable = [];
  this.input = '';
}

Matcher.prototype.getInput = function() {
  return this.input;
};

Matcher.prototype.setInput = function(str) {
  if (this.input !== str) {
    this.replaceInputRange(0, this.input.length, str);
  }
  return this;
};

Matcher.prototype.replaceInputRange = function(startIdx, endIdx, str) {
  const currentInput = this.input;
  if (startIdx < 0 || startIdx > currentInput.length ||
      endIdx < 0 || endIdx > currentInput.length ||
      startIdx > endIdx) {
    throw new Error('Invalid indices: ' + startIdx + ' and ' + endIdx);
  }

  // update input
  this.input = currentInput.slice(0, startIdx) + str + currentInput.slice(endIdx);

  // update memo table (similar to the above)
  const restOfMemoTable = this.memoTable.slice(endIdx);
  this.memoTable.length = startIdx;
  for (let idx = 0; idx < str.length; idx++) {
    this.memoTable.push(undefined);
  }
  restOfMemoTable.forEach(
      function(posInfo) { this.memoTable.push(posInfo); },
      this);

  // Invalidate memoRecs
  for (let pos = 0; pos < startIdx; pos++) {
    const posInfo = this.memoTable[pos];
    if (posInfo) {
      posInfo.clearObsoleteEntries(pos, startIdx);
    }
  }

  return this;
};

Matcher.prototype.match = function(optStartApplicationStr) {
  return this._match(this._getStartExpr(optStartApplicationStr), false);
};

Matcher.prototype.trace = function(optStartApplicationStr) {
  return this._match(this._getStartExpr(optStartApplicationStr), true);
};

Matcher.prototype._match = function(startExpr, tracing, optPositionToRecordFailures) {
  const state = new MatchState(this, startExpr, optPositionToRecordFailures);
  return tracing ? state.getTrace() : state.getMatchResult();
};

/*
  Returns the starting expression for this Matcher's associated grammar. If `optStartApplicationStr`
  is specified, it is a string expressing a rule application in the grammar. If not specified, the
  grammar's default start rule will be used.
*/
Matcher.prototype._getStartExpr = function(optStartApplicationStr) {
  const applicationStr = optStartApplicationStr || this.grammar.defaultStartRule;
  if (!applicationStr) {
    throw new Error('Missing start rule argument -- the grammar has no default start rule.');
  }

  const startApp = this.grammar.parseApplication(applicationStr);
  return new pexprs.Seq([startApp, pexprs.end]);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Matcher;


/***/ }),

/***/ "./node_modules/ohm-js/src/Namespace.js":
/*!**********************************************!*\
  !*** ./node_modules/ohm-js/src/Namespace.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const extend = __webpack_require__(/*! util-extend */ "./node_modules/util-extend/extend.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Namespace() {
}
Namespace.prototype = Object.create(null);

Namespace.asNamespace = function(objOrNamespace) {
  if (objOrNamespace instanceof Namespace) {
    return objOrNamespace;
  }
  return Namespace.createNamespace(objOrNamespace);
};

// Create a new namespace. If `optProps` is specified, all of its properties
// will be copied to the new namespace.
Namespace.createNamespace = function(optProps) {
  return Namespace.extend(Namespace.prototype, optProps);
};

// Create a new namespace which extends another namespace. If `optProps` is
// specified, all of its properties will be copied to the new namespace.
Namespace.extend = function(namespace, optProps) {
  if (namespace !== Namespace.prototype && !(namespace instanceof Namespace)) {
    throw new TypeError('not a Namespace object: ' + namespace);
  }
  const ns = Object.create(namespace, {
    constructor: {
      value: Namespace,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return extend(ns, optProps);
};

// TODO: Should this be a regular method?
Namespace.toString = function(ns) {
  return Object.prototype.toString.call(ns);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Namespace;


/***/ }),

/***/ "./node_modules/ohm-js/src/PosInfo.js":
/*!********************************************!*\
  !*** ./node_modules/ohm-js/src/PosInfo.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function PosInfo() {
  this.applicationMemoKeyStack = []; // active applications at this position
  this.memo = {};
  this.maxExaminedLength = 0;
  this.maxRightmostFailureOffset = -1;
  this.currentLeftRecursion = undefined;
}

PosInfo.prototype = {
  isActive(application) {
    return this.applicationMemoKeyStack.indexOf(application.toMemoKey()) >= 0;
  },

  enter(application) {
    this.applicationMemoKeyStack.push(application.toMemoKey());
  },

  exit() {
    this.applicationMemoKeyStack.pop();
  },

  startLeftRecursion(headApplication, memoRec) {
    memoRec.isLeftRecursion = true;
    memoRec.headApplication = headApplication;
    memoRec.nextLeftRecursion = this.currentLeftRecursion;
    this.currentLeftRecursion = memoRec;

    const applicationMemoKeyStack = this.applicationMemoKeyStack;
    const indexOfFirstInvolvedRule =
        applicationMemoKeyStack.indexOf(headApplication.toMemoKey()) + 1;
    const involvedApplicationMemoKeys = applicationMemoKeyStack.slice(indexOfFirstInvolvedRule);

    memoRec.isInvolved = function(applicationMemoKey) {
      return involvedApplicationMemoKeys.indexOf(applicationMemoKey) >= 0;
    };

    memoRec.updateInvolvedApplicationMemoKeys = function() {
      for (let idx = indexOfFirstInvolvedRule; idx < applicationMemoKeyStack.length; idx++) {
        const applicationMemoKey = applicationMemoKeyStack[idx];
        if (!this.isInvolved(applicationMemoKey)) {
          involvedApplicationMemoKeys.push(applicationMemoKey);
        }
      }
    };
  },

  endLeftRecursion() {
    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
  },

  // Note: this method doesn't get called for the "head" of a left recursion -- for LR heads,
  // the memoized result (which starts out being a failure) is always used.
  shouldUseMemoizedResult(memoRec) {
    if (!memoRec.isLeftRecursion) {
      return true;
    }
    const applicationMemoKeyStack = this.applicationMemoKeyStack;
    for (let idx = 0; idx < applicationMemoKeyStack.length; idx++) {
      const applicationMemoKey = applicationMemoKeyStack[idx];
      if (memoRec.isInvolved(applicationMemoKey)) {
        return false;
      }
    }
    return true;
  },

  memoize(memoKey, memoRec) {
    this.memo[memoKey] = memoRec;
    this.maxExaminedLength = Math.max(this.maxExaminedLength, memoRec.examinedLength);
    this.maxRightmostFailureOffset =
        Math.max(this.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
    return memoRec;
  },

  clearObsoleteEntries(pos, invalidatedIdx) {
    if (pos + this.maxExaminedLength <= invalidatedIdx) {
      // Optimization: none of the rule applications that were memoized here examined the
      // interval of the input that changed, so nothing has to be invalidated.
      return;
    }

    const memo = this.memo;
    this.maxExaminedLength = 0;
    this.maxRightmostFailureOffset = -1;
    const self = this;
    Object.keys(memo).forEach(k => {
      const memoRec = memo[k];
      if (pos + memoRec.examinedLength > invalidatedIdx) {
        delete memo[k];
      } else {
        self.maxExaminedLength = Math.max(self.maxExaminedLength, memoRec.examinedLength);
        self.maxRightmostFailureOffset =
            Math.max(self.maxRightmostFailureOffset, memoRec.rightmostFailureOffset);
      }
    });
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = PosInfo;


/***/ }),

/***/ "./node_modules/ohm-js/src/Semantics.js":
/*!**********************************************!*\
  !*** ./node_modules/ohm-js/src/Semantics.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const InputStream = __webpack_require__(/*! ./InputStream */ "./node_modules/ohm-js/src/InputStream.js");
const IterationNode = __webpack_require__(/*! ./nodes */ "./node_modules/ohm-js/src/nodes.js").IterationNode;
const MatchResult = __webpack_require__(/*! ./MatchResult */ "./node_modules/ohm-js/src/MatchResult.js");
const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const util = __webpack_require__(/*! ./util */ "./node_modules/ohm-js/src/util.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

const globalActionStack = [];
let prototypeGrammar;
let prototypeGrammarSemantics;

// JSON is not a valid subset of JavaScript because there are two possible line terminators,
// U+2028 (line separator) and U+2029 (paragraph separator) that are allowed in JSON strings
// but not in JavaScript strings.
// jsonToJS() properly encodes those two characters in JSON so that it can seamlessly be
// inserted into JavaScript code (plus the encoded version is still valid JSON)
function jsonToJS(str) {
  const output = str.replace(/[\u2028\u2029]/g, (char, pos, str) => {
    const hex = char.codePointAt(0).toString(16);
    return '\\u' + '0000'.slice(hex.length) + hex;
  });
  return output;
}

// ----------------- Wrappers -----------------

// Wrappers decorate CST nodes with all of the functionality (i.e., operations and attributes)
// provided by a Semantics (see below). `Wrapper` is the abstract superclass of all wrappers. A
// `Wrapper` must have `_node` and `_semantics` instance variables, which refer to the CST node and
// Semantics (resp.) for which it was created, and a `_childWrappers` instance variable which is
// used to cache the wrapper instances that are created for its child nodes. Setting these instance
// variables is the responsibility of the constructor of each Semantics-specific subclass of
// `Wrapper`.
class Wrapper {
  constructor(node, sourceInterval, baseInterval) {
    this._node = node;
    this.source = sourceInterval;

    // The interval that the childOffsets of `node` are relative to. It should be the source
    // of the closest Nonterminal node.
    this._baseInterval = baseInterval;

    if (node.isNonterminal()) {
      common.assert(sourceInterval === baseInterval);
    }
    this._childWrappers = [];
  }

  toString() {
    return '[semantics wrapper for ' + this._node.grammar.name + ']';
  };

  // This is used by ohm editor to display a node wrapper appropriately.
  toJSON() {
    return this.toString();
  }

  _forgetMemoizedResultFor(attributeName) {
    // Remove the memoized attribute from the cstNode and all its children.
    delete this._node[this._semantics.attributeKeys[attributeName]];
    this.children.forEach(child => {
      child._forgetMemoizedResultFor(attributeName);
    });
  }

  // Returns the wrapper of the specified child node. Child wrappers are created lazily and
  // cached in the parent wrapper's `_childWrappers` instance variable.
  child(idx) {
    if (!(0 <= idx && idx < this._node.numChildren())) {
      // TODO: Consider throwing an exception here.
      return undefined;
    }
    let childWrapper = this._childWrappers[idx];
    if (!childWrapper) {
      const childNode = this._node.childAt(idx);
      const offset = this._node.childOffsets[idx];

      const source = this._baseInterval.subInterval(offset, childNode.matchLength);
      const base = childNode.isNonterminal() ? source : this._baseInterval;
      childWrapper = this._childWrappers[idx] = this._semantics.wrap(childNode, source, base);
    }
    return childWrapper;
  }

  // Returns an array containing the wrappers of all of the children of the node associated
  // with this wrapper.
  _children() {
    // Force the creation of all child wrappers
    for (let idx = 0; idx < this._node.numChildren(); idx++) {
      this.child(idx);
    }
    return this._childWrappers;
  }

  // Returns `true` if the CST node associated with this wrapper corresponds to an iteration
  // expression, i.e., a Kleene-*, Kleene-+, or an optional. Returns `false` otherwise.
  isIteration() {
    return this._node.isIteration();
  }

  // Returns `true` if the CST node associated with this wrapper is a terminal node, `false`
  // otherwise.
  isTerminal() {
    return this._node.isTerminal();
  }

  // Returns `true` if the CST node associated with this wrapper is a nonterminal node, `false`
  // otherwise.
  isNonterminal() {
    return this._node.isNonterminal();
  }

  // Returns `true` if the CST node associated with this wrapper is a nonterminal node
  // corresponding to a syntactic rule, `false` otherwise.
  isSyntactic() {
    return this.isNonterminal() && this._node.isSyntactic();
  }

  // Returns `true` if the CST node associated with this wrapper is a nonterminal node
  // corresponding to a lexical rule, `false` otherwise.
  isLexical() {
    return this.isNonterminal() && this._node.isLexical();
  }

  // Returns `true` if the CST node associated with this wrapper is an iterator node
  // having either one or no child (? operator), `false` otherwise.
  // Otherwise, throws an exception.
  isOptional() {
    return this._node.isOptional();
  }

  // Create a new _iter wrapper in the same semantics as this wrapper.
  iteration(optChildWrappers) {
    const childWrappers = optChildWrappers || [];

    const childNodes = childWrappers.map(c => c._node);
    const iter = new IterationNode(this._node.grammar, childNodes, [], -1, false);

    const wrapper = this._semantics.wrap(iter, null, null);
    wrapper._childWrappers = childWrappers;
    return wrapper;
  }

  // Returns an array containing the children of this CST node.
  get children() {
    return this._children();
  }

  // Returns the name of grammar rule that created this CST node.
  get ctorName() {
    return this._node.ctorName;
  }

  // TODO: Remove this eventually (deprecated in v0.12).
  get interval() {
    throw new Error('The `interval` property is deprecated -- use `source` instead');
  }

  // Returns the number of children of this CST node.
  get numChildren() {
    return this._node.numChildren();
  }

  // Returns the primitive value of this CST node, if it's a terminal node. Otherwise,
  // throws an exception.
  get primitiveValue() {
    if (this.isTerminal()) {
      return this._node.primitiveValue;
    }
    throw new TypeError(
        "tried to access the 'primitiveValue' attribute of a non-terminal CST node");
  }

  // Returns the contents of the input stream consumed by this CST node.
  get sourceString() {
    return this.source.contents;
  }
}

// ----------------- Semantics -----------------

// A Semantics is a container for a family of Operations and Attributes for a given grammar.
// Semantics enable modularity (different clients of a grammar can create their set of operations
// and attributes in isolation) and extensibility even when operations and attributes are mutually-
// recursive. This constructor should not be called directly except from
// `Semantics.createSemantics`. The normal ways to create a Semantics, given a grammar 'g', are
// `g.createSemantics()` and `g.extendSemantics(parentSemantics)`.
function Semantics(grammar, superSemantics) {
  const self = this;
  this.grammar = grammar;
  this.checkedActionDicts = false;

  // Constructor for wrapper instances, which are passed as the arguments to the semantic actions
  // of an operation or attribute. Operations and attributes require double dispatch: the semantic
  // action is chosen based on both the node's type and the semantics. Wrappers ensure that
  // the `execute` method is called with the correct (most specific) semantics object as an
  // argument.
  this.Wrapper = class extends (superSemantics ? superSemantics.Wrapper : Wrapper) {
    constructor(node, sourceInterval, baseInterval) {
      super(node, sourceInterval, baseInterval);
      self.checkActionDictsIfHaventAlready();
      this._semantics = self;
    }
  };

  this.super = superSemantics;
  if (superSemantics) {
    if (!(grammar.equals(this.super.grammar) || grammar._inheritsFrom(this.super.grammar))) {
      throw new Error(
          "Cannot extend a semantics for grammar '" + this.super.grammar.name +
          "' for use with grammar '" + grammar.name + "' (not a sub-grammar)");
    }
    this.operations = Object.create(this.super.operations);
    this.attributes = Object.create(this.super.attributes);
    this.attributeKeys = Object.create(null);

    // Assign unique symbols for each of the attributes inherited from the super-semantics so that
    // they are memoized independently.
    for (const attributeName in this.attributes) {
      Object.defineProperty(this.attributeKeys, attributeName, {
        value: util.uniqueId(attributeName)
      });
    }
  } else {
    this.operations = Object.create(null);
    this.attributes = Object.create(null);
    this.attributeKeys = Object.create(null);
  }
}

Semantics.prototype.toString = function() {
  return '[semantics for ' + this.grammar.name + ']';
};

Semantics.prototype.checkActionDictsIfHaventAlready = function() {
  if (!this.checkedActionDicts) {
    this.checkActionDicts();
    this.checkedActionDicts = true;
  }
};

// Checks that the action dictionaries for all operations and attributes in this semantics,
// including the ones that were inherited from the super-semantics, agree with the grammar.
// Throws an exception if one or more of them doesn't.
Semantics.prototype.checkActionDicts = function() {
  let name;
  for (name in this.operations) {
    this.operations[name].checkActionDict(this.grammar);
  }
  for (name in this.attributes) {
    this.attributes[name].checkActionDict(this.grammar);
  }
};

Semantics.prototype.toRecipe = function(semanticsOnly) {
  function hasSuperSemantics(s) {
    return s.super !== Semantics.BuiltInSemantics._getSemantics();
  }

  let str = '(function(g) {\n';
  if (hasSuperSemantics(this)) {
    str += '  var semantics = ' + this.super.toRecipe(true) + '(g';

    const superSemanticsGrammar = this.super.grammar;
    let relatedGrammar = this.grammar;
    while (relatedGrammar !== superSemanticsGrammar) {
      str += '.superGrammar';
      relatedGrammar = relatedGrammar.superGrammar;
    }

    str += ');\n';
    str += '  return g.extendSemantics(semantics)';
  } else {
    str += '  return g.createSemantics()';
  }
  ['Operation', 'Attribute'].forEach(type => {
    const semanticOperations = this[type.toLowerCase() + 's'];
    Object.keys(semanticOperations).forEach(name => {
      const {actionDict, formals, builtInDefault} = semanticOperations[name];

      let signature = name;
      if (formals.length > 0) {
        signature += '(' + formals.join(', ') + ')';
      }

      let method;
      if (hasSuperSemantics(this) && this.super[type.toLowerCase() + 's'][name]) {
        method = 'extend' + type;
      } else {
        method = 'add' + type;
      }
      str += '\n    .' + method + '(' + JSON.stringify(signature) + ', {';

      const srcArray = [];
      Object.keys(actionDict).forEach(actionName => {
        if (actionDict[actionName] !== builtInDefault) {
          let source = actionDict[actionName].toString().trim();

          // Convert method shorthand to plain old function syntax.
          // https://github.com/harc/ohm/issues/263
          source = source.replace(/^.*\(/, 'function(');

          srcArray.push('\n      ' + JSON.stringify(actionName) + ': ' + source);
        }
      });
      str += srcArray.join(',') + '\n    })';
    });
  });
  str += ';\n  })';

  if (!semanticsOnly) {
    str =
      '(function() {\n' +
      '  var grammar = this.fromRecipe(' + jsonToJS(this.grammar.toRecipe()) + ');\n' +
      '  var semantics = ' + str + '(grammar);\n' +
      '  return semantics;\n' +
      '});\n';
  }

  return str;
};

function parseSignature(signature, type) {
  if (!prototypeGrammar) {
    // The Operations and Attributes grammar won't be available while Ohm is loading,
    // but we can get away the following simplification b/c none of the operations
    // that are used while loading take arguments.
    common.assert(signature.indexOf('(') === -1);
    return {
      name: signature,
      formals: []
    };
  }

  const r = prototypeGrammar.match(
      signature,
      type === 'operation' ? 'OperationSignature' : 'AttributeSignature');
  if (r.failed()) {
    throw new Error(r.message);
  }

  return prototypeGrammarSemantics(r).parse();
}

function newDefaultAction(type, name, doIt) {
  return function(children) {
    const self = this;
    const thisThing = this._semantics.operations[name] || this._semantics.attributes[name];
    const args = thisThing.formals.map(formal => self.args[formal]);

    if (this.isIteration()) {
      // This CST node corresponds to an iteration expression in the grammar (*, +, or ?). The
      // default behavior is to map this operation or attribute over all of its child nodes.
      return children.map(child => doIt.apply(child, args));
    }

    // This CST node corresponds to a non-terminal in the grammar (e.g., AddExpr). The fact that
    // we got here means that this action dictionary doesn't have an action for this particular
    // non-terminal or a generic `_nonterminal` action.
    if (children.length === 1) {
      // As a convenience, if this node only has one child, we just return the result of
      // applying this operation / attribute to the child node.
      return doIt.apply(children[0], args);
    } else {
      // Otherwise, we throw an exception to let the programmer know that we don't know what
      // to do with this node.
      throw errors.missingSemanticAction(this.ctorName, name, type, globalActionStack);
    }
  };
}

Semantics.prototype.addOperationOrAttribute = function(type, signature, actionDict) {
  const typePlural = type + 's';

  const parsedNameAndFormalArgs = parseSignature(signature, type);
  const name = parsedNameAndFormalArgs.name;
  const formals = parsedNameAndFormalArgs.formals;

  // TODO: check that there are no duplicate formal arguments

  this.assertNewName(name, type);

  // Create the action dictionary for this operation / attribute that contains a `_default` action
  // which defines the default behavior of iteration, terminal, and non-terminal nodes...
  const builtInDefault = newDefaultAction(type, name, doIt);
  const realActionDict = {_default: builtInDefault};
  // ... and add in the actions supplied by the programmer, which may override some or all of the
  // default ones.
  Object.keys(actionDict).forEach(name => {
    realActionDict[name] = actionDict[name];
  });

  const entry = type === 'operation' ?
      new Operation(name, formals, realActionDict, builtInDefault) :
      new Attribute(name, realActionDict, builtInDefault);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  entry.checkActionDict(this.grammar);

  this[typePlural][name] = entry;

  function doIt() {
    // Dispatch to most specific version of this operation / attribute -- it may have been
    // overridden by a sub-semantics.
    const thisThing = this._semantics[typePlural][name];

    // Check that the caller passed the correct number of arguments.
    if (arguments.length !== thisThing.formals.length) {
      throw new Error(
          'Invalid number of arguments passed to ' + name + ' ' + type + ' (expected ' +
          thisThing.formals.length + ', got ' + arguments.length + ')');
    }

    // Create an "arguments object" from the arguments that were passed to this
    // operation / attribute.
    const args = Object.create(null);
    for (let idx = 0; idx < arguments.length; idx++) {
      const formal = thisThing.formals[idx];
      args[formal] = arguments[idx];
    }

    const oldArgs = this.args;
    this.args = args;
    const ans = thisThing.execute(this._semantics, this);
    this.args = oldArgs;
    return ans;
  }

  if (type === 'operation') {
    this.Wrapper.prototype[name] = doIt;
    this.Wrapper.prototype[name].toString = function() {
      return '[' + name + ' operation]';
    };
  } else {
    Object.defineProperty(this.Wrapper.prototype, name, {
      get: doIt,
      configurable: true // So the property can be deleted.
    });
    Object.defineProperty(this.attributeKeys, name, {
      value: util.uniqueId(name)
    });
  }
};

Semantics.prototype.extendOperationOrAttribute = function(type, name, actionDict) {
  const typePlural = type + 's';

  // Make sure that `name` really is just a name, i.e., that it doesn't also contain formals.
  parseSignature(name, 'attribute');

  if (!(this.super && name in this.super[typePlural])) {
    throw new Error('Cannot extend ' + type + " '" + name +
        "': did not inherit an " + type + ' with that name');
  }
  if (Object.prototype.hasOwnProperty.call(this[typePlural], name)) {
    throw new Error('Cannot extend ' + type + " '" + name + "' again");
  }

  // Create a new operation / attribute whose actionDict delegates to the super operation /
  // attribute's actionDict, and which has all the keys from `inheritedActionDict`.
  const inheritedFormals = this[typePlural][name].formals;
  const inheritedActionDict = this[typePlural][name].actionDict;
  const newActionDict = Object.create(inheritedActionDict);
  Object.keys(actionDict).forEach(name => {
    newActionDict[name] = actionDict[name];
  });

  this[typePlural][name] = type === 'operation' ?
      new Operation(name, inheritedFormals, newActionDict) :
      new Attribute(name, newActionDict);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  this[typePlural][name].checkActionDict(this.grammar);
};

Semantics.prototype.assertNewName = function(name, type) {
  if (Wrapper.prototype.hasOwnProperty(name)) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': that's a reserved name");
  }
  if (name in this.operations) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': an operation with that name already exists");
  }
  if (name in this.attributes) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': an attribute with that name already exists");
  }
};

// Returns a wrapper for the given CST `node` in this semantics.
// If `node` is already a wrapper, returns `node` itself.  // TODO: why is this needed?
Semantics.prototype.wrap = function(node, source, optBaseInterval) {
  const baseInterval = optBaseInterval || source;
  return node instanceof this.Wrapper ? node : new this.Wrapper(node, source, baseInterval);
};

// Creates a new Semantics instance for `grammar`, inheriting operations and attributes from
// `optSuperSemantics`, if it is specified. Returns a function that acts as a proxy for the new
// Semantics instance. When that function is invoked with a CST node as an argument, it returns
// a wrapper for that node which gives access to the operations and attributes provided by this
// semantics.
Semantics.createSemantics = function(grammar, optSuperSemantics) {
  const s = new Semantics(
      grammar,
      optSuperSemantics !== undefined ?
          optSuperSemantics :
          Semantics.BuiltInSemantics._getSemantics());

  // To enable clients to invoke a semantics like a function, return a function that acts as a proxy
  // for `s`, which is the real `Semantics` instance.
  const proxy = function ASemantics(matchResult) {
    if (!(matchResult instanceof MatchResult)) {
      throw new TypeError(
          'Semantics expected a MatchResult, but got ' + common.unexpectedObjToString(matchResult));
    }
    if (matchResult.failed()) {
      throw new TypeError('cannot apply Semantics to ' + matchResult.toString());
    }

    const cst = matchResult._cst;
    if (cst.grammar !== grammar) {
      throw new Error(
          "Cannot use a MatchResult from grammar '" + cst.grammar.name +
          "' with a semantics for '" + grammar.name + "'");
    }
    const inputStream = new InputStream(matchResult.input);
    return s.wrap(cst, inputStream.interval(matchResult._cstOffset, matchResult.input.length));
  };

  // Forward public methods from the proxy to the semantics instance.
  proxy.addOperation = function(signature, actionDict) {
    s.addOperationOrAttribute('operation', signature, actionDict);
    return proxy;
  };
  proxy.extendOperation = function(name, actionDict) {
    s.extendOperationOrAttribute('operation', name, actionDict);
    return proxy;
  };
  proxy.addAttribute = function(name, actionDict) {
    s.addOperationOrAttribute('attribute', name, actionDict);
    return proxy;
  };
  proxy.extendAttribute = function(name, actionDict) {
    s.extendOperationOrAttribute('attribute', name, actionDict);
    return proxy;
  };
  proxy._getActionDict = function(operationOrAttributeName) {
    const action = s.operations[operationOrAttributeName] || s.attributes[operationOrAttributeName];
    if (!action) {
      throw new Error('"' + operationOrAttributeName + '" is not a valid operation or attribute ' +
        'name in this semantics for "' + grammar.name + '"');
    }
    return action.actionDict;
  };
  proxy._remove = function(operationOrAttributeName) {
    let semantic;
    if (operationOrAttributeName in s.operations) {
      semantic = s.operations[operationOrAttributeName];
      delete s.operations[operationOrAttributeName];
    } else if (operationOrAttributeName in s.attributes) {
      semantic = s.attributes[operationOrAttributeName];
      delete s.attributes[operationOrAttributeName];
    }
    delete s.Wrapper.prototype[operationOrAttributeName];
    return semantic;
  };
  proxy.getOperationNames = function() {
    return Object.keys(s.operations);
  };
  proxy.getAttributeNames = function() {
    return Object.keys(s.attributes);
  };
  proxy.getGrammar = function() {
    return s.grammar;
  };
  proxy.toRecipe = function(semanticsOnly) {
    return s.toRecipe(semanticsOnly);
  };

  // Make the proxy's toString() work.
  proxy.toString = s.toString.bind(s);

  // Returns the semantics for the proxy.
  proxy._getSemantics = function() {
    return s;
  };

  return proxy;
};

// ----------------- Operation -----------------

// An Operation represents a function to be applied to a concrete syntax tree (CST) -- it's very
// similar to a Visitor (http://en.wikipedia.org/wiki/Visitor_pattern). An operation is executed by
// recursively walking the CST, and at each node, invoking the matching semantic action from
// `actionDict`. See `Operation.prototype.execute` for details of how a CST node's matching semantic
// action is found.
class Operation {
  constructor(name, formals, actionDict, builtInDefault) {
    this.name = name;
    this.formals = formals;
    this.actionDict = actionDict;
    this.builtInDefault = builtInDefault;
  }

  checkActionDict(grammar) {
    grammar._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
  }

  // Execute this operation on the CST node associated with `nodeWrapper` in the context of the
  // given Semantics instance.
  execute(semantics, nodeWrapper) {
    try {
      // Look for a semantic action whose name matches the node's constructor name, which is either
      // the name of a rule in the grammar, or '_terminal' (for a terminal node), or '_iter' (for an
      // iteration node). In the latter case, the action function receives a single argument, which
      // is an array containing all of the children of the CST node.
      const ctorName = nodeWrapper._node.ctorName;
      let actionFn = this.actionDict[ctorName];
      let ans;
      if (actionFn) {
        globalActionStack.push([this, ctorName]);
        ans = this.doAction(semantics, nodeWrapper, actionFn, nodeWrapper.isIteration());
        return ans;
      }

      // The action dictionary does not contain a semantic action for this specific type of node.
      // If this is a nonterminal node and the programmer has provided a `_nonterminal` semantic
      // action, we invoke it:
      if (nodeWrapper.isNonterminal()) {
        actionFn = this.actionDict._nonterminal;
        if (actionFn) {
          globalActionStack.push([this, '_nonterminal', ctorName]);
          ans = this.doAction(semantics, nodeWrapper, actionFn, true);
          return ans;
        }
      }

      // Otherwise, we invoke the '_default' semantic action.
      globalActionStack.push([this, 'default action', ctorName]);
      ans = this.doAction(semantics, nodeWrapper, this.actionDict._default, true);
      return ans;
    } finally {
      globalActionStack.pop();
    }
  }

  // Invoke `actionFn` on the CST node that corresponds to `nodeWrapper`, in the context of
  // `semantics`. If `optPassChildrenAsArray` is truthy, `actionFn` will be called with a single
  // argument, which is an array of wrappers. Otherwise, the number of arguments to `actionFn` will
  // be equal to the number of children in the CST node.
  doAction(semantics, nodeWrapper, actionFn, optPassChildrenAsArray) {
    return optPassChildrenAsArray ?
        actionFn.call(nodeWrapper, nodeWrapper._children()) :
        actionFn.apply(nodeWrapper, nodeWrapper._children());
  }
}

Operation.prototype.typeName = 'operation';

// ----------------- Attribute -----------------

// Attributes are Operations whose results are memoized. This means that, for any given semantics,
// the semantic action for a CST node will be invoked no more than once.
class Attribute extends Operation {
  constructor(name, actionDict, builtInDefault) {
    super(name, [], actionDict, builtInDefault);
  }

  execute(semantics, nodeWrapper) {
    const node = nodeWrapper._node;
    const key = semantics.attributeKeys[this.name];
    if (!node.hasOwnProperty(key)) {
      // The following is a super-send -- isn't JS beautiful? :/
      node[key] = Operation.prototype.execute.call(this, semantics, nodeWrapper);
    }
    return node[key];
  }
}

Attribute.prototype.typeName = 'attribute';


// ----------------- Deferred initialization -----------------

util.awaitBuiltInRules(builtInRules => {
  const operationsAndAttributesGrammar = __webpack_require__(/*! ../dist/operations-and-attributes */ "./node_modules/ohm-js/dist/operations-and-attributes.js");
  initBuiltInSemantics(builtInRules);
  initPrototypeParser(operationsAndAttributesGrammar); // requires BuiltInSemantics
});

function initBuiltInSemantics(builtInRules) {
  const actions = {
    empty() {
      return this.iteration();
    },
    nonEmpty(first, _, rest) {
      return this.iteration([first].concat(rest.children));
    }
  };

  Semantics.BuiltInSemantics = Semantics
      .createSemantics(builtInRules, null)
      .addOperation('asIteration', {
        emptyListOf: actions.empty,
        nonemptyListOf: actions.nonEmpty,
        EmptyListOf: actions.empty,
        NonemptyListOf: actions.nonEmpty
      });
}

function initPrototypeParser(grammar) {
  prototypeGrammarSemantics = grammar.createSemantics().addOperation('parse', {
    AttributeSignature(name) {
      return {
        name: name.parse(),
        formals: []
      };
    },
    OperationSignature(name, optFormals) {
      return {
        name: name.parse(),
        formals: optFormals.parse()[0] || []
      };
    },
    Formals(oparen, fs, cparen) {
      return fs.asIteration().parse();
    },
    name(first, rest) {
      return this.sourceString;
    }
  });
  prototypeGrammar = grammar;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Semantics;


/***/ }),

/***/ "./node_modules/ohm-js/src/Trace.js":
/*!******************************************!*\
  !*** ./node_modules/ohm-js/src/Trace.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const Interval = __webpack_require__(/*! ./Interval */ "./node_modules/ohm-js/src/Interval.js");
const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Unicode characters that are used in the `toString` output.
const BALLOT_X = '\u2717';
const CHECK_MARK = '\u2713';
const DOT_OPERATOR = '\u22C5';
const RIGHTWARDS_DOUBLE_ARROW = '\u21D2';
const SYMBOL_FOR_HORIZONTAL_TABULATION = '\u2409';
const SYMBOL_FOR_LINE_FEED = '\u240A';
const SYMBOL_FOR_CARRIAGE_RETURN = '\u240D';

const Flags = {
  succeeded: 1 << 0,
  isRootNode: 1 << 1,
  isImplicitSpaces: 1 << 2,
  isMemoized: 1 << 3,
  isHeadOfLeftRecursion: 1 << 4,
  terminatesLR: 1 << 5
};

function spaces(n) {
  return common.repeat(' ', n).join('');
}

// Return a string representation of a portion of `input` at offset `pos`.
// The result will contain exactly `len` characters.
function getInputExcerpt(input, pos, len) {
  const excerpt = asEscapedString(input.slice(pos, pos + len));

  // Pad the output if necessary.
  if (excerpt.length < len) {
    return excerpt + common.repeat(' ', len - excerpt.length).join('');
  }
  return excerpt;
}

function asEscapedString(obj) {
  if (typeof obj === 'string') {
    // Replace non-printable characters with visible symbols.
    return obj
        .replace(/ /g, DOT_OPERATOR)
        .replace(/\t/g, SYMBOL_FOR_HORIZONTAL_TABULATION)
        .replace(/\n/g, SYMBOL_FOR_LINE_FEED)
        .replace(/\r/g, SYMBOL_FOR_CARRIAGE_RETURN);
  }
  return String(obj);
}

// ----------------- Trace -----------------

function Trace(input, pos1, pos2, expr, succeeded, bindings, optChildren) {
  this.input = input;
  this.pos = this.pos1 = pos1;
  this.pos2 = pos2;
  this.source = new Interval(input, pos1, pos2);
  this.expr = expr;
  this.bindings = bindings;
  this.children = optChildren || [];
  this.terminatingLREntry = null;

  this._flags = succeeded ? Flags.succeeded : 0;
}

// A value that can be returned from visitor functions to indicate that a
// node should not be recursed into.
Trace.prototype.SKIP = {};

Object.defineProperty(Trace.prototype, 'displayString', {
  get() { return this.expr.toDisplayString(); }
});

// For convenience, create a getter and setter for the boolean flags in `Flags`.
Object.keys(Flags).forEach(name => {
  const mask = Flags[name];
  Object.defineProperty(Trace.prototype, name, {
    get() {
      return (this._flags & mask) !== 0;
    },
    set(val) {
      if (val) {
        this._flags |= mask;
      } else {
        this._flags &= ~mask;
      }
    }
  });
});

Trace.prototype.clone = function() {
  return this.cloneWithExpr(this.expr);
};

Trace.prototype.cloneWithExpr = function(expr) {
  const ans = new Trace(
      this.input, this.pos, this.pos2, expr, this.succeeded, this.bindings, this.children);

  ans.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion;
  ans.isImplicitSpaces = this.isImplicitSpaces;
  ans.isMemoized = this.isMemoized;
  ans.isRootNode = this.isRootNode;
  ans.terminatesLR = this.terminatesLR;
  ans.terminatingLREntry = this.terminatingLREntry;
  return ans;
};

// Record the trace information for the terminating condition of the LR loop.
Trace.prototype.recordLRTermination = function(ruleBodyTrace, value) {
  this.terminatingLREntry =
      new Trace(this.input, this.pos, this.pos2, this.expr, false, [value], [ruleBodyTrace]);
  this.terminatingLREntry.terminatesLR = true;
};

// Recursively traverse this trace node and all its descendents, calling a visitor function
// for each node that is visited. If `vistorObjOrFn` is an object, then its 'enter' property
// is a function to call before visiting the children of a node, and its 'exit' property is
// a function to call afterwards. If `visitorObjOrFn` is a function, it represents the 'enter'
// function.
//
// The functions are called with three arguments: the Trace node, its parent Trace, and a number
// representing the depth of the node in the tree. (The root node has depth 0.) `optThisArg`, if
// specified, is the value to use for `this` when executing the visitor functions.
Trace.prototype.walk = function(visitorObjOrFn, optThisArg) {
  let visitor = visitorObjOrFn;
  if (typeof visitor === 'function') {
    visitor = {enter: visitor};
  }

  function _walk(node, parent, depth) {
    let recurse = true;
    if (visitor.enter) {
      if (visitor.enter.call(optThisArg, node, parent, depth) === Trace.prototype.SKIP) {
        recurse = false;
      }
    }
    if (recurse) {
      node.children.forEach(child => {
        _walk(child, node, depth + 1);
      });
      if (visitor.exit) {
        visitor.exit.call(optThisArg, node, parent, depth);
      }
    }
  }
  if (this.isRootNode) {
    // Don't visit the root node itself, only its children.
    this.children.forEach(c => { _walk(c, null, 0); });
  } else {
    _walk(this, null, 0);
  }
};

// Return a string representation of the trace.
// Sample:
//     12⋅+⋅2⋅*⋅3 ✓ exp ⇒  "12"
//     12⋅+⋅2⋅*⋅3   ✓ addExp (LR) ⇒  "12"
//     12⋅+⋅2⋅*⋅3       ✗ addExp_plus
Trace.prototype.toString = function() {
  const sb = new common.StringBuffer();
  this.walk((node, parent, depth) => {
    if (!node) {
      return this.SKIP;
    }
    const ctorName = node.expr.constructor.name;
    // Don't print anything for Alt nodes.
    if (ctorName === 'Alt') {
      return; // eslint-disable-line consistent-return
    }
    sb.append(getInputExcerpt(node.input, node.pos, 10) + spaces(depth * 2 + 1));
    sb.append((node.succeeded ? CHECK_MARK : BALLOT_X) + ' ' + node.displayString);
    if (node.isHeadOfLeftRecursion) {
      sb.append(' (LR)');
    }
    if (node.succeeded) {
      const contents = asEscapedString(node.source.contents);
      sb.append(' ' + RIGHTWARDS_DOUBLE_ARROW + '  ');
      sb.append(typeof contents === 'string' ? '"' + contents + '"' : contents);
    }
    sb.append('\n');
  });
  return sb.contents();
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Trace;


/***/ }),

/***/ "./node_modules/ohm-js/src/common.js":
/*!*******************************************!*\
  !*** ./node_modules/ohm-js/src/common.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const extend = __webpack_require__(/*! util-extend */ "./node_modules/util-extend/extend.js");

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Helpers

const escapeStringFor = {};
for (let c = 0; c < 128; c++) {
  escapeStringFor[c] = String.fromCharCode(c);
}
escapeStringFor["'".charCodeAt(0)] = "\\'";
escapeStringFor['"'.charCodeAt(0)] = '\\"';
escapeStringFor['\\'.charCodeAt(0)] = '\\\\';
escapeStringFor['\b'.charCodeAt(0)] = '\\b';
escapeStringFor['\f'.charCodeAt(0)] = '\\f';
escapeStringFor['\n'.charCodeAt(0)] = '\\n';
escapeStringFor['\r'.charCodeAt(0)] = '\\r';
escapeStringFor['\t'.charCodeAt(0)] = '\\t';
escapeStringFor['\u000b'.charCodeAt(0)] = '\\v';

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.abstract = function(optMethodName) {
  const methodName = optMethodName || '';
  return function() {
    throw new Error(
        'this method ' + methodName + ' is abstract! ' +
      '(it has no implementation in class ' + this.constructor.name + ')');
  };
};

exports.assert = function(cond, message) {
  if (!cond) {
    throw new Error(message);
  }
};

// Define a lazily-computed, non-enumerable property named `propName`
// on the object `obj`. `getterFn` will be called to compute the value the
// first time the property is accessed.
exports.defineLazyProperty = function(obj, propName, getterFn) {
  let memo;
  Object.defineProperty(obj, propName, {
    get() {
      if (!memo) {
        memo = getterFn.call(this);
      }
      return memo;
    }
  });
};

exports.clone = function(obj) {
  if (obj) {
    return extend({}, obj);
  }
  return obj;
};

exports.extend = extend;

exports.repeatFn = function(fn, n) {
  const arr = [];
  while (n-- > 0) {
    arr.push(fn());
  }
  return arr;
};

exports.repeatStr = function(str, n) {
  return new Array(n + 1).join(str);
};

exports.repeat = function(x, n) {
  return exports.repeatFn(() => x, n);
};

exports.getDuplicates = function(array) {
  const duplicates = [];
  for (let idx = 0; idx < array.length; idx++) {
    const x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
};

exports.copyWithoutDuplicates = function(array) {
  const noDuplicates = [];
  array.forEach(entry => {
    if (noDuplicates.indexOf(entry) < 0) {
      noDuplicates.push(entry);
    }
  });
  return noDuplicates;
};

exports.isSyntactic = function(ruleName) {
  const firstChar = ruleName[0];
  return firstChar === firstChar.toUpperCase();
};

exports.isLexical = function(ruleName) {
  return !exports.isSyntactic(ruleName);
};

exports.padLeft = function(str, len, optChar) {
  const ch = optChar || ' ';
  if (str.length < len) {
    return exports.repeatStr(ch, len - str.length) + str;
  }
  return str;
};

// StringBuffer

exports.StringBuffer = function() {
  this.strings = [];
};

exports.StringBuffer.prototype.append = function(str) {
  this.strings.push(str);
};

exports.StringBuffer.prototype.contents = function() {
  return this.strings.join('');
};

// Character escaping and unescaping

exports.escapeChar = function(c, optDelim) {
  const charCode = c.charCodeAt(0);
  if ((c === '"' || c === "'") && optDelim && c !== optDelim) {
    return c;
  } else if (charCode < 128) {
    return escapeStringFor[charCode];
  } else if (128 <= charCode && charCode < 256) {
    return '\\x' + exports.padLeft(charCode.toString(16), 2, '0');
  } else {
    return '\\u' + exports.padLeft(charCode.toString(16), 4, '0');
  }
};

exports.unescapeChar = function(s) {
  if (s.charAt(0) === '\\') {
    switch (s.charAt(1)) {
      case 'b': return '\b';
      case 'f': return '\f';
      case 'n': return '\n';
      case 'r': return '\r';
      case 't': return '\t';
      case 'v': return '\v';
      case 'x': return String.fromCharCode(parseInt(s.substring(2, 4), 16));
      case 'u': return String.fromCharCode(parseInt(s.substring(2, 6), 16));
      default: return s.charAt(1);
    }
  } else {
    return s;
  }
};

// Helper for producing a description of an unknown object in a safe way.
// Especially useful for error messages where an unexpected type of object was encountered.
exports.unexpectedObjToString = function(obj) {
  if (obj == null) {
    return String(obj);
  }
  const baseToString = Object.prototype.toString.call(obj);
  try {
    let typeName;
    if (obj.constructor && obj.constructor.name) {
      typeName = obj.constructor.name;
    } else if (baseToString.indexOf('[object ') === 0) {
      typeName = baseToString.slice(8, -1); // Extract e.g. "Array" from "[object Array]".
    } else {
      typeName = typeof obj;
    }
    return typeName + ': ' + JSON.stringify(String(obj));
  } catch (e) {
    return baseToString;
  }
};


/***/ }),

/***/ "./node_modules/ohm-js/src/errors.js":
/*!*******************************************!*\
  !*** ./node_modules/ohm-js/src/errors.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

const Namespace = __webpack_require__(/*! ./Namespace */ "./node_modules/ohm-js/src/Namespace.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function createError(message, optInterval) {
  let e;
  if (optInterval) {
    e = new Error(optInterval.getLineAndColumnMessage() + message);
    e.shortMessage = message;
    e.interval = optInterval;
  } else {
    e = new Error(message);
  }
  return e;
}

// ----------------- errors about intervals -----------------

function intervalSourcesDontMatch() {
  return createError("Interval sources don't match");
}

// ----------------- errors about grammars -----------------

// Grammar syntax error

function grammarSyntaxError(matchFailure) {
  const e = new Error();
  Object.defineProperty(e, 'message', {
    enumerable: true,
    get() {
      return matchFailure.message;
    }
  });
  Object.defineProperty(e, 'shortMessage', {
    enumerable: true,
    get() {
      return 'Expected ' + matchFailure.getExpectedText();
    }
  });
  e.interval = matchFailure.getInterval();
  return e;
}

// Undeclared grammar

function undeclaredGrammar(grammarName, namespace, interval) {
  const message = namespace ?
      'Grammar ' + grammarName + ' is not declared in namespace ' + Namespace.toString(namespace) :
      'Undeclared grammar ' + grammarName;
  return createError(message, interval);
}

// Duplicate grammar declaration

function duplicateGrammarDeclaration(grammar, namespace) {
  return createError('Grammar ' + grammar.name + ' is already declared in this namespace');
}

// ----------------- rules -----------------

// Undeclared rule

function undeclaredRule(ruleName, grammarName, optInterval) {
  return createError(
      'Rule ' + ruleName + ' is not declared in grammar ' + grammarName,
      optInterval);
}

// Cannot override undeclared rule

function cannotOverrideUndeclaredRule(ruleName, grammarName, optSource) {
  return createError(
      'Cannot override rule ' + ruleName + ' because it is not declared in ' + grammarName,
      optSource);
}

// Cannot extend undeclared rule

function cannotExtendUndeclaredRule(ruleName, grammarName, optSource) {
  return createError(
      'Cannot extend rule ' + ruleName + ' because it is not declared in ' + grammarName,
      optSource);
}

// Duplicate rule declaration

function duplicateRuleDeclaration(ruleName, grammarName, declGrammarName, optSource) {
  let message = "Duplicate declaration for rule '" + ruleName +
      "' in grammar '" + grammarName + "'";
  if (grammarName !== declGrammarName) {
    message += " (originally declared in '" + declGrammarName + "')";
  }
  return createError(message, optSource);
}

// Wrong number of parameters

function wrongNumberOfParameters(ruleName, expected, actual, source) {
  return createError(
      'Wrong number of parameters for rule ' + ruleName +
          ' (expected ' + expected + ', got ' + actual + ')',
      source);
}

// Wrong number of arguments

function wrongNumberOfArguments(ruleName, expected, actual, expr) {
  return createError(
      'Wrong number of arguments for rule ' + ruleName +
          ' (expected ' + expected + ', got ' + actual + ')',
      expr.source);
}

// Duplicate parameter names

function duplicateParameterNames(ruleName, duplicates, source) {
  return createError(
      'Duplicate parameter names in rule ' + ruleName + ': ' + duplicates.join(', '),
      source);
}

// Invalid parameter expression

function invalidParameter(ruleName, expr) {
  return createError(
      'Invalid parameter to rule ' + ruleName + ': ' + expr + ' has arity ' + expr.getArity() +
         ', but parameter expressions must have arity 1',
      expr.source);
}

// Application of syntactic rule from lexical rule

function applicationOfSyntacticRuleFromLexicalContext(ruleName, applyExpr) {
  return createError(
      'Cannot apply syntactic rule ' + ruleName + ' from here (inside a lexical context)',
      applyExpr.source);
}

// Incorrect argument type

function incorrectArgumentType(expectedType, expr) {
  return createError('Incorrect argument type: expected ' + expectedType, expr.source);
}

// Multiple instances of the super-splice operator (`...`) in the rule body.

function multipleSuperSplices(expr) {
  return createError("'...' can appear at most once in a rule body", expr.source);
}

// ----------------- Kleene operators -----------------

function kleeneExprHasNullableOperand(kleeneExpr, applicationStack) {
  const actuals = applicationStack.length > 0 ?
    applicationStack[applicationStack.length - 1].args :
    [];
  const expr = kleeneExpr.expr.substituteParams(actuals);
  let message =
    'Nullable expression ' + expr + " is not allowed inside '" +
    kleeneExpr.operator + "' (possible infinite loop)";
  if (applicationStack.length > 0) {
    const stackTrace = applicationStack
        .map(app => new pexprs.Apply(app.ruleName, app.args))
        .join('\n');
    message += '\nApplication stack (most recent application last):\n' + stackTrace;
  }
  return createError(message, kleeneExpr.expr.source);
}

// ----------------- arity -----------------

function inconsistentArity(ruleName, expected, actual, expr) {
  return createError(
      'Rule ' + ruleName + ' involves an alternation which has inconsistent arity ' +
          '(expected ' + expected + ', got ' + actual + ')',
      expr.source);
}

// ----------------- properties -----------------

function duplicatePropertyNames(duplicates) {
  return createError('Object pattern has duplicate property names: ' + duplicates.join(', '));
}

// ----------------- constructors -----------------

function invalidConstructorCall(grammar, ctorName, children) {
  return createError(
      'Attempt to invoke constructor ' + ctorName + ' with invalid or unexpected arguments');
}

// ----------------- convenience -----------------

function multipleErrors(errors) {
  const messages = errors.map(e => e.message);
  return createError(
      ['Errors:'].concat(messages).join('\n- '),
      errors[0].interval);
}

// ----------------- semantic -----------------

function missingSemanticAction(ctorName, name, type, stack) {
  let stackTrace = stack.slice(0, -1).map(info => {
    const ans = '  ' + info[0].name + ' > ' + info[1];
    return info.length === 3
        ? ans + " for '" + info[2] + "'"
        : ans;
  }).join('\n');
  stackTrace += '\n  ' + name + ' > ' + ctorName;

  const where = type + " '" + name + "'";
  const message = "Missing semantic action for '" + ctorName + "' in " + where + '\n' +
                'Action stack (most recent call last):\n' + stackTrace;

  const e = createError(message);
  e.name = 'missingSemanticAction';
  return e;
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  applicationOfSyntacticRuleFromLexicalContext,
  cannotExtendUndeclaredRule,
  cannotOverrideUndeclaredRule,
  duplicateGrammarDeclaration,
  duplicateParameterNames,
  duplicatePropertyNames,
  duplicateRuleDeclaration,
  inconsistentArity,
  incorrectArgumentType,
  intervalSourcesDontMatch,
  invalidConstructorCall,
  invalidParameter,
  grammarSyntaxError,
  kleeneExprHasNullableOperand,
  missingSemanticAction,
  multipleSuperSplices,
  undeclaredGrammar,
  undeclaredRule,
  wrongNumberOfArguments,
  wrongNumberOfParameters,

  throwErrors(errors) {
    if (errors.length === 1) {
      throw errors[0];
    }
    if (errors.length > 1) {
      throw multipleErrors(errors);
    }
  }
};


/***/ }),

/***/ "./node_modules/ohm-js/src/main.js":
/*!*****************************************!*\
  !*** ./node_modules/ohm-js/src/main.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global document, XMLHttpRequest */



// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const Builder = __webpack_require__(/*! ./Builder */ "./node_modules/ohm-js/src/Builder.js");
const Grammar = __webpack_require__(/*! ./Grammar */ "./node_modules/ohm-js/src/Grammar.js");
const Namespace = __webpack_require__(/*! ./Namespace */ "./node_modules/ohm-js/src/Namespace.js");
const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");
const util = __webpack_require__(/*! ./util */ "./node_modules/ohm-js/src/util.js");
const version = __webpack_require__(/*! ./version */ "./node_modules/ohm-js/src/version.js");

const isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/ohm-js/node_modules/is-buffer/index.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// The metagrammar, i.e. the grammar for Ohm grammars. Initialized at the
// bottom of this file because loading the grammar requires Ohm itself.
let ohmGrammar;

// An object which makes it possible to stub out the document API for testing.
let documentInterface = {
  querySelector(sel) { return document.querySelector(sel); },
  querySelectorAll(sel) { return document.querySelectorAll(sel); }
};

const superSplicePlaceholder = Object.create(pexprs.PExpr.prototype);

// Check if `obj` is a DOM element.
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

function isUndefined(obj) {
  return obj === void 0; // eslint-disable-line no-void
}

const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function isArrayLike(obj) {
  if (obj == null) {
    return false;
  }
  const length = obj.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}

// TODO: just use the jQuery thing
function load(url) {
  const req = new XMLHttpRequest();
  req.open('GET', url, false);
  try {
    req.send();
    if (req.status === 0 || req.status === 200) {
      return req.responseText;
    }
  } catch (e) {}
  throw new Error('unable to load url ' + url);
}

// Returns a Grammar instance (i.e., an object with a `match` method) for
// `tree`, which is the concrete syntax tree of a user-written grammar.
// The grammar will be assigned into `namespace` under the name of the grammar
// as specified in the source.
function buildGrammar(match, namespace, optOhmGrammarForTesting) {
  const builder = new Builder();
  let decl;
  let currentRuleName;
  let currentRuleFormals;
  let overriding = false;
  const metaGrammar = optOhmGrammarForTesting || ohmGrammar;

  // A visitor that produces a Grammar instance from the CST.
  const helpers = metaGrammar.createSemantics().addOperation('visit', {
    Grammar(n, s, open, rs, close) {
      const grammarName = n.visit();
      decl = builder.newGrammar(grammarName, namespace);
      s.visit();
      rs.visit();
      const g = decl.build();
      g.source = this.source.trimmed();
      if (grammarName in namespace) {
        throw errors.duplicateGrammarDeclaration(g, namespace);
      }
      namespace[grammarName] = g;
      return g;
    },

    SuperGrammar(_, n) {
      const superGrammarName = n.visit();
      if (superGrammarName === 'null') {
        decl.withSuperGrammar(null);
      } else {
        if (!namespace || !(superGrammarName in namespace)) {
          throw errors.undeclaredGrammar(superGrammarName, namespace, n.source);
        }
        decl.withSuperGrammar(namespace[superGrammarName]);
      }
    },

    Rule_define(n, fs, d, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      // If there is no default start rule yet, set it now. This must be done before visiting
      // the body, because it might contain an inline rule definition.
      if (!decl.defaultStartRule && decl.ensureSuperGrammar() !== Grammar.ProtoBuiltInRules) {
        decl.withDefaultStartRule(currentRuleName);
      }
      const body = b.visit();
      const description = d.visit()[0];
      const source = this.source.trimmed();
      return decl.define(currentRuleName, currentRuleFormals, body, description, source);
    },
    Rule_override(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];

      const source = this.source.trimmed();
      decl.ensureSuperGrammarRuleForOverriding(currentRuleName, source);

      overriding = true;
      const body = b.visit();
      overriding = false;
      return decl.override(currentRuleName, currentRuleFormals, body, null, source);
    },
    Rule_extend(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      const body = b.visit();
      const source = this.source.trimmed();
      return decl.extend(currentRuleName, currentRuleFormals, body, null, source);
    },
    RuleBody(_, terms) {
      const args = terms.visit();
      return builder.alt.apply(builder, args).withSource(this.source);
    },
    OverrideRuleBody(_, terms) {
      const args = terms.visit();

      // Check if the super-splice operator (`...`) appears in the terms.
      const expansionPos = args.indexOf(superSplicePlaceholder);
      if (expansionPos >= 0) {
        const beforeTerms = args.slice(0, expansionPos);
        const afterTerms = args.slice(expansionPos + 1);

        // Ensure it appears no more than once.
        afterTerms.forEach(t => {
          if (t === superSplicePlaceholder) throw errors.multipleSuperSplices(t);
        });

        return new pexprs.Splice(
            decl.superGrammar, currentRuleName, beforeTerms, afterTerms).withSource(this.source);
      } else {
        return builder.alt.apply(builder, args).withSource(this.source);
      }
    },
    Formals(opointy, fs, cpointy) {
      return fs.visit();
    },

    Params(opointy, ps, cpointy) {
      return ps.visit();
    },

    Alt(seqs) {
      const args = seqs.visit();
      return builder.alt.apply(builder, args).withSource(this.source);
    },

    TopLevelTerm_inline(b, n) {
      const inlineRuleName = currentRuleName + '_' + n.visit();
      const body = b.visit();
      const source = this.source.trimmed();
      const isNewRuleDeclaration =
          !(decl.superGrammar && decl.superGrammar.rules[inlineRuleName]);
      if (overriding && !isNewRuleDeclaration) {
        decl.override(inlineRuleName, currentRuleFormals, body, null, source);
      } else {
        decl.define(inlineRuleName, currentRuleFormals, body, null, source);
      }
      const params = currentRuleFormals.map(formal => builder.app(formal));
      return builder.app(inlineRuleName, params).withSource(body.source);
    },
    OverrideTopLevelTerm_superSplice(_) {
      return superSplicePlaceholder;
    },

    Seq(expr) {
      return builder.seq.apply(builder, expr.visit()).withSource(this.source);
    },

    Iter_star(x, _) {
      return builder.star(x.visit()).withSource(this.source);
    },
    Iter_plus(x, _) {
      return builder.plus(x.visit()).withSource(this.source);
    },
    Iter_opt(x, _) {
      return builder.opt(x.visit()).withSource(this.source);
    },

    Pred_not(_, x) {
      return builder.not(x.visit()).withSource(this.source);
    },
    Pred_lookahead(_, x) {
      return builder.lookahead(x.visit()).withSource(this.source);
    },

    Lex_lex(_, x) {
      return builder.lex(x.visit()).withSource(this.source);
    },

    Base_application(rule, ps) {
      return builder.app(rule.visit(), ps.visit()[0] || []).withSource(this.source);
    },
    Base_range(from, _, to) {
      return builder.range(from.visit(), to.visit()).withSource(this.source);
    },
    Base_terminal(expr) {
      return builder.terminal(expr.visit()).withSource(this.source);
    },
    Base_paren(open, x, close) {
      return x.visit();
    },

    ruleDescr(open, t, close) {
      return t.visit();
    },
    ruleDescrText(_) {
      return this.sourceString.trim();
    },

    caseName(_, space1, n, space2, end) {
      return n.visit();
    },

    name(first, rest) {
      return this.sourceString;
    },
    nameFirst(expr) {},
    nameRest(expr) {},

    terminal(open, cs, close) {
      return cs.visit().join('');
    },

    oneCharTerminal(open, c, close) {
      return c.visit();
    },

    terminalChar(_) {
      return common.unescapeChar(this.sourceString);
    },

    escapeChar(_) {
      return this.sourceString;
    },

    NonemptyListOf(x, _, xs) {
      return [x.visit()].concat(xs.visit());
    },
    EmptyListOf() {
      return [];
    },

    _terminal() {
      return this.primitiveValue;
    }
  });
  return helpers(match).visit();
}

function compileAndLoad(source, namespace) {
  const m = ohmGrammar.match(source, 'Grammars');
  if (m.failed()) {
    throw errors.grammarSyntaxError(m);
  }
  return buildGrammar(m, namespace);
}

// Return the contents of a script element, fetching it via XHR if necessary.
function getScriptElementContents(el) {
  if (!isElement(el)) {
    throw new TypeError('Expected a DOM Node, got ' + common.unexpectedObjToString(el));
  }
  if (el.type !== 'text/ohm-js') {
    throw new Error('Expected a script tag with type="text/ohm-js", got ' + el);
  }
  return el.getAttribute('src') ? load(el.getAttribute('src')) : el.innerHTML;
}

function grammar(source, optNamespace) {
  const ns = grammars(source, optNamespace);

  // Ensure that the source contained no more than one grammar definition.
  const grammarNames = Object.keys(ns);
  if (grammarNames.length === 0) {
    throw new Error('Missing grammar definition');
  } else if (grammarNames.length > 1) {
    const secondGrammar = ns[grammarNames[1]];
    const interval = secondGrammar.source;
    throw new Error(
        util.getLineAndColumnMessage(interval.sourceString, interval.startIdx) +
        'Found more than one grammar definition -- use ohm.grammars() instead.');
  }
  return ns[grammarNames[0]]; // Return the one and only grammar.
}

function grammars(source, optNamespace) {
  const ns = Namespace.extend(Namespace.asNamespace(optNamespace));
  if (typeof source !== 'string') {
    // For convenience, detect Node.js Buffer objects and automatically call toString().
    if (isBuffer(source)) {
      source = source.toString();
    } else {
      throw new TypeError(
          'Expected string as first argument, got ' + common.unexpectedObjToString(source));
    }
  }
  compileAndLoad(source, ns);
  return ns;
}

function grammarFromScriptElement(optNode) {
  let node = optNode;
  if (isUndefined(node)) {
    const nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
    if (nodeList.length !== 1) {
      throw new Error(
          'Expected exactly one script tag with type="text/ohm-js", found ' + nodeList.length);
    }
    node = nodeList[0];
  }
  return grammar(getScriptElementContents(node));
}

function grammarsFromScriptElements(optNodeOrNodeList) {
  // Simple case: the argument is a DOM node.
  if (isElement(optNodeOrNodeList)) {
    return grammars(optNodeOrNodeList);
  }
  // Otherwise, it must be either undefined or a NodeList.
  let nodeList = optNodeOrNodeList;
  if (isUndefined(nodeList)) {
    // Find all script elements with type="text/ohm-js".
    nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
  } else if (typeof nodeList === 'string' || (!isElement(nodeList) && !isArrayLike(nodeList))) {
    throw new TypeError('Expected a Node, NodeList, or Array, but got ' + nodeList);
  }
  const ns = Namespace.createNamespace();
  for (let i = 0; i < nodeList.length; ++i) {
    // Copy the new grammars into `ns` to keep the namespace flat.
    common.extend(ns, grammars(getScriptElementContents(nodeList[i]), ns));
  }
  return ns;
}

function makeRecipe(recipe) {
  if (typeof recipe === 'function') {
    return recipe.call(new Builder());
  } else {
    if (typeof recipe === 'string') {
      // stringified JSON recipe
      recipe = JSON.parse(recipe);
    }
    return (new Builder()).fromRecipe(recipe);
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Stuff that users should know about
module.exports = {
  createNamespace: Namespace.createNamespace,
  grammar,
  grammars,
  grammarFromScriptElement,
  grammarsFromScriptElements,
  makeRecipe,
  ohmGrammar: null, // Initialized below, after Grammar.BuiltInRules.
  pexprs,
  util,
  extras: __webpack_require__(/*! ../extras */ "./node_modules/ohm-js/extras/index.js"),
  version
};

// Stuff for testing, etc.
module.exports._buildGrammar = buildGrammar;
module.exports._setDocumentInterfaceForTesting = function(doc) { documentInterface = doc; };

// Late initialization for stuff that is bootstrapped.

Grammar.BuiltInRules = __webpack_require__(/*! ../dist/built-in-rules */ "./node_modules/ohm-js/dist/built-in-rules.js");
util.announceBuiltInRules(Grammar.BuiltInRules);

module.exports.ohmGrammar = ohmGrammar = __webpack_require__(/*! ../dist/ohm-grammar */ "./node_modules/ohm-js/dist/ohm-grammar.js");
Grammar.initApplicationParser(ohmGrammar, buildGrammar);


/***/ }),

/***/ "./node_modules/ohm-js/src/nodes.js":
/*!******************************************!*\
  !*** ./node_modules/ohm-js/src/nodes.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

class Node {
  constructor(grammar, ctorName, matchLength) {
    this.grammar = grammar;
    this.ctorName = ctorName;
    this.matchLength = matchLength;
  }

  numChildren() {
    return this.children ? this.children.length : 0;
  }

  childAt(idx) {
    if (this.children) {
      return this.children[idx];
    }
  }

  indexOfChild(arg) {
    return this.children.indexOf(arg);
  }

  hasChildren() {
    return this.numChildren() > 1;
  }

  hasNoChildren() {
    return !this.hasChildren();
  }

  onlyChild() {
    if (this.numChildren() !== 1) {
      throw new Error(
          'cannot get only child of a node of type ' + this.ctorName +
          ' (it has ' + this.numChildren() + ' children)');
    } else {
      return this.firstChild();
    }
  }

  firstChild() {
    if (this.hasNoChildren()) {
      throw new Error(
          'cannot get first child of a ' + this.ctorName + ' node, which has no children');
    } else {
      return this.childAt(0);
    }
  }

  lastChild() {
    if (this.hasNoChildren()) {
      throw new Error(
          'cannot get last child of a ' + this.ctorName + ' node, which has no children');
    } else {
      return this.childAt(this.numChildren() - 1);
    }
  }

  childBefore(child) {
    const childIdx = this.indexOfChild(child);
    if (childIdx < 0) {
      throw new Error('Node.childBefore() called w/ an argument that is not a child');
    } else if (childIdx === 0) {
      throw new Error('cannot get child before first child');
    } else {
      return this.childAt(childIdx - 1);
    }
  }

  childAfter(child) {
    const childIdx = this.indexOfChild(child);
    if (childIdx < 0) {
      throw new Error('Node.childAfter() called w/ an argument that is not a child');
    } else if (childIdx === this.numChildren() - 1) {
      throw new Error('cannot get child after last child');
    } else {
      return this.childAt(childIdx + 1);
    }
  }

  isTerminal() {
    return false;
  }

  isNonterminal() {
    return false;
  }

  isIteration() {
    return false;
  }

  isOptional() {
    return false;
  }

  toJSON() {
    return {[this.ctorName]: this.children};
  }
}

// Terminals

class TerminalNode extends Node {
  constructor(grammar, value) {
    const matchLength = value ? value.length : 0;
    super(grammar, '_terminal', matchLength);
    this.primitiveValue = value;
  }

  isTerminal() {
    return true;
  }

  toJSON() {
    return {[this.ctorName]: this.primitiveValue};
  }
}

// Nonterminals

class NonterminalNode extends Node {
  constructor(grammar, ruleName, children, childOffsets, matchLength) {
    super(grammar, ruleName, matchLength);
    this.children = children;
    this.childOffsets = childOffsets;
  }

  isNonterminal() {
    return true;
  }

  isLexical() {
    return common.isLexical(this.ctorName);
  }

  isSyntactic() {
    return common.isSyntactic(this.ctorName);
  }
}

// Iterations

class IterationNode extends Node {
  constructor(grammar, children, childOffsets, matchLength, isOptional) {
    super(grammar, '_iter', matchLength);
    this.children = children;
    this.childOffsets = childOffsets;
    this.optional = isOptional;
  }

  isIteration() {
    return true;
  }

  isOptional() {
    return this.optional;
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  Node,
  TerminalNode,
  NonterminalNode,
  IterationNode
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-allowsSkippingPrecedingSpace.js":
/*!************************************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-allowsSkippingPrecedingSpace.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Return true if we should skip spaces preceding this expression in a syntactic context.
*/
pexprs.PExpr.prototype.allowsSkippingPrecedingSpace = common.abstract(
    'allowsSkippingPrecedingSpace'
);

/*
  Generally, these are all first-order expressions and (with the exception of Apply)
  directly read from the input stream.
*/
pexprs.any.allowsSkippingPrecedingSpace =
pexprs.end.allowsSkippingPrecedingSpace =
pexprs.Apply.prototype.allowsSkippingPrecedingSpace =
pexprs.Terminal.prototype.allowsSkippingPrecedingSpace =
pexprs.Range.prototype.allowsSkippingPrecedingSpace =
pexprs.UnicodeChar.prototype.allowsSkippingPrecedingSpace = function() {
  return true;
};

/*
  Higher-order expressions that don't directly consume input.
*/
pexprs.Alt.prototype.allowsSkippingPrecedingSpace =
pexprs.Iter.prototype.allowsSkippingPrecedingSpace =
pexprs.Lex.prototype.allowsSkippingPrecedingSpace =
pexprs.Lookahead.prototype.allowsSkippingPrecedingSpace =
pexprs.Not.prototype.allowsSkippingPrecedingSpace =
pexprs.Param.prototype.allowsSkippingPrecedingSpace =
pexprs.Seq.prototype.allowsSkippingPrecedingSpace = function() {
  return false;
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-assertAllApplicationsAreValid.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-assertAllApplicationsAreValid.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");
const util = __webpack_require__(/*! ./util */ "./node_modules/ohm-js/src/util.js");

let BuiltInRules;

util.awaitBuiltInRules(g => { BuiltInRules = g; });

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

let lexifyCount;

pexprs.PExpr.prototype.assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount = 0;
  this._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.PExpr.prototype._assertAllApplicationsAreValid = common.abstract(
    '_assertAllApplicationsAreValid'
);

pexprs.any._assertAllApplicationsAreValid =
pexprs.end._assertAllApplicationsAreValid =
pexprs.Terminal.prototype._assertAllApplicationsAreValid =
pexprs.Range.prototype._assertAllApplicationsAreValid =
pexprs.Param.prototype._assertAllApplicationsAreValid =
pexprs.UnicodeChar.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  // no-op
};

pexprs.Lex.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount++;
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
  lexifyCount--;
};

pexprs.Alt.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (let idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Seq.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (let idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Iter.prototype._assertAllApplicationsAreValid =
pexprs.Not.prototype._assertAllApplicationsAreValid =
pexprs.Lookahead.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.Apply.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  const ruleInfo = grammar.rules[this.ruleName];

  // Make sure that the rule exists...
  if (!ruleInfo) {
    throw errors.undeclaredRule(this.ruleName, grammar.name, this.source);
  }

  // ...and that this application is allowed
  if (common.isSyntactic(this.ruleName) && (!common.isSyntactic(ruleName) || lexifyCount > 0)) {
    throw errors.applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
  }

  // ...and that this application has the correct number of arguments
  const actual = this.args.length;
  const expected = ruleInfo.formals.length;
  if (actual !== expected) {
    throw errors.wrongNumberOfArguments(this.ruleName, expected, actual, this.source);
  }

  // ...and that all of the argument expressions only have valid applications and have arity 1.
  const self = this;
  this.args.forEach(arg => {
    arg._assertAllApplicationsAreValid(ruleName, grammar);
    if (arg.getArity() !== 1) {
      throw errors.invalidParameter(self.ruleName, arg);
    }
  });

  // Extra checks for "special" applications

  // If it's an application of 'caseInsensitive', ensure that the argument is a Terminal.
  if (BuiltInRules && ruleInfo === BuiltInRules.rules.caseInsensitive) {
    if (!(this.args[0] instanceof pexprs.Terminal)) {
      throw errors.incorrectArgumentType('a Terminal (e.g. \"abc\")', this.args[0]);
    }
  }
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-assertChoicesHaveUniformArity.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-assertChoicesHaveUniformArity.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertChoicesHaveUniformArity = common.abstract(
    'assertChoicesHaveUniformArity'
);

pexprs.any.assertChoicesHaveUniformArity =
pexprs.end.assertChoicesHaveUniformArity =
pexprs.Terminal.prototype.assertChoicesHaveUniformArity =
pexprs.Range.prototype.assertChoicesHaveUniformArity =
pexprs.Param.prototype.assertChoicesHaveUniformArity =
pexprs.Lex.prototype.assertChoicesHaveUniformArity =
pexprs.UnicodeChar.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  const arity = this.terms[0].getArity();
  for (let idx = 0; idx < this.terms.length; idx++) {
    const term = this.terms[idx];
    term.assertChoicesHaveUniformArity();
    const otherArity = term.getArity();
    if (arity !== otherArity) {
      throw errors.inconsistentArity(ruleName, arity, otherArity, term);
    }
  }
};

pexprs.Extend.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // Extend is a special case of Alt that's guaranteed to have exactly two
  // cases: [extensions, origBody].
  const actualArity = this.terms[0].getArity();
  const expectedArity = this.terms[1].getArity();
  if (actualArity !== expectedArity) {
    throw errors.inconsistentArity(ruleName, expectedArity, actualArity, this.terms[0]);
  }
};

pexprs.Seq.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  for (let idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformArity(ruleName);
  }
};

pexprs.Iter.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Not.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op (not required b/c the nested expr doesn't show up in the CST)
};

pexprs.Lookahead.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Apply.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // The arities of the parameter expressions is required to be 1 by
  // `assertAllApplicationsAreValid()`.
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-assertIteratedExprsAreNotNullable.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-assertIteratedExprsAreNotNullable.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertIteratedExprsAreNotNullable = common.abstract(
    'assertIteratedExprsAreNotNullable'
);

pexprs.any.assertIteratedExprsAreNotNullable =
pexprs.end.assertIteratedExprsAreNotNullable =
pexprs.Terminal.prototype.assertIteratedExprsAreNotNullable =
pexprs.Range.prototype.assertIteratedExprsAreNotNullable =
pexprs.Param.prototype.assertIteratedExprsAreNotNullable =
pexprs.UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  // no-op
};

pexprs.Alt.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  for (let idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertIteratedExprsAreNotNullable(grammar);
  }
};

pexprs.Seq.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  for (let idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertIteratedExprsAreNotNullable(grammar);
  }
};

pexprs.Iter.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  // Note: this is the implementation of this method for `Star` and `Plus` expressions.
  // It is overridden for `Opt` below.
  this.expr.assertIteratedExprsAreNotNullable(grammar);
  if (this.expr.isNullable(grammar)) {
    throw errors.kleeneExprHasNullableOperand(this, []);
  }
};

pexprs.Opt.prototype.assertIteratedExprsAreNotNullable =
pexprs.Not.prototype.assertIteratedExprsAreNotNullable =
pexprs.Lookahead.prototype.assertIteratedExprsAreNotNullable =
pexprs.Lex.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  this.expr.assertIteratedExprsAreNotNullable(grammar);
};

pexprs.Apply.prototype.assertIteratedExprsAreNotNullable = function(grammar) {
  this.args.forEach(arg => {
    arg.assertIteratedExprsAreNotNullable(grammar);
  });
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-check.js":
/*!*************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-check.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const nodes = __webpack_require__(/*! ./nodes */ "./node_modules/ohm-js/src/nodes.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.check = common.abstract('check');

pexprs.any.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.end.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         vals[0].primitiveValue === undefined;
};

pexprs.Terminal.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         vals[0].primitiveValue === this.obj;
};

pexprs.Range.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         typeof vals[0].primitiveValue === typeof this.from;
};

pexprs.Param.prototype.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.Alt.prototype.check = function(grammar, vals) {
  for (let i = 0; i < this.terms.length; i++) {
    const term = this.terms[i];
    if (term.check(grammar, vals)) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.check = function(grammar, vals) {
  let pos = 0;
  for (let i = 0; i < this.factors.length; i++) {
    const factor = this.factors[i];
    if (factor.check(grammar, vals.slice(pos))) {
      pos += factor.getArity();
    } else {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.check = function(grammar, vals) {
  const arity = this.getArity();
  const columns = vals.slice(0, arity);
  if (columns.length !== arity) {
    return false;
  }
  const rowCount = columns[0].length;
  let i;
  for (i = 1; i < arity; i++) {
    if (columns[i].length !== rowCount) {
      return false;
    }
  }

  for (i = 0; i < rowCount; i++) {
    const row = [];
    for (let j = 0; j < arity; j++) {
      row.push(columns[j][i]);
    }
    if (!this.expr.check(grammar, row)) {
      return false;
    }
  }

  return true;
};

pexprs.Not.prototype.check = function(grammar, vals) {
  return true;
};

pexprs.Lookahead.prototype.check =
pexprs.Lex.prototype.check = function(grammar, vals) {
  return this.expr.check(grammar, vals);
};

pexprs.Apply.prototype.check = function(grammar, vals) {
  if (!(vals[0] instanceof nodes.Node &&
        vals[0].grammar === grammar &&
        vals[0].ctorName === this.ruleName)) {
    return false;
  }

  // TODO: think about *not* doing the following checks, i.e., trusting that the rule
  // was correctly constructed.
  const ruleNode = vals[0];
  const body = grammar.rules[this.ruleName].body;
  return body.check(grammar, ruleNode.children) && ruleNode.numChildren() === body.getArity();
};

pexprs.UnicodeChar.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         typeof vals[0].primitiveValue === 'string';
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-eval.js":
/*!************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-eval.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const Trace = __webpack_require__(/*! ./Trace */ "./node_modules/ohm-js/src/Trace.js");
const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const errors = __webpack_require__(/*! ./errors */ "./node_modules/ohm-js/src/errors.js");
const nodes = __webpack_require__(/*! ./nodes */ "./node_modules/ohm-js/src/nodes.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

const TerminalNode = nodes.TerminalNode;
const NonterminalNode = nodes.NonterminalNode;
const IterationNode = nodes.IterationNode;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Evaluate the expression and return `true` if it succeeds, `false` otherwise. This method should
  only be called directly by `State.prototype.eval(expr)`, which also updates the data structures
  that are used for tracing. (Making those updates in a method of `State` enables the trace-specific
  data structures to be "secrets" of that class, which is good for modularity.)

  The contract of this method is as follows:
  * When the return value is `true`,
    - the state object will have `expr.getArity()` more bindings than it did before the call.
  * When the return value is `false`,
    - the state object may have more bindings than it did before the call, and
    - its input stream's position may be anywhere.

  Note that `State.prototype.eval(expr)`, unlike this method, guarantees that neither the state
  object's bindings nor its input stream's position will change if the expression fails to match.
*/
pexprs.PExpr.prototype.eval = common.abstract('eval'); // function(state) { ... }

pexprs.any.eval = function(state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  const ch = inputStream.next();
  if (ch) {
    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.end.eval = function(state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  if (inputStream.atEnd()) {
    state.pushBinding(new TerminalNode(state.grammar, undefined), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Terminal.prototype.eval = function(state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  if (!inputStream.matchString(this.obj)) {
    state.processFailure(origPos, this);
    return false;
  } else {
    state.pushBinding(new TerminalNode(state.grammar, this.obj), origPos);
    return true;
  }
};

pexprs.Range.prototype.eval = function(state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  const ch = inputStream.next();
  if (ch && this.from <= ch && ch <= this.to) {
    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Param.prototype.eval = function(state) {
  return state.eval(state.currentApplication().args[this.index]);
};

pexprs.Lex.prototype.eval = function(state) {
  state.enterLexifiedContext();
  const ans = state.eval(this.expr);
  state.exitLexifiedContext();
  return ans;
};

pexprs.Alt.prototype.eval = function(state) {
  for (let idx = 0; idx < this.terms.length; idx++) {
    if (state.eval(this.terms[idx])) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.eval = function(state) {
  for (let idx = 0; idx < this.factors.length; idx++) {
    const factor = this.factors[idx];
    if (!state.eval(factor)) {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.eval = function(state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  const arity = this.getArity();
  const cols = [];
  const colOffsets = [];
  while (cols.length < arity) {
    cols.push([]);
    colOffsets.push([]);
  }

  let numMatches = 0;
  let prevPos = origPos;
  let idx;
  while (numMatches < this.maxNumMatches && state.eval(this.expr)) {
    if (inputStream.pos === prevPos) {
      throw errors.kleeneExprHasNullableOperand(this, state._applicationStack);
    }
    prevPos = inputStream.pos;
    numMatches++;
    const row = state._bindings.splice(state._bindings.length - arity, arity);
    const rowOffsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
    for (idx = 0; idx < row.length; idx++) {
      cols[idx].push(row[idx]);
      colOffsets[idx].push(rowOffsets[idx]);
    }
  }
  if (numMatches < this.minNumMatches) {
    return false;
  }
  let offset = state.posToOffset(origPos);
  let matchLength = 0;
  if (numMatches > 0) {
    const lastCol = cols[arity - 1];
    const lastColOffsets = colOffsets[arity - 1];

    const endOffset =
        lastColOffsets[lastColOffsets.length - 1] + lastCol[lastCol.length - 1].matchLength;
    offset = colOffsets[0][0];
    matchLength = endOffset - offset;
  }
  const isOptional = this instanceof pexprs.Opt;
  for (idx = 0; idx < cols.length; idx++) {
    state._bindings.push(
        new IterationNode(state.grammar, cols[idx], colOffsets[idx], matchLength, isOptional));
    state._bindingOffsets.push(offset);
  }
  return true;
};

pexprs.Not.prototype.eval = function(state) {
  /*
    TODO:
    - Right now we're just throwing away all of the failures that happen inside a `not`, and
      recording `this` as a failed expression.
    - Double negation should be equivalent to lookahead, but that's not the case right now wrt
      failures. E.g., ~~'foo' produces a failure for ~~'foo', but maybe it should produce
      a failure for 'foo' instead.
  */

  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  state.pushFailuresInfo();

  const ans = state.eval(this.expr);

  state.popFailuresInfo();
  if (ans) {
    state.processFailure(origPos, this);
    return false;
  }

  inputStream.pos = origPos;
  return true;
};

pexprs.Lookahead.prototype.eval = function(state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  if (state.eval(this.expr)) {
    inputStream.pos = origPos;
    return true;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.eval = function(state) {
  const caller = state.currentApplication();
  const actuals = caller ? caller.args : [];
  const app = this.substituteParams(actuals);

  const posInfo = state.getCurrentPosInfo();
  if (posInfo.isActive(app)) {
    // This rule is already active at this position, i.e., it is left-recursive.
    return app.handleCycle(state);
  }

  const memoKey = app.toMemoKey();
  const memoRec = posInfo.memo[memoKey];

  if (memoRec && posInfo.shouldUseMemoizedResult(memoRec)) {
    if (state.hasNecessaryInfo(memoRec)) {
      return state.useMemoizedResult(state.inputStream.pos, memoRec);
    }
    delete posInfo.memo[memoKey];
  }
  return app.reallyEval(state);
};

pexprs.Apply.prototype.handleCycle = function(state) {
  const posInfo = state.getCurrentPosInfo();
  const currentLeftRecursion = posInfo.currentLeftRecursion;
  const memoKey = this.toMemoKey();
  let memoRec = posInfo.memo[memoKey];

  if (currentLeftRecursion && currentLeftRecursion.headApplication.toMemoKey() === memoKey) {
    // We already know about this left recursion, but it's possible there are "involved
    // applications" that we don't already know about, so...
    memoRec.updateInvolvedApplicationMemoKeys();
  } else if (!memoRec) {
    // New left recursion detected! Memoize a failure to try to get a seed parse.
    memoRec = posInfo.memoize(
        memoKey,
        {matchLength: 0, examinedLength: 0, value: false, rightmostFailureOffset: -1});
    posInfo.startLeftRecursion(this, memoRec);
  }
  return state.useMemoizedResult(state.inputStream.pos, memoRec);
};

pexprs.Apply.prototype.reallyEval = function(state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  const origPosInfo = state.getCurrentPosInfo();
  const ruleInfo = state.grammar.rules[this.ruleName];
  const body = ruleInfo.body;
  const description = ruleInfo.description;

  state.enterApplication(origPosInfo, this);

  if (description) {
    state.pushFailuresInfo();
  }

  // Reset the input stream's examinedLength property so that we can track
  // the examined length of this particular application.
  const origInputStreamExaminedLength = inputStream.examinedLength;
  inputStream.examinedLength = 0;

  let value = this.evalOnce(body, state);
  const currentLR = origPosInfo.currentLeftRecursion;
  const memoKey = this.toMemoKey();
  const isHeadOfLeftRecursion = currentLR && currentLR.headApplication.toMemoKey() === memoKey;
  let memoRec;

  if (isHeadOfLeftRecursion) {
    value = this.growSeedResult(body, state, origPos, currentLR, value);
    origPosInfo.endLeftRecursion();
    memoRec = currentLR;
    memoRec.examinedLength = inputStream.examinedLength - origPos;
    memoRec.rightmostFailureOffset = state._getRightmostFailureOffset();
    origPosInfo.memoize(memoKey, memoRec); // updates origPosInfo's maxExaminedLength
  } else if (!currentLR || !currentLR.isInvolved(memoKey)) {
    // This application is not involved in left recursion, so it's ok to memoize it.
    memoRec = origPosInfo.memoize(memoKey, {
      matchLength: inputStream.pos - origPos,
      examinedLength: inputStream.examinedLength - origPos,
      value,
      failuresAtRightmostPosition: state.cloneRecordedFailures(),
      rightmostFailureOffset: state._getRightmostFailureOffset()
    });
  }
  const succeeded = !!value;

  if (description) {
    state.popFailuresInfo();
    if (!succeeded) {
      state.processFailure(origPos, this);
    }
    if (memoRec) {
      memoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();
    }
  }

  // Record trace information in the memo table, so that it is available if the memoized result
  // is used later.
  if (state.isTracing() && memoRec) {
    const entry = state.getTraceEntry(origPos, this, succeeded, succeeded ? [value] : []);
    if (isHeadOfLeftRecursion) {
      common.assert(entry.terminatingLREntry != null || !succeeded);
      entry.isHeadOfLeftRecursion = true;
    }
    memoRec.traceEntry = entry;
  }

  // Fix the input stream's examinedLength -- it should be the maximum examined length
  // across all applications, not just this one.
  inputStream.examinedLength = Math.max(inputStream.examinedLength, origInputStreamExaminedLength);

  state.exitApplication(origPosInfo, value);

  return succeeded;
};

pexprs.Apply.prototype.evalOnce = function(expr, state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;

  if (state.eval(expr)) {
    const arity = expr.getArity();
    const bindings = state._bindings.splice(state._bindings.length - arity, arity);
    const offsets = state._bindingOffsets.splice(state._bindingOffsets.length - arity, arity);
    return new NonterminalNode(
        state.grammar, this.ruleName, bindings, offsets, inputStream.pos - origPos);
  } else {
    return false;
  }
};

pexprs.Apply.prototype.growSeedResult = function(body, state, origPos, lrMemoRec, newValue) {
  if (!newValue) {
    return false;
  }

  const inputStream = state.inputStream;

  while (true) {
    lrMemoRec.matchLength = inputStream.pos - origPos;
    lrMemoRec.value = newValue;
    lrMemoRec.failuresAtRightmostPosition = state.cloneRecordedFailures();

    if (state.isTracing()) {
      // Before evaluating the body again, add a trace node for this application to the memo entry.
      // Its only child is a copy of the trace node from `newValue`, which will always be the last
      // element in `state.trace`.
      const seedTrace = state.trace[state.trace.length - 1];
      lrMemoRec.traceEntry = new Trace(
          state.input, origPos, inputStream.pos, this, true, [newValue], [seedTrace.clone()]);
    }
    inputStream.pos = origPos;
    newValue = this.evalOnce(body, state);
    if (inputStream.pos - origPos <= lrMemoRec.matchLength) {
      break;
    }
    if (state.isTracing()) {
      state.trace.splice(-2, 1); // Drop the trace for the old seed.
    }
  }
  if (state.isTracing()) {
    // The last entry is for an unused result -- pop it and save it in the "real" entry.
    lrMemoRec.traceEntry.recordLRTermination(state.trace.pop(), newValue);
  }
  inputStream.pos = origPos + lrMemoRec.matchLength;
  return lrMemoRec.value;
};

pexprs.UnicodeChar.prototype.eval = function(state) {
  const inputStream = state.inputStream;
  const origPos = inputStream.pos;
  const ch = inputStream.next();
  if (ch && this.pattern.test(ch)) {
    state.pushBinding(new TerminalNode(state.grammar, ch), origPos);
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-generateExample.js":
/*!***********************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-generateExample.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------

function flatten(listOfLists) {
  return Array.prototype.concat.apply([], listOfLists);
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.generateExample = common.abstract('generateExample');

function categorizeExamples(examples) {
  // A list of rules that the system needs examples of, in order to generate an example
  //   for the current rule
  let examplesNeeded = examples.filter(example => example.hasOwnProperty('examplesNeeded'))
      .map(example => example.examplesNeeded);

  examplesNeeded = flatten(examplesNeeded);

  const uniqueExamplesNeeded = {};
  for (let i = 0; i < examplesNeeded.length; i++) {
    const currentExampleNeeded = examplesNeeded[i];
    uniqueExamplesNeeded[currentExampleNeeded] = true;
  }
  examplesNeeded = Object.keys(uniqueExamplesNeeded);

  // A list of successfully generated examples
  const successfulExamples = examples.filter(example => example.hasOwnProperty('value'))
      .map(item => item.value);

  // This flag returns true if the system cannot generate the rule it is currently
  //   attempting to generate, regardless of whether or not it has the examples it needs.
  //   Currently, this is only used in overriding generators to prevent the system from
  //   generating examples for certain rules (e.g. 'ident').
  const needHelp = examples.some(item => item.needHelp);

  return {
    examplesNeeded,
    successfulExamples,
    needHelp
  };
}

pexprs.any.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return {value: String.fromCharCode(Math.floor(Math.random() * 255))};
};

// Assumes that terminal's object is always a string
pexprs.Terminal.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: this.obj};
};

pexprs.Range.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  const rangeSize = this.to.charCodeAt(0) - this.from.charCodeAt(0);
  return {value: String.fromCharCode(
      this.from.charCodeAt(0) + Math.floor(rangeSize * Math.random())
  )};
};

pexprs.Param.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return actuals[this.index].generateExample(grammar, examples, inSyntacticContext, actuals);
};

pexprs.Alt.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  // items -> termExamples
  const termExamples = this.terms.map(term => {
    return term.generateExample(grammar, examples, inSyntacticContext, actuals);
  });

  const categorizedExamples = categorizeExamples(termExamples);

  const examplesNeeded = categorizedExamples.examplesNeeded;
  const successfulExamples = categorizedExamples.successfulExamples;
  const needHelp = categorizedExamples.needHelp;

  const ans = {};

  // Alt can contain both an example and a request for examples
  if (successfulExamples.length > 0) {
    const i = Math.floor(Math.random() * successfulExamples.length);
    ans.value = successfulExamples[i];
  }
  if (examplesNeeded.length > 0) {
    ans.examplesNeeded = examplesNeeded;
  }
  ans.needHelp = needHelp;

  return ans;
};

pexprs.Seq.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  const factorExamples = this.factors.map(factor => {
    return factor.generateExample(grammar, examples, inSyntacticContext, actuals);
  });
  const categorizedExamples = categorizeExamples(factorExamples);

  const examplesNeeded = categorizedExamples.examplesNeeded;
  const successfulExamples = categorizedExamples.successfulExamples;
  const needHelp = categorizedExamples.needHelp;

  const ans = {};

  // In a Seq, all pieces must succeed in order to have a successful example.
  if (examplesNeeded.length > 0 || needHelp) {
    ans.examplesNeeded = examplesNeeded;
    ans.needHelp = needHelp;
  } else {
    ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
  }

  return ans;
};

pexprs.Iter.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  const rangeTimes = Math.min(this.maxNumMatches - this.minNumMatches, 3);
  const numTimes = Math.floor(Math.random() * (rangeTimes + 1) + this.minNumMatches);
  const items = [];

  for (let i = 0; i < numTimes; i++) {
    items.push(this.expr.generateExample(grammar, examples, inSyntacticContext, actuals));
  }

  const categorizedExamples = categorizeExamples(items);

  const examplesNeeded = categorizedExamples.examplesNeeded;
  const successfulExamples = categorizedExamples.successfulExamples;

  const ans = {};

  // It's always either one or the other.
  // TODO: instead of ' ', call 'spaces.generateExample()'
  ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
  if (examplesNeeded.length > 0) {
    ans.examplesNeeded = examplesNeeded;
  }

  return ans;
};

// Right now, 'Not' and 'Lookahead' generate nothing and assume that whatever follows will
//   work according to the encoded constraints.
pexprs.Not.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: ''};
};

pexprs.Lookahead.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: ''};
};

pexprs.Lex.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return this.expr.generateExample(grammar, examples, false, actuals);
};

pexprs.Apply.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  const ans = {};

  const ruleName = this.substituteParams(actuals).toString();

  if (!examples.hasOwnProperty(ruleName)) {
    ans.examplesNeeded = [ruleName];
  } else {
    const relevantExamples = examples[ruleName];
    const i = Math.floor(Math.random() * relevantExamples.length);
    ans.value = relevantExamples[i];
  }

  return ans;
};

pexprs.UnicodeChar.prototype.generateExample = function(
    grammar, examples, inSyntacticContext, actuals) {
  let char;
  switch (this.category) {
    case 'Lu': char = 'Á'; break;
    case 'Ll': char = 'ŏ'; break;
    case 'Lt': char = 'ǅ'; break;
    case 'Lm': char = 'ˮ'; break;
    case 'Lo': char = 'ƻ'; break;

    case 'Nl': char = 'ↂ'; break;
    case 'Nd': char = '½'; break;

    case 'Mn': char = '\u0487'; break;
    case 'Mc': char = 'ि'; break;

    case 'Pc': char = '⁀'; break;

    case 'Zs': char = '\u2001'; break;

    case 'L': char = 'Á'; break;
    case 'Ltmo': char = 'ǅ'; break;
  }
  return {value: char}; // 💩
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-getArity.js":
/*!****************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-getArity.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.getArity = common.abstract('getArity');

pexprs.any.getArity =
pexprs.end.getArity =
pexprs.Terminal.prototype.getArity =
pexprs.Range.prototype.getArity =
pexprs.Param.prototype.getArity =
pexprs.Apply.prototype.getArity =
pexprs.UnicodeChar.prototype.getArity = function() {
  return 1;
};

pexprs.Alt.prototype.getArity = function() {
  // This is ok b/c all terms must have the same arity -- this property is
  // checked by the Grammar constructor.
  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
};

pexprs.Seq.prototype.getArity = function() {
  let arity = 0;
  for (let idx = 0; idx < this.factors.length; idx++) {
    arity += this.factors[idx].getArity();
  }
  return arity;
};

pexprs.Iter.prototype.getArity = function() {
  return this.expr.getArity();
};

pexprs.Not.prototype.getArity = function() {
  return 0;
};

pexprs.Lookahead.prototype.getArity =
pexprs.Lex.prototype.getArity = function() {
  return this.expr.getArity();
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-introduceParams.js":
/*!***********************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-introduceParams.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Called at grammar creation time to rewrite a rule body, replacing each reference to a formal
  parameter with a `Param` node. Returns a PExpr -- either a new one, or the original one if
  it was modified in place.
*/
pexprs.PExpr.prototype.introduceParams = common.abstract('introduceParams');

pexprs.any.introduceParams =
pexprs.end.introduceParams =
pexprs.Terminal.prototype.introduceParams =
pexprs.Range.prototype.introduceParams =
pexprs.Param.prototype.introduceParams =
pexprs.UnicodeChar.prototype.introduceParams = function(formals) {
  return this;
};

pexprs.Alt.prototype.introduceParams = function(formals) {
  this.terms.forEach((term, idx, terms) => {
    terms[idx] = term.introduceParams(formals);
  });
  return this;
};

pexprs.Seq.prototype.introduceParams = function(formals) {
  this.factors.forEach((factor, idx, factors) => {
    factors[idx] = factor.introduceParams(formals);
  });
  return this;
};

pexprs.Iter.prototype.introduceParams =
pexprs.Not.prototype.introduceParams =
pexprs.Lookahead.prototype.introduceParams =
pexprs.Lex.prototype.introduceParams = function(formals) {
  this.expr = this.expr.introduceParams(formals);
  return this;
};

pexprs.Apply.prototype.introduceParams = function(formals) {
  const index = formals.indexOf(this.ruleName);
  if (index >= 0) {
    if (this.args.length > 0) {
      // TODO: Should this be supported? See issue #64.
      throw new Error('Parameterized rules cannot be passed as arguments to another rule.');
    }
    return new pexprs.Param(index).withSource(this.source);
  } else {
    this.args.forEach((arg, idx, args) => {
      args[idx] = arg.introduceParams(formals);
    });
    return this;
  }
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-isNullable.js":
/*!******************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-isNullable.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns `true` if this parsing expression may accept without consuming any input.
pexprs.PExpr.prototype.isNullable = function(grammar) {
  return this._isNullable(grammar, Object.create(null));
};

pexprs.PExpr.prototype._isNullable = common.abstract('_isNullable');

pexprs.any._isNullable =
pexprs.Range.prototype._isNullable =
pexprs.Param.prototype._isNullable =
pexprs.Plus.prototype._isNullable =
pexprs.UnicodeChar.prototype._isNullable = function(grammar, memo) {
  return false;
};

pexprs.end._isNullable = function(grammar, memo) {
  return true;
};

pexprs.Terminal.prototype._isNullable = function(grammar, memo) {
  if (typeof this.obj === 'string') {
    // This is an over-simplification: it's only correct if the input is a string. If it's an array
    // or an object, then the empty string parsing expression is not nullable.
    return this.obj === '';
  } else {
    return false;
  }
};

pexprs.Alt.prototype._isNullable = function(grammar, memo) {
  return this.terms.length === 0 ||
      this.terms.some(term => term._isNullable(grammar, memo));
};

pexprs.Seq.prototype._isNullable = function(grammar, memo) {
  return this.factors.every(factor => factor._isNullable(grammar, memo));
};

pexprs.Star.prototype._isNullable =
pexprs.Opt.prototype._isNullable =
pexprs.Not.prototype._isNullable =
pexprs.Lookahead.prototype._isNullable = function(grammar, memo) {
  return true;
};

pexprs.Lex.prototype._isNullable = function(grammar, memo) {
  return this.expr._isNullable(grammar, memo);
};

pexprs.Apply.prototype._isNullable = function(grammar, memo) {
  const key = this.toMemoKey();
  if (!Object.prototype.hasOwnProperty.call(memo, key)) {
    const body = grammar.rules[this.ruleName].body;
    const inlined = body.substituteParams(this.args);
    memo[key] = false; // Prevent infinite recursion for recursive rules.
    memo[key] = inlined._isNullable(grammar, memo);
  }
  return memo[key];
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-outputRecipe.js":
/*!********************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-outputRecipe.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function getMetaInfo(expr, grammarInterval) {
  const metaInfo = {};
  if (expr.source && grammarInterval) {
    const adjusted = expr.source.relativeTo(grammarInterval);
    metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
  }
  return metaInfo;
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.outputRecipe = common.abstract('outputRecipe');

pexprs.any.outputRecipe = function(formals, grammarInterval) {
  return ['any', getMetaInfo(this, grammarInterval)];
};

pexprs.end.outputRecipe = function(formals, grammarInterval) {
  return ['end', getMetaInfo(this, grammarInterval)];
};

pexprs.Terminal.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'terminal',
    getMetaInfo(this, grammarInterval),
    this.obj
  ];
};

pexprs.Range.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'range',
    getMetaInfo(this, grammarInterval),
    this.from,
    this.to
  ];
};

pexprs.Param.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'param',
    getMetaInfo(this, grammarInterval),
    this.index
  ];
};

pexprs.Alt.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'alt',
    getMetaInfo(this, grammarInterval)
  ].concat(this.terms.map(term => term.outputRecipe(formals, grammarInterval)));
};

pexprs.Extend.prototype.outputRecipe = function(formals, grammarInterval) {
  const extension = this.terms[0]; // [extension, original]
  return extension.outputRecipe(formals, grammarInterval);
};

pexprs.Splice.prototype.outputRecipe = function(formals, grammarInterval) {
  const beforeTerms = this.terms.slice(0, this.expansionPos);
  const afterTerms = this.terms.slice(this.expansionPos + 1);
  return [
    'splice',
    getMetaInfo(this, grammarInterval),
    beforeTerms.map(term => term.outputRecipe(formals, grammarInterval)),
    afterTerms.map(term => term.outputRecipe(formals, grammarInterval))
  ];
};

pexprs.Seq.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'seq',
    getMetaInfo(this, grammarInterval)
  ].concat(this.factors.map(factor => factor.outputRecipe(formals, grammarInterval)));
};

pexprs.Star.prototype.outputRecipe =
pexprs.Plus.prototype.outputRecipe =
pexprs.Opt.prototype.outputRecipe =
pexprs.Not.prototype.outputRecipe =
pexprs.Lookahead.prototype.outputRecipe =
pexprs.Lex.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    this.constructor.name.toLowerCase(),
    getMetaInfo(this, grammarInterval),
    this.expr.outputRecipe(formals, grammarInterval)
  ];
};

pexprs.Apply.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'app',
    getMetaInfo(this, grammarInterval),
    this.ruleName,
    this.args.map(arg => arg.outputRecipe(formals, grammarInterval))
  ];
};

pexprs.UnicodeChar.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'unicodeChar',
    getMetaInfo(this, grammarInterval),
    this.category
  ];
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-substituteParams.js":
/*!************************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-substituteParams.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a PExpr that results from recursively replacing every formal parameter (i.e., instance
  of `Param`) inside this PExpr with its actual value from `actuals` (an Array).

  The receiver must not be modified; a new PExpr must be returned if any replacement is necessary.
*/
// function(actuals) { ... }
pexprs.PExpr.prototype.substituteParams = common.abstract('substituteParams');

pexprs.any.substituteParams =
pexprs.end.substituteParams =
pexprs.Terminal.prototype.substituteParams =
pexprs.Range.prototype.substituteParams =
pexprs.UnicodeChar.prototype.substituteParams = function(actuals) {
  return this;
};

pexprs.Param.prototype.substituteParams = function(actuals) {
  return actuals[this.index];
};

pexprs.Alt.prototype.substituteParams = function(actuals) {
  return new pexprs.Alt(
      this.terms.map(term => term.substituteParams(actuals)));
};

pexprs.Seq.prototype.substituteParams = function(actuals) {
  return new pexprs.Seq(
      this.factors.map(factor => factor.substituteParams(actuals)));
};

pexprs.Iter.prototype.substituteParams =
pexprs.Not.prototype.substituteParams =
pexprs.Lookahead.prototype.substituteParams =
pexprs.Lex.prototype.substituteParams = function(actuals) {
  return new this.constructor(this.expr.substituteParams(actuals));
};

pexprs.Apply.prototype.substituteParams = function(actuals) {
  if (this.args.length === 0) {
    // Avoid making a copy of this application, as an optimization
    return this;
  } else {
    const args = this.args.map(arg => arg.substituteParams(actuals));
    return new pexprs.Apply(this.ruleName, args);
  }
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-toArgumentNameList.js":
/*!**************************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-toArgumentNameList.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

const {copyWithoutDuplicates} = common;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function isRestrictedJSIdentifier(str) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(str);
}

function resolveDuplicatedNames(argumentNameList) {
  // `count` is used to record the number of times each argument name occurs in the list,
  // this is useful for checking duplicated argument name. It maps argument names to ints.
  const count = Object.create(null);
  argumentNameList.forEach(argName => {
    count[argName] = (count[argName] || 0) + 1;
  });

  // Append subscripts ('_1', '_2', ...) to duplicate argument names.
  Object.keys(count).forEach(dupArgName => {
    if (count[dupArgName] <= 1) {
      return;
    }

    // This name shows up more than once, so add subscripts.
    let subscript = 1;
    argumentNameList.forEach((argName, idx) => {
      if (argName === dupArgName) {
        argumentNameList[idx] = argName + '_' + subscript++;
      }
    });
  });
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a list of strings that will be used as the default argument names for its receiver
  (a pexpr) in a semantic action. This is used exclusively by the Semantics Editor.

  `firstArgIndex` is the 1-based index of the first argument name that will be generated for this
  pexpr. It enables us to name arguments positionally, e.g., if the second argument is a
  non-alphanumeric terminal like "+", it will be named '$2'.

  `noDupCheck` is true if the caller of `toArgumentNameList` is not a top level caller. It enables
  us to avoid nested duplication subscripts appending, e.g., '_1_1', '_1_2', by only checking
  duplicates at the top level.

  Here is a more elaborate example that illustrates how this method works:
  `(a "+" b).toArgumentNameList(1)` evaluates to `['a', '$2', 'b']` with the following recursive
  calls:

    (a).toArgumentNameList(1) -> ['a'],
    ("+").toArgumentNameList(2) -> ['$2'],
    (b).toArgumentNameList(3) -> ['b']

  Notes:
  * This method must only be called on well-formed expressions, e.g., the receiver must
    not have any Alt sub-expressions with inconsistent arities.
  * e.getArity() === e.toArgumentNameList(1).length
*/
// function(firstArgIndex, noDupCheck) { ... }
pexprs.PExpr.prototype.toArgumentNameList = common.abstract('toArgumentNameList');

pexprs.any.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['any'];
};

pexprs.end.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['end'];
};

pexprs.Terminal.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  if (typeof this.obj === 'string' && /^[_a-zA-Z0-9]+$/.test(this.obj)) {
    // If this terminal is a valid suffix for a JS identifier, just prepend it with '_'
    return ['_' + this.obj];
  } else {
    // Otherwise, name it positionally.
    return ['$' + firstArgIndex];
  }
};

pexprs.Range.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  let argName = this.from + '_to_' + this.to;
  // If the `argName` is not valid then try to prepend a `_`.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '_' + argName;
  }
  // If the `argName` still not valid after prepending a `_`, then name it positionally.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '$' + firstArgIndex;
  }
  return [argName];
};

pexprs.Alt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  // `termArgNameLists` is an array of arrays where each row is the
  // argument name list that corresponds to a term in this alternation.
  const termArgNameLists = this.terms.map(term => term.toArgumentNameList(firstArgIndex, true));

  const argumentNameList = [];
  const numArgs = termArgNameLists[0].length;
  for (let colIdx = 0; colIdx < numArgs; colIdx++) {
    const col = [];
    for (let rowIdx = 0; rowIdx < this.terms.length; rowIdx++) {
      col.push(termArgNameLists[rowIdx][colIdx]);
    }
    const uniqueNames = copyWithoutDuplicates(col);
    argumentNameList.push(uniqueNames.join('_or_'));
  }

  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Seq.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  // Generate the argument name list, without worrying about duplicates.
  let argumentNameList = [];
  this.factors.forEach(factor => {
    const factorArgumentNameList = factor.toArgumentNameList(firstArgIndex, true);
    argumentNameList = argumentNameList.concat(factorArgumentNameList);

    // Shift the firstArgIndex to take this factor's argument names into account.
    firstArgIndex += factorArgumentNameList.length;
  });
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Iter.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  const argumentNameList = this.expr.toArgumentNameList(firstArgIndex, noDupCheck)
      .map(exprArgumentString => exprArgumentString[exprArgumentString.length - 1] === 's' ?
          exprArgumentString + 'es' :
          exprArgumentString + 's');
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Opt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map(argName => {
    return 'opt' + argName[0].toUpperCase() + argName.slice(1);
  });
};

pexprs.Not.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return [];
};

pexprs.Lookahead.prototype.toArgumentNameList =
pexprs.Lex.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck);
};

pexprs.Apply.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return [this.ruleName];
};

pexprs.UnicodeChar.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['$' + firstArgIndex];
};

pexprs.Param.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['param' + this.index];
};

// "Value pexprs" (Value, Str, Arr, Obj) are going away soon, so we don't worry about them here.


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-toDisplayString.js":
/*!***********************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-toDisplayString.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns a string representing the PExpr, for use as a UI label, etc.
pexprs.PExpr.prototype.toDisplayString = common.abstract('toDisplayString');

pexprs.Alt.prototype.toDisplayString =
pexprs.Seq.prototype.toDisplayString = function() {
  if (this.source) {
    return this.source.trimmed().contents;
  }
  return '[' + this.constructor.name + ']';
};

pexprs.any.toDisplayString =
pexprs.end.toDisplayString =
pexprs.Iter.prototype.toDisplayString =
pexprs.Not.prototype.toDisplayString =
pexprs.Lookahead.prototype.toDisplayString =
pexprs.Lex.prototype.toDisplayString =
pexprs.Terminal.prototype.toDisplayString =
pexprs.Range.prototype.toDisplayString =
pexprs.Param.prototype.toDisplayString = function() {
  return this.toString();
};

pexprs.Apply.prototype.toDisplayString = function() {
  if (this.args.length > 0) {
    const ps = this.args.map(arg => arg.toDisplayString());
    return this.ruleName + '<' + ps.join(',') + '>';
  } else {
    return this.ruleName;
  }
};

pexprs.UnicodeChar.prototype.toDisplayString = function() {
  return 'Unicode [' + this.category + '] character';
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-toFailure.js":
/*!*****************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-toFailure.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const Failure = __webpack_require__(/*! ./Failure */ "./node_modules/ohm-js/src/Failure.js");
const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.toFailure = common.abstract('toFailure');

pexprs.any.toFailure = function(grammar) {
  return new Failure(this, 'any object', 'description');
};

pexprs.end.toFailure = function(grammar) {
  return new Failure(this, 'end of input', 'description');
};

pexprs.Terminal.prototype.toFailure = function(grammar) {
  return new Failure(this, this.obj, 'string');
};

pexprs.Range.prototype.toFailure = function(grammar) {
  // TODO: come up with something better
  return new Failure(this, JSON.stringify(this.from) + '..' + JSON.stringify(this.to), 'code');
};

pexprs.Not.prototype.toFailure = function(grammar) {
  const description = this.expr === pexprs.any ?
      'nothing' :
      'not ' + this.expr.toFailure(grammar);
  return new Failure(this, description, 'description');
};

pexprs.Lookahead.prototype.toFailure = function(grammar) {
  return this.expr.toFailure(grammar);
};

pexprs.Apply.prototype.toFailure = function(grammar) {
  let description = grammar.rules[this.ruleName].description;
  if (!description) {
    const article = (/^[aeiouAEIOU]/.test(this.ruleName) ? 'an' : 'a');
    description = article + ' ' + this.ruleName;
  }
  return new Failure(this, description, 'description');
};

pexprs.UnicodeChar.prototype.toFailure = function(grammar) {
  return new Failure(this, 'a Unicode [' + this.category + '] character', 'description');
};

pexprs.Alt.prototype.toFailure = function(grammar) {
  const fs = this.terms.map(t => t.toFailure(grammar));
  const description = '(' + fs.join(' or ') + ')';
  return new Failure(this, description, 'description');
};

pexprs.Seq.prototype.toFailure = function(grammar) {
  const fs = this.factors.map(f => f.toFailure(grammar));
  const description = '(' + fs.join(' ') + ')';
  return new Failure(this, description, 'description');
};

pexprs.Iter.prototype.toFailure = function(grammar) {
  const description = '(' + this.expr.toFailure(grammar) + this.operator + ')';
  return new Failure(this, description, 'description');
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs-toString.js":
/*!****************************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs-toString.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");
const pexprs = __webpack_require__(/*! ./pexprs */ "./node_modules/ohm-js/src/pexprs.js");

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  e1.toString() === e2.toString() ==> e1 and e2 are semantically equivalent.
  Note that this is not an iff (<==>): e.g.,
  (~"b" "a").toString() !== ("a").toString(), even though
  ~"b" "a" and "a" are interchangeable in any grammar,
  both in terms of the languages they accept and their arities.
*/
pexprs.PExpr.prototype.toString = common.abstract('toString');

pexprs.any.toString = function() {
  return 'any';
};

pexprs.end.toString = function() {
  return 'end';
};

pexprs.Terminal.prototype.toString = function() {
  return JSON.stringify(this.obj);
};

pexprs.Range.prototype.toString = function() {
  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
};

pexprs.Param.prototype.toString = function() {
  return '$' + this.index;
};

pexprs.Lex.prototype.toString = function() {
  return '#(' + this.expr.toString() + ')';
};

pexprs.Alt.prototype.toString = function() {
  return this.terms.length === 1 ?
    this.terms[0].toString() :
    '(' + this.terms.map(term => term.toString()).join(' | ') + ')';
};

pexprs.Seq.prototype.toString = function() {
  return this.factors.length === 1 ?
    this.factors[0].toString() :
    '(' + this.factors.map(factor => factor.toString()).join(' ') + ')';
};

pexprs.Iter.prototype.toString = function() {
  return this.expr + this.operator;
};

pexprs.Not.prototype.toString = function() {
  return '~' + this.expr;
};

pexprs.Lookahead.prototype.toString = function() {
  return '&' + this.expr;
};

pexprs.Apply.prototype.toString = function() {
  if (this.args.length > 0) {
    const ps = this.args.map(arg => arg.toString());
    return this.ruleName + '<' + ps.join(',') + '>';
  } else {
    return this.ruleName;
  }
};

pexprs.UnicodeChar.prototype.toString = function() {
  return '\\p{' + this.category + '}';
};


/***/ }),

/***/ "./node_modules/ohm-js/src/pexprs.js":
/*!*******************************************!*\
  !*** ./node_modules/ohm-js/src/pexprs.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const UnicodeCategories = __webpack_require__(/*! ../third_party/UnicodeCategories */ "./node_modules/ohm-js/third_party/UnicodeCategories.js");
const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// General stuff

class PExpr {
  constructor() {
    if (this.constructor === PExpr) {
      throw new Error("PExpr cannot be instantiated -- it's abstract");
    }
  }

  // Set the `source` property to the interval containing the source for this expression.
  withSource(interval) {
    if (interval) {
      this.source = interval.trimmed();
    }
    return this;
  }
}

// Any

const any = Object.create(PExpr.prototype);

// End

const end = Object.create(PExpr.prototype);

// Terminals

class Terminal extends PExpr {
  constructor(obj) {
    super();
    this.obj = obj;
  }
}

// Ranges

class Range extends PExpr {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }
}

// Parameters

class Param extends PExpr {
  constructor(index) {
    super();
    this.index = index;
  }
}

// Alternation

class Alt extends PExpr {
  constructor(terms) {
    super();
    this.terms = terms;
  }
}

// Extend is an implementation detail of rule extension

class Extend extends Alt {
  constructor(superGrammar, name, body) {
    const origBody = superGrammar.rules[name].body;
    super([body, origBody]);

    this.superGrammar = superGrammar;
    this.name = name;
    this.body = body;
  }
}

// Splice is an implementation detail of rule overriding with the `...` operator.
class Splice extends Alt {
  constructor(superGrammar, ruleName, beforeTerms, afterTerms) {
    const origBody = superGrammar.rules[ruleName].body;
    super([...beforeTerms, origBody, ...afterTerms]);

    this.superGrammar = superGrammar;
    this.ruleName = ruleName;
    this.expansionPos = beforeTerms.length;
  }
}

// Sequences

class Seq extends PExpr {
  constructor(factors) {
    super();
    this.factors = factors;
  }
}

// Iterators and optionals

class Iter extends PExpr {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

class Star extends Iter {}
class Plus extends Iter {}
class Opt extends Iter {}

Star.prototype.operator = '*';
Plus.prototype.operator = '+';
Opt.prototype.operator = '?';

Star.prototype.minNumMatches = 0;
Plus.prototype.minNumMatches = 1;
Opt.prototype.minNumMatches = 0;

Star.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Plus.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Opt.prototype.maxNumMatches = 1;

// Predicates

class Not extends PExpr {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

class Lookahead extends PExpr {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

// "Lexification"

class Lex extends PExpr {
  constructor(expr) {
    super();
    this.expr = expr;
  }
}

// Rule application

class Apply extends PExpr {
  constructor(ruleName, args=[]) {
    super();
    this.ruleName = ruleName;
    this.args = args;
  }

  isSyntactic() {
    return common.isSyntactic(this.ruleName);
  }

  // This method just caches the result of `this.toString()` in a non-enumerable property.
  toMemoKey() {
    if (!this._memoKey) {
      Object.defineProperty(this, '_memoKey', {value: this.toString()});
    }
    return this._memoKey;
  }
}

// Unicode character

class UnicodeChar extends PExpr {
  constructor(category) {
    super();
    this.category = category;
    this.pattern = UnicodeCategories[category];
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.PExpr = PExpr;
exports.any = any;
exports.end = end;
exports.Terminal = Terminal;
exports.Range = Range;
exports.Param = Param;
exports.Alt = Alt;
exports.Extend = Extend;
exports.Splice = Splice;
exports.Seq = Seq;
exports.Iter = Iter;
exports.Star = Star;
exports.Plus = Plus;
exports.Opt = Opt;
exports.Not = Not;
exports.Lookahead = Lookahead;
exports.Lex = Lex;
exports.Apply = Apply;
exports.UnicodeChar = UnicodeChar;

// --------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------

__webpack_require__(/*! ./pexprs-allowsSkippingPrecedingSpace */ "./node_modules/ohm-js/src/pexprs-allowsSkippingPrecedingSpace.js");
__webpack_require__(/*! ./pexprs-assertAllApplicationsAreValid */ "./node_modules/ohm-js/src/pexprs-assertAllApplicationsAreValid.js");
__webpack_require__(/*! ./pexprs-assertChoicesHaveUniformArity */ "./node_modules/ohm-js/src/pexprs-assertChoicesHaveUniformArity.js");
__webpack_require__(/*! ./pexprs-assertIteratedExprsAreNotNullable */ "./node_modules/ohm-js/src/pexprs-assertIteratedExprsAreNotNullable.js");
__webpack_require__(/*! ./pexprs-check */ "./node_modules/ohm-js/src/pexprs-check.js");
__webpack_require__(/*! ./pexprs-eval */ "./node_modules/ohm-js/src/pexprs-eval.js");
__webpack_require__(/*! ./pexprs-getArity */ "./node_modules/ohm-js/src/pexprs-getArity.js");
__webpack_require__(/*! ./pexprs-generateExample */ "./node_modules/ohm-js/src/pexprs-generateExample.js");
__webpack_require__(/*! ./pexprs-outputRecipe */ "./node_modules/ohm-js/src/pexprs-outputRecipe.js");
__webpack_require__(/*! ./pexprs-introduceParams */ "./node_modules/ohm-js/src/pexprs-introduceParams.js");
__webpack_require__(/*! ./pexprs-isNullable */ "./node_modules/ohm-js/src/pexprs-isNullable.js");
__webpack_require__(/*! ./pexprs-substituteParams */ "./node_modules/ohm-js/src/pexprs-substituteParams.js");
__webpack_require__(/*! ./pexprs-toDisplayString */ "./node_modules/ohm-js/src/pexprs-toDisplayString.js");
__webpack_require__(/*! ./pexprs-toArgumentNameList */ "./node_modules/ohm-js/src/pexprs-toArgumentNameList.js");
__webpack_require__(/*! ./pexprs-toFailure */ "./node_modules/ohm-js/src/pexprs-toFailure.js");
__webpack_require__(/*! ./pexprs-toString */ "./node_modules/ohm-js/src/pexprs-toString.js");


/***/ }),

/***/ "./node_modules/ohm-js/src/util.js":
/*!*****************************************!*\
  !*** ./node_modules/ohm-js/src/util.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

const common = __webpack_require__(/*! ./common */ "./node_modules/ohm-js/src/common.js");

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Given an array of numbers `arr`, return an array of the numbers as strings,
// right-justified and padded to the same length.
function padNumbersToEqualLength(arr) {
  let maxLen = 0;
  const strings = arr.map(n => {
    const str = n.toString();
    maxLen = Math.max(maxLen, str.length);
    return str;
  });
  return strings.map(s => common.padLeft(s, maxLen));
}

// Produce a new string that would be the result of copying the contents
// of the string `src` onto `dest` at offset `offest`.
function strcpy(dest, src, offset) {
  const origDestLen = dest.length;
  const start = dest.slice(0, offset);
  const end = dest.slice(offset + src.length);
  return (start + src + end).substr(0, origDestLen);
}

// Casts the underlying lineAndCol object to a formatted message string,
// highlighting `ranges`.
function lineAndColumnToMessage(...ranges) {
  const lineAndCol = this;
  const offset = lineAndCol.offset;
  const repeatStr = common.repeatStr;

  const sb = new common.StringBuffer();
  sb.append('Line ' + lineAndCol.lineNum + ', col ' + lineAndCol.colNum + ':\n');

  // An array of the previous, current, and next line numbers as strings of equal length.
  const lineNumbers = padNumbersToEqualLength([
    lineAndCol.prevLine == null ? 0 : lineAndCol.lineNum - 1,
    lineAndCol.lineNum,
    lineAndCol.nextLine == null ? 0 : lineAndCol.lineNum + 1
  ]);

  // Helper for appending formatting input lines to the buffer.
  const appendLine = (num, content, prefix) => {
    sb.append(prefix + lineNumbers[num] + ' | ' + content + '\n');
  };

  // Include the previous line for context if possible.
  if (lineAndCol.prevLine != null) {
    appendLine(0, lineAndCol.prevLine, '  ');
  }
  // Line that the error occurred on.
  appendLine(1, lineAndCol.line, '> ');

  // Build up the line that points to the offset and possible indicates one or more ranges.
  // Start with a blank line, and indicate each range by overlaying a string of `~` chars.
  const lineLen = lineAndCol.line.length;
  let indicationLine = repeatStr(' ', lineLen + 1);
  for (let i = 0; i < ranges.length; ++i) {
    let startIdx = ranges[i][0];
    let endIdx = ranges[i][1];
    common.assert(startIdx >= 0 && startIdx <= endIdx, 'range start must be >= 0 and <= end');

    const lineStartOffset = offset - lineAndCol.colNum + 1;
    startIdx = Math.max(0, startIdx - lineStartOffset);
    endIdx = Math.min(endIdx - lineStartOffset, lineLen);

    indicationLine = strcpy(indicationLine, repeatStr('~', endIdx - startIdx), startIdx);
  }
  const gutterWidth = 2 + lineNumbers[1].length + 3;
  sb.append(repeatStr(' ', gutterWidth));
  indicationLine = strcpy(indicationLine, '^', lineAndCol.colNum - 1);
  sb.append(indicationLine.replace(/ +$/, '') + '\n');

  // Include the next line for context if possible.
  if (lineAndCol.nextLine != null) {
    appendLine(2, lineAndCol.nextLine, '  ');
  }
  return sb.contents();
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

let builtInRulesCallbacks = [];

// Since Grammar.BuiltInRules is bootstrapped, most of Ohm can't directly depend it.
// This function allows modules that do depend on the built-in rules to register a callback
// that will be called later in the initialization process.
exports.awaitBuiltInRules = cb => {
  builtInRulesCallbacks.push(cb);
};

exports.announceBuiltInRules = grammar => {
  builtInRulesCallbacks.forEach(cb => {
    cb(grammar);
  });
  builtInRulesCallbacks = null;
};

// Return an object with the line and column information for the given
// offset in `str`.
exports.getLineAndColumn = (str, offset) => {
  let lineNum = 1;
  let colNum = 1;

  let currOffset = 0;
  let lineStartOffset = 0;

  let nextLine = null;
  let prevLine = null;
  let prevLineStartOffset = -1;

  while (currOffset < offset) {
    const c = str.charAt(currOffset++);
    if (c === '\n') {
      lineNum++;
      colNum = 1;
      prevLineStartOffset = lineStartOffset;
      lineStartOffset = currOffset;
    } else if (c !== '\r') {
      colNum++;
    }
  }

  // Find the end of the target line.
  let lineEndOffset = str.indexOf('\n', lineStartOffset);
  if (lineEndOffset === -1) {
    lineEndOffset = str.length;
  } else {
    // Get the next line.
    const nextLineEndOffset = str.indexOf('\n', lineEndOffset + 1);
    nextLine = nextLineEndOffset === -1 ? str.slice(lineEndOffset)
                                        : str.slice(lineEndOffset, nextLineEndOffset);
    // Strip leading and trailing EOL char(s).
    nextLine = nextLine.replace(/^\r?\n/, '').replace(/\r$/, '');
  }

  // Get the previous line.
  if (prevLineStartOffset >= 0) {
    prevLine = str.slice(prevLineStartOffset, lineStartOffset)
        .replace(/\r?\n$/, ''); // Strip trailing EOL char(s).
  }

  // Get the target line, stripping a trailing carriage return if necessary.
  const line = str.slice(lineStartOffset, lineEndOffset).replace(/\r$/, '');

  return {
    offset,
    lineNum,
    colNum,
    line,
    prevLine,
    nextLine,
    toString: lineAndColumnToMessage
  };
};

// Return a nicely-formatted string describing the line and column for the
// given offset in `str` highlighting `ranges`.
exports.getLineAndColumnMessage = function(str, offset, ...ranges) {
  return exports.getLineAndColumn(str, offset).toString(...ranges);
};

exports.uniqueId = (() => {
  let idCounter = 0;
  return prefix => '' + prefix + idCounter++;
})();


/***/ }),

/***/ "./node_modules/ohm-js/src/version.js":
/*!********************************************!*\
  !*** ./node_modules/ohm-js/src/version.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global __GLOBAL_OHM_VERSION__ */



// When running under Node, read the version from package.json. For the browser,
// use a special global variable defined in the build process (see webpack.config.js).
module.exports = typeof __GLOBAL_OHM_VERSION__ === 'string'
    ? __GLOBAL_OHM_VERSION__
    : __webpack_require__(/*! ../package.json */ "./node_modules/ohm-js/package.json").version;


/***/ }),

/***/ "./node_modules/ohm-js/third_party/UnicodeCategories.js":
/*!**************************************************************!*\
  !*** ./node_modules/ohm-js/third_party/UnicodeCategories.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Based on https://github.com/mathiasbynens/unicode-9.0.0.
// These are just categories that are used in ES5/ES2015.
// The full list of Unicode categories is here: http://www.fileformat.info/info/unicode/category/index.htm.
module.exports = {
  // Letters
  Lu: /[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]/,
  Ll: /[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]/,
  Lt: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/,
  Lm: /[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]/,
  Lo: /[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,

  // Numbers
  Nl: /[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]|\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]/,
  Nd: /[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|[\uD805\uD807][\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]/,

  // Marks
  Mn: /[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]/,
  Mc: /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,

  // Punctuation, Connector
  Pc: /[_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]/,

  // Separator, Space
  Zs: /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,

  // These two are not real Unicode categories, but our useful for Ohm.
  // L is a combination of all the letter categories.
  // Ltmo is a combination of Lt, Lm, and Lo.
  L: /[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
  Ltmo: /[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]|[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]|[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/
};


/***/ }),

/***/ "./node_modules/util-extend/extend.js":
/*!********************************************!*\
  !*** ./node_modules/util-extend/extend.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = extend;
function extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}


/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./plugins/merriam.js":
/*!****************************!*\
  !*** ./plugins/merriam.js ***!
  \****************************/
/*! exports provided: merriam, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merriam", function() { return merriam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return merriam; });
const merriam = {
    name: "MerriamAPI",
    load: function(url){
        this.src = url;
        return true;
    },
    response: null,
    cache: null,
    cacheNextItem: null,
    currentResponseItemIndex: -1,
    src: null,
    get: async function(prerequisite, arg){
        if(arg){
            if(!this.cache){
                throw Error("No result has been fetched");
            }
            if(arg == "next"){
                let results = this.cache.results;
                this.currentResponseItemIndex += 1;
                if(this.currentResponseItemIndex >= results.length){
                    this.currentResponseItemIndex = 0;
                }
                this.response = this.cache.results[this.currentResponseItemIndex];
                // put the result in the next item cache
                this.cacheNextItem = this.cache.results[this.currentResponseItemIndex];
                return JSON.stringify(this.response, null, '\t');
            }
            // here we assume that the arg is a key in the next item cache
            this.response = this.cacheNextItem[arg];
            return this.response;
        }
        const payload = parsePrerequisite(prerequisite);
        const params = {
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "body": JSON.stringify(payload)
        };
        let response = await fetch(this.src, params);
        if (response.ok) { // if HTTP-status is 200-299
            // get the response body (the method explained below)
            let json = await response.json();
            this.response = json;
            this.cache = json;
            return JSON.stringify(this.response, null, '\t');
        } else {
            console.error("HTTP-Error: " + response.status);
            return false;
        };
    }
}


let parsePrerequisite = (p) => {
    let pList = p.split(";");
    let payload = {};
    pList.forEach((item) => {
        let key = item.split(":")[0];
        let value = item.replace(`${key}:`, "");
        switch(key){
        case "fields":
            payload["fields"] = value.split(',');
            break;
        case "weights":
            let weights = {};
            value.split(",").forEach((w) => {
                let [w_name, w_value] = w.split(":");
                weights[w_name] = Number(w_value);
            });
            payload["weights"] = weights;
            break;
        case "doc_ids":
            payload["doc_ids"] = value.split(",");
            break;
        case "limit":
            payload["limit"] = Number(value);
            break;
        }
    });
    return payload;
}





/***/ }),

/***/ "./plugins/plugins.js":
/*!****************************!*\
  !*** ./plugins/plugins.js ***!
  \****************************/
/*! exports provided: plugins, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugins", function() { return plugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return plugins; });
/* harmony import */ var _testAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./testAPI.js */ "./plugins/testAPI.js");
/* harmony import */ var _merriam_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./merriam.js */ "./plugins/merriam.js");



const plugins = {
    "MerriamAPI": _merriam_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    "TestAPI": _testAPI_js__WEBPACK_IMPORTED_MODULE_0__["default"]
}




/***/ }),

/***/ "./plugins/testAPI.js":
/*!****************************!*\
  !*** ./plugins/testAPI.js ***!
  \****************************/
/*! exports provided: test, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test", function() { return test; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return test; });
const test = {
    name: "TestAPI",
    load: function(url){
        this.src = url;
        return true;
    },
    response: null,
    src: null,
    get: async function(prerequisite, key){
        if(key){
            if(!this.response){
                throw Error("No result has been fetched");
            }
            return this.response[key];
        }
        let src = this.src;
        if(prerequisite){
            src = src + "/" + prerequisite;
        }
        let response = await fetch(src);
        if (response.ok) { // if HTTP-status is 200-299
            // get the response body (the method explained below)
            let json = await response.json();
            this.response = json;
            return JSON.stringify(json);
        } else {
            console.error("HTTP-Error: " + response.status);
            return false;
        };
    },
};




/***/ })

/******/ });