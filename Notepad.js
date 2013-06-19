/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
 
(function (){

Ext.namespace('Ext.students');
var student_list_url = 'models/StudentList.php';
var insert_new_student = 'models/InsertNewStudent.php';
var update_student_record = 'models/UpdateStudentEntry.php';
var student_list_url_fields = ['Stud_ID', 'S_Fname', 'S_Lname', 'S_MI', 'S_Level'];
var delete_student_record = 'models/DeleteStudentEntry.php';
	
var student_list_store = Ext.create('Ext.data.Store', {
        storeId: 'student_list_url_fields',
        proxy: { 
		        type: 'ajax',
				url: student_list_url,
				reader: {
					type: 'json',
					root: 'results'
					}
				},
        autoLoad: true,
        fields: student_list_url_fields
    });
	
var transaction_fields = [{
		xtype: 'textfield',
		name: 'client_code',
		id: 'txtStudentID',
		fieldLabel: 'Student ID',
		readOnly: false,
		allowBlank: false,
		labelWidth: 115,
		width: 320
	}, {
		xtype: 'textfield',
		name: 'student_lname',
		id: 'txtLname',
		fieldLabel: 'Last Name',
		readOnly: false,
		allowBlank: false,
		labelWidth: 115,
		width: 420
	}, {
		xtype: 'textfield',
		id: 'txtFname',
		name: 'student_fname',
		fieldLabel: 'First Name',
		readOnly: false,
		allowBlank: false,
		labelWidth: 115,
		width: 420
	}, {
		xtype: 'textfield',
		id: 'txtmi',
		name: 'middle_init',
		fieldLabel: 'MI',
		readOnly: false,
		allowBlank: false,
		labelWidth: 115,
		width: 180
	}, {
		xtype: 'textfield',
		id: 'txtyearlvl',
		name: 'year_level',
		fieldLabel: 'Year Level',
		labelWidth: 115,
		width: 180,
		readOnly: false,
		allowBlank: false
	}
];

Ext.define('MyDesktop.Notepad', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
        //'Ext.form.field.TextArea'
    ],

    id:'SavePDF',

    init : function(){
        this.launcher = {
            text: 'Student',
            iconCls:'notepad'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('notepad');
        if(!win){
            win = desktop.createWindow({
                id: 'notepad',
                title:'STUDENT RECORDS',
                width:780,
                height:480,
                iconCls: 'notepad',
                animCollapse:false,
                border: false,
				layout: 'fit',
                hideMode: 'offsets',

                layout: 'fit',
                items: [				  
					{                        
                        xtype: 'grid',
						id: 'student_list_grid',
                        store:  student_list_store,
                        columns: [
                            new Ext.grid.RowNumberer(),
                            {
                                text: "Student ID",                              
								width: 120,
                                sortable: true,
                                dataIndex: 'Stud_ID'
                            },
                            {
                                text: "Firstname",
                                width: 230,
                                sortable: true,
                                dataIndex: 'S_Fname'
                            },
                            {
                                text: "LastName",
                                width: 250,
                                sortable: true,
                                dataIndex: 'S_Lname'
                            },
                            {
                                text: "MI",
                                width: 70,
                                sortable: true,
                                dataIndex: 'S_MI'
                            },
                            {
                                text: "Level",
                                width: 70,
                                sortable: true,
                                dataIndex: 'S_Level'
                            }
                        ],
						listeners:{
							selectionchange: function (view, selections, options) {
							var gridBP = Ext.getCmp('student_list_grid');
							sm = gridBP.getSelectionModel();
							if (sm.hasSelection()) {
								selections = sm.getSelection();										
								Ext.students.Stud_ID = selections[0].raw.Stud_ID;
								Ext.students.S_Fname = selections[0].raw.S_Fname;
								Ext.students.S_Lname = selections[0].raw.S_Lname;
								Ext.students.S_MI = selections[0].raw.S_MI;
								Ext.students.S_Level = selections[0].raw.S_Level;																			
							}
						  }
						}
						
                    }				
                ],
				tbar:[{
                    text:'Add',
                    tooltip:'Add Record',
                    iconCls:'add',
					handler: function (){ 
						NewRecord(1);
					}
                }, '-', {
                    text:'Edit',
                    tooltip:'Edit Record',
                    iconCls:'option',
					handler: function (){ 
						NewRecord(2);
					}
                },'-',{
                    text:'Remove',
                    tooltip:'Remove Record',
                    iconCls:'remove',
					handler: function(){
					    DeleteRecode(Ext.students.Stud_ID);
					}
					
                }]
            });
        }
        return win;
    }
	
	
});

function NewRecord(Number) {	  
        var NewRecordWin;
        var NewRecordForm = Ext.widget('form', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyPadding: 10,
            items: [{
                    xtype: 'panel',
                    layout: 'column',
                    border: false,
                    items: [{
                            xtype: 'fieldset',
                            id: 'transaction_panel',
                            colspan: 2,
                            width: 480,
                            border: false,
                            style: 'margin-right: 5px',
                            items: transaction_fields
                        }
                    ], //end items panel
                }
            ],
            buttons: [{
                    text: 'Save',
                    id: 'bpaysave',
					handler: function(){	
					var success = function (response) {		
						var resp = Ext.JSON.decode(response.responseText);
						if(resp.success){
						  if(Number ==1)
							Ext.Msg.alert("Add Record","Record Successfully Saved!");
						  else
						    Ext.Msg.alert("Update Record","Record Successfully Updated!");
							
							Ext.getCmp('student_list_grid').getView().getStore().load();
							ClearFields();
						}
						else{
							Ext.Msg.alert("Error","Please Fill-out The Requied Fields!!");
						}
						
					};	
						  if(Number ==1){	
						   Ext.Ajax.request({
							url: insert_new_student ,
							params: {
								StudID:  Ext.getCmp('txtStudentID').getValue(),
								SLName:  Ext.getCmp('txtLname').getValue(),
								SFName:  Ext.getCmp('txtFname').getValue(),
								SMI:  	 Ext.getCmp('txtmi').getValue(),
								SLevel:  Ext.getCmp('txtyearlvl').getValue()
							},
							success: success					
							});
						  }
						  else {						  
							  Ext.Ajax.request({
								url: update_student_record,
								params: {
									StudID:  Ext.getCmp('txtStudentID').getValue(),
									SLName:  Ext.getCmp('txtLname').getValue(),
									SFName:  Ext.getCmp('txtFname').getValue(),
									SMI:  	 Ext.getCmp('txtmi').getValue(),
									SLevel:  Ext.getCmp('txtyearlvl').getValue()
								},
								success: success					
								});
						  }
					}					
                }, {
                    text: 'Close',
                    handler: function () {
                        this.up('form').getForm().reset();
                        this.up('window').close();
                        this.up('window').destroy();                     
                    }
                }
            ]
            //end buttons
        } // end of layout
        ); //end widget

        NewRecordWin = Ext.widget('window', {
            title: 'Add New Record',
            closeAction: 'destroy',
            width: 500,
            height: 240,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: NewRecordForm
			
        });
	
    	Ext.getCmp('txtStudentID').setValue(Ext.students.Stud_ID);
		Ext.getCmp('txtLname').setValue(Ext.students.S_Fname);
		Ext.getCmp('txtFname').setValue(Ext.students.S_Lname);
		Ext.getCmp('txtmi').setValue(Ext.students.S_MI);
		Ext.getCmp('txtyearlvl').setValue(Ext.students.S_Level);
		
		if(Number == 1){
		 ClearFields();
		 NewRecordWin.show();
		}else{
		 if(Ext.getCmp('txtStudentID').getValue()=="")
		    Ext.Msg.alert("Failure","Please Select Record to Update!");
		 else
		   NewRecordWin.show();
		}
    
    }
	
	function DeleteRecode(ID){
	
		var success = function (response) {		
		var resp = Ext.JSON.decode(response.responseText);
		if(resp.success){}
			Ext.Msg.alert("Delete Record","Successfully Deleted Record!");
			Ext.getCmp('student_list_grid').getView().getStore().load();
		}
		
		if(ID == undefined)
			Ext.Msg.alert("Failure","Please Select Record to Delete!");
		else{
		   Ext.Msg.confirm('Delete', 'Are you sure you want to delete the record of '+Ext.students.S_Fname+' '+Ext.students.S_Lname+'?',function(button){ 
				if(button=='yes'){
					Ext.Ajax.request({
					url: delete_student_record,
					params: {
						StudID:  ID									
					},
					success: success					
					});
			  }
		  });
		}
	}
	function ClearFields(){
			Ext.getCmp('txtStudentID').setValue('');
			Ext.getCmp('txtLname').setValue('');
			Ext.getCmp('txtFname').setValue('');
			Ext.getCmp('txtmi').setValue('');
			Ext.getCmp('txtyearlvl').setValue('');
	}
	
})();
