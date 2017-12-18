class BaseClass {
    public constructor () {
    }

    public static getInstance(...args:any[]){
        var Class:any = this;
        if (!Class.instance) {
            var argsLen:number = args.length;
            if (argsLen == 0) {
                Class.instance = new Class();
            } else if (argsLen == 1) {
                Class.instance = new Class(args[0]);
            } else if (argsLen == 2) {
                Class.instance = new Class(args[0], args[1]);
            } else if (argsLen == 3) {
                Class.instance = new Class(args[0], args[1], args[2]);
            } else if (argsLen == 4) {
                Class.instance = new Class(args[0], args[1], args[2], args[3]);
            } else if (argsLen == 5) {
                Class.instance = new Class(args[0], args[1], args[2], args[3], args[4]);
            }
        }
        return Class.instance;
    }
}