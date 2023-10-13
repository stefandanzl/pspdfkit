import "./assets/pspdfkit.js";
//import { PSPDFKit } from "./assets/pspdfkit.js";

// We need to inform PSPDFKit where to look for its library assets, i.e. the location of the `pspdfkit-lib` directory.
const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

const annotationPresets = PSPDFKit.defaultAnnotationPresets
annotationPresets.highlighter = {
	strokeWidth: 12,
	opacity: 0.3,
};

console.log("annotate\n\n", annotationPresets);

var indexToInsert = 13;

const item = {
	type: "highlighter",//"custom",
	id: "author",
	// node: selectNode    // custom DOM node for custom toolbar node
	title: "highlighter",
	preset: annotationPresets.highlighter,
	// onPress: (event) => {alert("I was clicked");},
	// className: "",
	// mediaQueries: "",
	// disabled: "",
	// preset: "",
	// icon: "",
	// className: "",

};

PSPDFKit.load({
	baseUrl,
	container: "#pdfContainer1",
	document: "file4.pdf",
	theme: PSPDFKit.Theme.DARK,
	//annotationPresets,
	//autoSaveMode: PSPDFKit.AutoSaveMode.INTELLIGENT
	//autoSaveMode: PSPDFKit.AutoSaveMode.INSTANT
	//toolbarItems: PSPDFKit.defaultToolbarItems,   //[...PSPDFKit.defaultToolbarItems.slice(0, indexToInsert), item, ...PSPDFKit.defaultToolbarItems.slice(indexToInsert)],

})
	.then(instance => {
		console.log("PSPDFKit loaded", instance);

		const defaultItems = PSPDFKit.defaultToolbarItems;
		console.log(defaultItems);

	})
	.catch(error => {
		console.error(error.message);
	});

PSPDFKit.defaultToolbarItems[13] = item;




PSPDFKit.load({
	baseUrl,
	container: "#pdfContainer2",
	document: "document.pdf",
	theme: PSPDFKit.Theme.DARK,
});

