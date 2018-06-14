import React, { Component } from 'react';

class Rule extends Component {

	componentDidMount() {
	
	  	var lred = RF.redit;
  		var ruleHtml = lred.ruleToHTML(this.props.json, 999, 1);
		this.el.innerHTML = ruleHtml;
		$('li', this.el).on('click', function(elem, templ) {
    	  RF.redit.clickFun(elem, templ);
    	 });
		// lred.setupMenu();
		
	}
	render() {
		return <div ref={el => this.el = el}> </div>
	}
};

export { Rule};