Files from last night's class have been uploaded to github and dropbox.

For homework please do the following:

More sophisticated module/IIFE practice (remember there are many many variations of this pattern out there - we talked about a few - use whatever patterns you feel make most sense here - other than coding it all directly as shown below).

Create a base object/namespace called myApp. This will be the namespace/parent object. The myApp variable will be the only global variable.
Rewrite (lots of cut and paste is fine) the module you wrote for previous homework - the days of the week module/IIFE - to be part of a Utils object/namespace that is contained within the myApp object/namespace. (like our app.models app.views example)
Write a new module/IIFE (in a separate file) that has one function - stringCaseInsensitiveEquals that does a non case sensitive comparison of two strings and returns true if equal, false if not (we discussed some of the merits of different ways of doing string comparison in class, for this exercise we don't really care which you use) This module should become part of the same Utils submodule that the month's functions are part of.
i.e. end result will be almost as if you had written something like this - but done using some variation of the module pattern spread out into multiple files instead of actually written this way. (Allowing for multiple developers to work on multiple js files loaded in any order and still end up with a logical structure)

var myApp = {
    Utils: {
        getDayName: function(){....},
        getDayNumber: function(){.....},
        stringCaseInsensitiveEquals: function(){.....}
    }
};

and can be used like this:
myApp.Utils.getDayName(2); // Monday
myApp.Utils.stringCaseInsensitiveEquals('apple', 'APPle'); // true