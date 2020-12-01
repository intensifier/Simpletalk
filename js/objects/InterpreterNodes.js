/**
 * Interpreter Nodes
 * ------------------------------
 * This module contains class definitions
 * for the various Interpreter nodes available
 * to the ohm semantics.
 * These nodes are interpreted by the Interpreter
 * to produce bound javascript functions compiled from
 * SimpleTalk scripts
 */
class InterpreterNode {
    constructor(config){
        this.config = config;
        this.isInterpreterNode = true;
    }

    /**
     * Default evaluation method for
     * the base node.
     * By default it does nothing.
     * Subclasses should implement their
     * own versions
     */
    eval(context){
        throw new Error(`Should be implemented in subclass!`);
    }
};


class VariableINode extends InterpreterNode {
    constructor(configDict){
        super(configDict);
        this.isVariableINode = true;
        this.name = configDict.name || undefined;
    }

    eval(context){
        if(!context._executionContext){
            throw new Error(`Could not find execution context for ${context.type} ${context.id}`);
        }
        return context._executionContext[this.name];
    }
};


class PartRefINode extends InterpreterNode {
    constructor(configDict){
        super(configDict);
        this.isPartRefINode = true;

        this.objectType = configDict.objectType || undefined;
        this.objectId = configDict.objectId || undefined;
        this.name = configDict.name || undefined;
        this.thisOrCurrent = configDict.thisOrCurrent || undefined;
    }

    eval(context){
        throw new Error(`Should be implemented`);
    }
};

export {
    VariableINode,
    PartRefINode
};