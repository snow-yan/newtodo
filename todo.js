$(function(){
	var input=$("#input")
	var add=$("#add")
	var todos=[];
	
	
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos)
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].state)?"active":"";
			var d=(todos[i].state)?"active1":"";
			$("<li class='lists-v "+d+"'><span class='word'>"+todos[i].name+"</span><div class='change'><span class='    right "+c+"'>&#xe622;</span></div></li>").appendTo("#lists")
		}
	}
	add.on("touchend",function(){		
		var v=$.trim(input.val());
		if(!v){
			return;
		}
		var todo={
            name:v,
            state:0
        }
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos)
		$("<li class='lists-v'><span class='word'>"+v+"</span><div class='change'><span class='right'>&#xe622;</span></div></li>").appendTo("#lists")
		input.val("")
	})
	
	

	
	//	删除已完成
		var dele=$(".delete");
	    dele.on('touchend',function(){
        var newtodos=[];
	    for(var i=0;i<todos.length;i++){
		  if(todos[i].state!=1){
			  newtodos.push(todos[i])

		  }
        }
        todos=newtodos;
            console.log(newtodos)
        localStorage.todos=JSON.stringify(todos);
            var lis=$("#lists").find(".active1")

            lis.delay(100).queue(function(){
                $(this).addClass("ani-delete").dequeue().delay(100).addClass("ani-delete").queue(function(){
                    $(this).remove().dequeue();
                });
            })
		})




    var lists_v=$(".lists-v")
    var change=$(".change")
    var lists=$("#lists")
    lists.on("touchend","li",function(){
        var index=$(this).index();
        $(this).toggleClass("active1")
        $(this).find(".right").toggleClass("active")
        if($(this).find(".right").hasClass("active")&&$(this).hasClass("active1")){
            todos[index].state=1;
            localStorage.todos=JSON.stringify(todos)
        }else{
            todos[index].state=0;
            localStorage.todos=JSON.stringify(todos)
        }
    })













    /////////////////////////////////////////////////////////////////////////////


//	菜单
	var menu=$(".header img").eq(0);
	menu.on("touchend",function(){
		$(".hidden-left").animate({left:0},600)
	})
	var start;
	$(document).on("touchstart",function(e){
		 start=e.originalEvent.changedTouches[0].clientX;
//		 console.log(start)
	})
	$(document).on("touchend",function(e){
		 var end=e.originalEvent.changedTouches[0].clientX;
//		 console.log(end)
		 if(end-start<-50){
		 	$(".hidden-left").animate({left:"-2.4rem"},600)
		 }
	})

})
