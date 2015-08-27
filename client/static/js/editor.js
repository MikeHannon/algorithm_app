var Editor = function(target,type){

  this.editor = ace.edit(target);
  this.editor.setTheme("ace/theme/monokai");
  this.editor.getSession().setMode("ace/mode/"+type);
  var target = target;

  this.update=function(with_data){
    this.editor.setValue(with_data);
    return this;
  }

  this.setMode = function(of_type){
    this.editor.getSession().setMode("ace/mode/"+of_type);
    return this;
  }
  return this;


};
