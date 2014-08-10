module.exports.register = function (Handlebars, options) {

  /**
   * Cludgey helper: can't quite figure out how to get good filepaths relative to distribution output
   * (the {{relative}} helper doesn't quite work).  Instead, just make a helper which strips out the first 'dist/'
   * on the passed-in filepath
   * @param {string} dest Destination filepath
   * @returns {string} Filepath without the 'dist/'
   */
  Handlebars.registerHelper('fileref', function(dest) {
    return (dest || this.dest).replace('dist/', '/');
  });

};
