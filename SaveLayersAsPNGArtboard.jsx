/**
 * @author Niels Bosma (niels.bosma@motorola.com)
 * some enhancements by Jakob Stoeck
 *
 * usage: put in Application Directory/presets/en_US/Scripts/
 * Available in scripts menu
 */
var folder = Folder.selectDialog();
var document = app.activeDocument;
if (document && folder) {
	var options = new ExportOptionsPNG24();
	options.antiAliasing = true;
	options.transparency = true;
	options.artBoardClipping = true;
	// strips from exported filename
	var strip = / Image$|th-/;

	hideAllLayers();
	var n = document.layers.length;
	for (var i = 0; i < n; ++i) {
		var layer = document.layers[i];
		layer.visible = true;

		var filename = layer.name.replace(strip, '') + ".png";
		var file = new File(folder.fsName + "/" + filename);

		document.exportFile(file, ExportType.PNG24, options);
		layer.visible = false;
	}
}

function hideAllLayers() {
	forEach(document.layers,
	function(layer) {
		layer.visible = false;
	});
}

function showAllLayers() {
	forEach(document.layers,
	function(layer) {
		layer.visible = true;
	});
}

function forEach(collection, fn) {
	var n = collection.length;
	for (var i = 0; i < n; ++i) {
		fn(collection[i]);
	}
}
