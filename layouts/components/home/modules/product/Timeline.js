import { gsap } from "gsap";


export default function Timeline () {

    
    return (
<div className="w-full bg-white">

<svg id="svg" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 600 1200" className="max-w-[600px] overflow-visible"> 

  <text class="text01" x="30" y="190">2018</text>
  <text class="text02" x="30" y="390">2019</text>
  <text class="text03" x="30" y="590">2020</text>

  <path class="theLine" 
        d="M -5,0
           Q 450 230 300 450 
           T 130 750
           Q 100 850 300 1000
           T 150 1200"
        fill="none" stroke="white" stroke-width="1px" />
  
  
  
  <circle class="ball ball01" r="20" cx="50" cy="100"></circle>
  <circle class="ball ball02" r="20" cx="278" cy="201"></circle>
  <circle class="ball ball03" r="20" cx="327" cy="401"></circle>
  <circle class="ball ball04" r="20" cx="203" cy="601"></circle>

</svg>

</div>

    );

}