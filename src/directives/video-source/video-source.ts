import { Directive, Output, ElementRef, Renderer, EventEmitter } from '@angular/core';

/**
 * Generated class for the VideoSourceDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[video-source]'
  // ,host: {
  //       '(ionDrag)': 'handleDrag($event)'
  //   }
})
export class VideoSourceDirective {

  @Output() overslide: any = new EventEmitter();

    src: any = "Audio/HipHop/test0.mp3";
    type: any = "audio/mpeg";

    abcHandle: any;
    abcd: any;

    constructor(public element: ElementRef, public renderer: Renderer) {
        console.log('--------------------------VideoSourceDirective');
        this.src = "Audio/HipHop/test0.mp3";
        this.type = "audio/mpeg";
    }

    ngOnInit(){
      this.abcHandle = this.element.nativeElement.getElementsByClassName('jdjdjd');
      this.abcd = this.abcHandle.firstElementChild;
      this.abcd.src = "Audio/HipHop/test0.mp3";
      this.type = "audio/mpeg";
    }

    updateVideoSource(){
    }



        // app.directive('audios', function($sce) {
        //   return {
        //     restrict: 'A',
        //     scope: { code:'=' },
        //     replace: true,
        //     template: '<audio ng-src="{{url}}" controls></audio>',
        //     link: function (scope) {
        //         scope.$watch('code', function (newVal, oldVal) {
        //            if (newVal !== undefined) {
        //                scope.url = $sce.trustAsResourceUrl("/data/media/" + newVal);
        //            }
        //         });
        //     }
        //   };
        // });


}
