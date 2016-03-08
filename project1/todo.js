$(document).ready(function(e) {
	$('#add-todo').button({ 
		icons: { primary: "ui-icon-circle-plus" }}).click(
			function() {
				$('#task').val('');
				$('#new-todo').dialog('open');
			});
	$('#new-todo').dialog({
		modal : true, autoOpen : false,
		buttons : {
			"Add task" : function () { 
				var taskName = $('#task').val();
				if (taskName === '') { return false; }
				var taskHTML = '<li><span class="done">%</span>';
				taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML);
				$newTask.find('.task').text(taskName);
				$newTask.hide();
				$('#todo-list').prepend($newTask);
				$newTask.show('clip',250).effect('highlight',1000);
				$(this).dialog('close');
				$(this).dialog('clear');
			},
			"Cancel" : function () { $(this).dialog('close'); }
		}
	});
	$('#todo-list').on('click', '.done', function() {
		var $taskItem = $(this).parent('li');
		$taskItem.slideUp(250, function() {
			var $this = $(this);
			$this.detach();
			$('#completed-list').prepend($this);
			$this.slideDown();
		});
	});
	
	$('#todo-list').sortable({
		connectWith : $('#completed-list').sortable(),
		cursor : 'pointer',
		placeholder : 'ui-state-highlight',
		cancel : '.delete,.done'
	});
	var conf;

	$('#todo-list').on('click','.delete',function() {
		$('#confirm').dialog('open');
		conf = $(this);
	});
	

	$('#completed-list').on('click','.delete',function() {
		$('#confirm').dialog('open');
		conf = $(this);
	});
	
	$('#confirm').dialog({
		modal : true, autoOpen : false,
		buttons : {
			"Yes" : function () { 
				conf.parent('li').effect('puff', function() { 
					conf.remove(); 
				});
				$(this).dialog('close'); 
			},
			"No" : function () { 
				$(this).dialog('close'); 
			}
		}
	});
}); // end ready
