"use strict"

let src = [
    '<iframe src="https://www.google.com/maps/embed?pb=!4v1632822462460!6m8!1m7!1sCAoSLEFGMVFpcE1aOVlnbkFyYndFSWJUREFOZVNRWUZ1OWdOcXBXXzJTdjhGQnZZ!2m2!1d48.8606881835717!2d2.335679134426641!3f337.93231559115526!4f-3.2751117472515574!5f0.4000000000000002" width="100%" height="950" style="border:0;" allow="fullscreen" loading="lazy"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!4v1632823133262!6m8!1m7!1sCAoSLEFGMVFpcE5Sal9Dd1A0Y29ETVlkQ0hqNnFIZUJlSnBJMlZ4VTVCVXNPWDRG!2m2!1d48.8563254!2d2.3352706!3f0!4f0!5f0.7820865974627469" width="100%" height="950" style="border:0;" allow="fullscreen" loading="lazy"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!4v1632823174981!6m8!1m7!1sCAoSLEFGMVFpcE5NWkdRdUVBLXBBVXZJR19lUF8yZjNnV1RLWkVKNlhMVkotUGdi!2m2!1d48.8601723!2d2.3395439!3f322.04!4f-5.75!5f0.440292882915489" width="100%" height="950" style="border:0;" allow="fullscreen" loading="lazy"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!4v1632823217040!6m8!1m7!1sCAoSLEFGMVFpcFA3dUZablRJVFJlLTdBRVZBZ0hBZnFpQ0wtMDNndkJIY1lXZ0Yz!2m2!1d48.86018303140322!2d2.335615591987402!3f177.69!4f5.609999999999999!5f0.4000000000000002" width="100%" height="950" style="border:0;" allow="fullscreen" loading="lazy"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!4v1632823257110!6m8!1m7!1sCAoSLEFGMVFpcE8xd2tVVWJ5enBQamotT1IwbVI1ZXRaSlQteGwtNDBYSzhyRFEz!2m2!1d48.85987877384653!2d2.335515730085149!3f7.53!4f4!5f0.5970117501821992" width="100%" height="950" style="border:0;" allow="fullscreen" loading="lazy"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!4v1632823293506!6m8!1m7!1sCAoSLEFGMVFpcFBwR0Fvd1lhdFZ5azNNTUduWkFhUWtZbTJFVWstRGxjYTA2U1M1!2m2!1d48.8563254!2d2.3352706!3f21.26!4f-10.090000000000003!5f0.4000000000000002" width="100%" height="950" style="border:0;" allow="fullscreen" loading="lazy"></iframe>',
    '<iframe src="https://www.google.com/maps/embed?pb=!4v1632824079334!6m8!1m7!1sCAoSLEFGMVFpcE9WeFpRdVN5M0J4OVRfSHBIXzdGdEJIRFRYdkk2U0YtQTEwb2NU!2m2!1d48.86181593314584!2d2.336681797486702!3f116.81658296032133!4f-21.04855585609114!5f0.7820865974627469" width="100%" height="950" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
]

let itemIndex = sessionStorage.getItem('virtual-tour');
let body = document.body;

body.insertAdjacentHTML('afterbegin', src[itemIndex]);