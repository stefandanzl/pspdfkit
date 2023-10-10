
/*    const unloadListener = document.getElementById("unloadButton").addEventListener("click",function() {
        try{
            console.log("TEST\n",PSPDFKit)
        instance.unload("pdfContainer");
        }
        catch{
        console.log(error)
        }
        }
    );*/
let unloaderF;
let exitButton = {
    type: "custom",//"custom",
    id: "exitButton",
    // node: selectNode    // custom DOM node for custom toolbar node
    title: "Exit",
    // preset: annotationPresets.highlighter,
    icon: '<svg viewBox="0 0 16 16" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg8" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><metadata id="metadata5"><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type><dc:title></dc:title><dc:date>2021</dc:date><dc:creator><cc:agent><dc:title>Timothée Giet</dc:title></cc:agent></dc:creator><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/"></cc:license></cc:work><cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"></cc:permits><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"></cc:permits><cc:requires rdf:resource="http://creativecommons.org/ns#Notice"></cc:requires><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"></cc:requires><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"></cc:permits><cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike"></cc:requires></cc:license></rdf:rdf></metadata><rect transform="rotate(45)" ry="0" y="-1" x="4.3137083" height="2" width="14" id="rect1006" style="opacity:1;vector-effect:none;fill:#373737;fill-opacity:1;stroke:none;stroke-width:4;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:3.20000005;stroke-opacity:1"></rect><rect transform="rotate(-45)" ry="0" y="10.313708" x="-7" height="2" width="14" id="rect1006-5" style="opacity:1;vector-effect:none;fill:#373737;fill-opacity:1;stroke:none;stroke-width:4;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:3.20000005;stroke-opacity:1"></rect></g></svg>',
    onPress: (event) => { unloaderF(); }
}

let openButton = {
    type: "custom",
    id: "openButton",
    title: "Open",
    icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 21H3C2.44772 21 2 20.5523 2 20L2 4C2 3.44772 2.44771 3 3 3H7.73381C8.08507 3 8.41058 3.1843 8.5913 3.4855L9.8087 5.5145C9.98942 5.8157 10.3149 6 10.6662 6H20C20.5523 6 21 6.44772 21 7V10" stroke="#200E32" stroke-width="2" stroke-linecap="round"></path> <path d="M4.79903 10.7369L2.34449 19.7369C2.17099 20.373 2.64988 21 3.30925 21H19.2362C19.6872 21 20.0823 20.6982 20.201 20.2631L22.6555 11.2631C22.829 10.627 22.3501 10 21.6908 10H5.7638C5.31284 10 4.91769 10.3018 4.79903 10.7369Z" stroke="#200E32" stroke-width="2"></path> </g></svg>',
    onPress: (event) => {

        openF(event);
    }

}
let text;
let fileHandle;
let textarea = document.getElementById("textarea")

async function fileloader(){
    [fileHandle] = await window.showOpenFilePicker();  //showDirectoryPicker()
    console.log(fileHandle.kind);
    let fileData = await fileHandle.getFile();
    console.log(fileData);
    text = await fileData.text();
    console.log(text);
    textarea.innerText = text;

}

async function save(){
    let stream = await fileHandle.createWritable();
    await stream.write(textarea.innerText);
    await stream.close();
}

async function saveAs(){
    fileHandle = await window.showSaveFilePicker();
    save();
}


function openF(event) {
    console.log("openF");
    if (event.target.files.length > 1) {
        unloaderF();
        console.log(">1");
    }
    else if (event.target.files.length === 1) {
        console.log("=1")
        console.log(event.target.files)
        const documentFileObjectUrl = URL.createObjectURL(event.target.files[0]);
        document.getElementById("uploadButton1").style.display = 'none';
        PSPDFKit.load({
            container: "#pdfContainer",
            document: documentFileObjectUrl,
            initialViewState: new PSPDFKit.ViewState({
                pageIndex: 2,
                sidebarMode: PSPDFKit.SidebarMode.THUMBNAILS,
            }),
            toolbarItems: [...PSPDFKit.defaultToolbarItems,
                openButton,
                exitButton
            ]

        })
            .then(instance => {
                // Make sure to revoke the object URL so the browser doesn't hold on to the file object that's not needed any more.
                URL.revokeObjectURL(documentFileObjectUrl);

                unloaderF = function unloader() {
                    try {
                        PSPDFKit.unload(instance)
                        document.getElementById("uploadButton1").style.display = 'block';
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
            
                document.getElementById("uploadField").addEventListener("change", function (event) {
                    // Access the event object (event) and the selected file(s) (fileInput.files) here
                    console.log("Event:", event);
                    console.log("Selected file(s):", fileInput.files);
                  });
            
            
            
            });
    }
}



console.log(exitButton)



function uploadF() {
    document.getElementById("uploadField")
    uploadField.click();

}

document.getElementById("uploadField").addEventListener("change", (event) => { openF(event); });