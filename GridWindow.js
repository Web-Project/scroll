/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

(function(){

 var date_fields = ['title', 'Byear_month'];
 var date_url = 'models/SearchBook.php';
 
 var date_url_fields = Ext.create('Ext.data.Store', {
        storeId: 'date_url_fields',
        proxy: {
            type: 'ajax',
            url: date_url,
            reader: {
                type: 'json',
                root: 'results'
            }
        },
        autoLoad: true,
        fields: date_fields
 });	

Ext.define('MyDesktop.GridWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'grid-win',

    init : function(){
        this.launcher = {
            text: 'Grid Window',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win');
        if(!win){
            win = desktop.createWindow({
                id: 'grid-win',
                title:'UCLM Online Thesis Repository',
                width:1200,
                height:800,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
				items:[{
						region: 'west',
						stateId: 'navigation-panel',
						id: 'west-panel', // see Ext.getCmp() below
						title: 'Date',
						split: true,
						width: 150,
						minWidth: 150,
						maxWidth: 250,
						frame: true,
						animCollapse: true,
						margins: '0 0 0 0',
						items:[ {
									xtype: 'grid',
									id: 'books_list_grid',
									store: date_url_fields,
									columns: [
										 {
											text: "asd",
											id: 'sample',
											width: 900,
											sortable: true,
											stripeRows: true,
											dataIndex: 'Byear_month',
											style: '.x-grid-header {display:none;}',
 
										}
									]
								} ]
						,
				}],
            });
        }
        return win;
    }
});
Ext.get("hideit").on('click', function(){
            // get a reference to the Panel that was created with id = 'west-panel'
            var w = Ext.getCmp('west-panel');
            // expand or collapse that Panel based on its collapsed property state
            w.collapsed ? w.expand() : w.collapse();
        });
		
function getData(){
  alert('Hello!');
	var success = function (response) {			
	        
		}
	
	Ext.Ajax.request({
			url: 'models/SearchBook.php',
			success: success
	});
}

})();

