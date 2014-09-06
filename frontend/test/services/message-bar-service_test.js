define(["components/message-bar/message-bar", "angularMocks"], function() {

    describe("The Message Bar Service", function() {

        var messageBarService;

        beforeEach(function() {
            module('MessageBar');

            inject(function(_MessageBarService_) {
                messageBarService = _MessageBarService_;
            });
        });

        it("should add a message to the queue when prompted", function() {
            var successMessage = "Directory 'Love' created successfully";
            messageBarService.addMessage(successMessage);
            expect(messageBarService.messageQueue[0].message).toBe(successMessage);
        });

        it("should set the 'type' of the message if specified", function() {
            var type = "SUPER ERROR!!!!"
            messageBarService.addMessage("Wiley in the library", type);
            expect(messageBarService.messageQueue[0].type).toBe(type);
        });

        it("should set the 'type' of the message to 'standard' if unspecified", function() {
            messageBarService.addMessage("'Pulp' added successfully");
            expect(messageBarService.messageQueue[0].type).toBe("standard");
        });

        it("should assign an integer ID to each message", function() {
            messageBarService.addMessage("404 - Not Found");
            expect(typeof messageBarService.messageQueue[0].id).toBe("number");
        });

        it('should remove messages from the queue in a first in, first out manner', function() {
            messageBarService.addMessage("ONE");
            messageBarService.addMessage("TWO");

            expect(messageBarService.removeMessage().message).toBe("ONE");
            expect(messageBarService.removeMessage().message).toBe("TWO");
        });

    });

});