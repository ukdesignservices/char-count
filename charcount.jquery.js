// CHARACTER COUNT PLUGIN
// BEN CAMPBELL 2013

$.charCount = {
	id: "CharCount",
	version: "1.0",
	defaults: {
		limit:100, // (INTEGER) Default character limit
		low: 10, // (INTEGER) Indicate length is approaching limit
		sid:"cc", // (STRING) Unique Identifier - needed for multiple instances
		hardlimit:true, // (BOOLEAN) Enforce a hard limit and do not allow any more characters to be added
		overlimitclass:"error", // (STRING) CSS Class to be added to input when over limit
		lowcountclass:"count-low", // (STRING) CSS Class to be added to remanining number when 'low' is reached
		charsremainingclass:"chars-remaining" // (STRING) CSS Class added to 'Characters Remaining' text + number
	}
};
(function ($) {
	$.fn.extend({
		charCount: function(options) {
		    return this.each(function () {
				var $t = $(this), opts = $.extend({},$.charCount.defaults,options);
				charcnt = function(len) {
					return (opts.limit - len);
				}
				setInterval(function(){
						rm = (opts.limit - $t.val().length);
						(rm <= opts.low ? $("span[data-value='cc_" + opts.sid + "']").addClass(opts.lowcountclass) :$("span[data-value='cc_" + opts.sid + "']").removeClass(opts.lowcountclass));
						if (rm <= 0 && opts.hardlimit) {
							$("span[data-value='cc_" + opts.sid + "']").html(0);
							$t.val($t.val().substr(0, opts.limit));
						} else {    
							(rm < 0 ? $t.addClass(opts.overlimitclass) : $t.removeClass(opts.overlimitclass))
							$("span[data-value='cc_" + opts.sid + "']").html(rm);    
						}
					},100)
				$t.after("<div class='" + opts.charsremainingclass + "'>Characters remaining: <span data-value='cc_" + opts.sid + "'>" + opts.limit + "</span></div>")
			});
		}
	})
})(jQuery);
