define(["services/utils", "angularMocks"], function() {

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
                },
                array : [1,2,3]
            };

            module("ApplaudioUtilities");

            inject(function(_ApplaudioUtils_) {
                Utils = _ApplaudioUtils_;
                configuration = {
                    supportedMedia : {
                        types: ["audio/mpeg", "audio/mp3", "audio/ogg"],
                        extensions: [".mpeg", ".mp3", ".ogg"]
                    }
                };
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
                    },
                    array : [1, 2, 3]
                }

            );
        });

        it('should be able to detect inequality of types', function() {
            var nine = 9;
            var ten = "9";
            expect(Utils.areEqual(nine, ten)).toBe(false);
        });

        it('should be able to detect equality of numbers', function() {
            var nine = 9;
            var nineAgain = 9;
            expect(Utils.areEqual(nine, nineAgain)).toBe(true);
        });

        it('should be able to detect inequality of numbers', function() {
            var nine = 9;
            var ten = 10;
            expect(Utils.areEqual(nine, ten)).toBe(false);
        });

        it('should be able to detect equality of strings', function() {
            var nine = "9";
            var nineAgain = "9";
            expect(Utils.areEqual(nine, nineAgain)).toBe(true);
        });

        it('should be able to detect inequality of strings', function() {
            var nine = "9";
            var ten = "10";
            expect(Utils.areEqual(nine, ten)).toBe(false);
        });

        it('should be able to detect equality of booleans', function() {
            var troo = true;
            var trooAgain = true;
            expect(Utils.areEqual(troo, trooAgain)).toBe(true);
        });

        it('should be able to detect inequality of booleans', function() {
            var troo = true;
            var falce = false;
            expect(Utils.areEqual(troo, falce)).toBe(false);
        });

        it('should be able to detect equality of objects', function() {
            var tomE = { firstname: "Tom", surname: "Egan"};
            var tomEgain = { firstname: "Tom", surname: "Egan"};
            expect(Utils.areEqual(tomE, tomEgain)).toBe(true);
        });

        it('should be able to detect inequality of objects', function() {
            var tomE = { firstname: "Tom", surname: "Egan"};
            var tomW = { firstname: "Tom", surname: "Winton"};
            expect(Utils.areEqual(tomE, tomW)).toBe(false);
        });

        it('should be able to detect equality of function names', function() {
            var goObject = { go: function(){ console.log("go, go, go,"); } }
            var goObjectAgain = { go: function(){ /* do nothing */ } }
            expect(Utils.areEqual(goObject, goObjectAgain)).toBe(true);
        });

        it('should be able to detect inequality of function names', function() {
            var goObject = { go: function(){ console.log("go, go, go,"); } }
            var goObjectAgain = { doNothing: function(){ /* do nothing */ } }
            expect(Utils.areEqual(goObject, goObjectAgain)).toBe(false);
        });

        it('should be able to detect equality of arrays', function() {
            var oneToFive = [1,2,3,4,5];
            var oneToFiveAgain = [1, 2, 3, 4, 5];
            expect(Utils.areEqual(oneToFive, oneToFiveAgain)).toBe(true);
        });

        it('should be able to detect inequality of arrays', function() {
            var oneToFive = [1,2,3,4,5];
            var oneToFour = [1, 2, 3, 4];
            expect(Utils.areEqual(oneToFive, oneToFour)).toBe(false);
        });

        it('should be able to detect equality of complex, nested structures', function() {
            expect(Utils.areEqual(mockject, {
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
                },
                array : [1,2,3]
            })).toBe(true);
        });

        it('should be able to detect inequality of complex, nested structures', function() {
            // different age in nested object
            expect(Utils.areEqual(mockject, {
                name : "Jason",
                age : 99,
                imaginary : true,
                isImaginative : function() { return false },
                nested : {
                    name : "Jules",
                    age : 25,
                    asshole : true,
                    write : function() {
                        return null;
                    }
                },
                array : [1,2,3]
            })).toBe(false);
        });


        // Utils.merge
        it('should be able to copy one javascript object\'s attributes, including functions, on to another', function() {

            Utils.merge(mockject, {
                name : "Jack",
                nested : {
                    age : 25,
                    acceptGifts : function(gift) {
                        throw gift;
                    },
                    array: [1, 2, 3]
                }
            });

            expect(Utils.areEqual(mockject, {
                name : "Jack",
                age : 99,
                imaginary : true,
                isImaginative : function() { return false },
                nested : {
                    name : "Jules",
                    age : 25,
                    asshole : true,
                    write : function() {
                        return null;
                    },
                    acceptGifts : function(gift) {
                        throw gift;
                    },
                    array: [1, 2, 3]
                },
                array : [1,2,3]
            })).toBe(true);

        });

        it('should merge arrays as arrays, not objects with number indexes (previous bug)', function() {

            var object = {};
            Utils.merge(object, { array: [1, 2] });
            expect(Array.isArray(object.array)).toBe(true);

        });

        // Utils.htmlify
        it('should be able to convert standard strings to HTML compliant strings', function() {

            expect(Utils.htmlify("Katrina and the Waves")).toBe("katrina-and-the-waves");
        });

    });

});