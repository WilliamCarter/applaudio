define(["services/utils", "angularMocks"], function(Utilities) {


describe('Service: ApplaudioUtilities', function () {

    var Utils;

    var mockject;

    // excuted before each "it" is run.
    beforeEach(function (){

        mockject  = {
            name : "Jason",
            age : 99,
            imaginary : true,
            isImaginative : function() { return false },
            nested : {
                name : "Jules",
                age : 24,
                asshole : true,
                write : function() {
                    return null;
                }
            }
        };

        module("ApplaudioUtilities");

        inject(function(_ApplaudioUtils_) {
            Utils = _ApplaudioUtils_;
        });


    });

    it('should be able to insert items at any point in an array', function() {

        var numberArray = [1,2,4,5];
        Utils.insertAt(numberArray, 2, 3);
        expect(numberArray).toEqual([1,2,3,4,5]);
    });

    it('should be able to clone javascript objects', function() {

        var clonedObject = Utils.clone(mockject)
        expect(clonedObject).toEqual(

            {
                name : "Jason",
                age : 99,
                imaginary : true,
                nested : {
                    name : "Jules",
                    age : 24,
                    asshole : true,
                }
            }

        );
    });

    it('should be able to copy one javascript objects attributes, including functions, on to another', function() {

        // currently having problems with this one as it is difficult to test equality of objects with functions.
        pending();

    });

    it('should be able to convert standard strings to HTML compliant strings', function() {

        expect(Utils.htmlify("Katrina and the Waves")).toBe("katrina-and-the-waves");
    });

});

});