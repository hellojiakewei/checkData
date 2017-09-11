/*
* @Author: Administrator
* @Date:   2017-09-08 20:50:45
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-08 23:00:15
*/
(function(window,factory,plug){
        factory(jQuery,plug);
})(this,function(jQuery,plug){
	   //插件内部默认配置项
      var DEFALT={
          initEvent:"input",
          plug:"dr"
      }

      //插件内部编写校验规则
      var _RULAS_={
      	    "regexp":function(data){   //window  =>  Element 
      	    	    console.log(data)
                    return  new RegExp(data).test(this.val()); 
      	     },     
           "required" :function(data){
                   return this.val();
           },      
           "min-length":function(data){
                 return this.val().length>=data;
           },     
           "confirm":function(data){
                 var passElement=$(":password")[0];
                if(passElement.value===""||this.val()!==passElement.value){
                        return false
                }else{
                	   return true;
                }
           },

      }

	      //jQuery.prototype  $.fn
          $.fn[plug]=function(options){
                if(!this.is("form")){return}
               this.$file=this.find("input");
              // console.log(this.$file)
              $.extend(this,DEFALT,options);   //覆盖

            this.$file.on(this.initEvent,function(){   //Element对象
            	               var _this=$(this);
            	                   _this.siblings("p").remove();

            	   $.each(_RULAS_,function(key,fn){
            	   	       var $filename=_this.data(DEFALT.plug+"-"+key);   //data-dr-xxx
            	   	       var $filemessage=_this.data(DEFALT.plug+"-"+key+"-message");
            	   	            //console.log($filemessage)
                              if($filename){   //true  false
                                var result=fn.call(_this,$filename);

                                   if(!result){   //false
                                   	_this.after('<p style="color:red">'+$filemessage+'</p>'); 
                                   }

                              }
              
            	   });
            });
           

             //提交表单
               var   $this=this;
             this.on("submit",function(){  //this
                    $this.$file.trigger($this.initEvent);
                       return false;
             });


          };
     
       //  jquery.prototype.dataResult   //函数对象
       $.fn[plug].extendResult=function(options){
            $.extend(_RULAS_,options);
               //console.log(_RULAS_)
            
       }  

},"dataResult");

