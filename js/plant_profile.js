(function () {
    var QR_SIZE = 180;
    var QR_SERVICE_URL = "https://api.qrserver.com/v1/create-qr-code/";

    function getRecords() {
        return Array.isArray(window.plantRecords) ? window.plantRecords : [];
    }

    function normalizeId(id) {
        return String(id || "").trim().toUpperCase();
    }

    function findRecord(records, id) {
        var normalized = normalizeId(id);
        if (!normalized) {
            return null;
        }
        for (var i = 0; i < records.length; i += 1) {
            if (normalizeId(records[i].id) === normalized) {
                return records[i];
            }
        }
        return null;
    }

    function buildQrImageUrl(text) {
        return QR_SERVICE_URL + "?size=" + QR_SIZE + "x" + QR_SIZE + "&data=" + encodeURIComponent(text);
    }

    function clearElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function addDetail(list, label, value) {
        if (value === null || value === undefined || value === "") {
            return;
        }
        var item = document.createElement("li");
        var labelSpan = document.createElement("span");
        labelSpan.className = "plant-detail-label";
        labelSpan.textContent = label + ": ";
        var valueSpan = document.createElement("span");
        valueSpan.textContent = value;
        item.appendChild(labelSpan);
        item.appendChild(valueSpan);
        list.appendChild(item);
    }

    function renderDetails(container, record) {
        clearElement(container);
        if (!record) {
            return;
        }
        addDetail(container, "Plant ID", record.id);
        addDetail(container, "Planter", record.planterName);
        addDetail(container, "Organization", record.organization);
        addDetail(container, "Species", record.species);
        addDetail(container, "Planted", record.datePlanted);
        addDetail(container, "Location", record.location);
        if (record.latitude !== undefined && record.longitude !== undefined) {
            addDetail(container, "GPS", record.latitude + ", " + record.longitude);
        }
        addDetail(container, "Notes", record.notes);
    }

    var params = new URLSearchParams(window.location.search);
    var id = params.get("id") || "";
    var records = getRecords();
    var record = findRecord(records, id);

    var title = document.getElementById("plant-title");
    var status = document.getElementById("plant-status");
    var details = document.getElementById("plant-details");
    var empty = document.getElementById("plant-empty");
    var qrImage = document.getElementById("plant-qr-image");
    var link = document.getElementById("plant-link");

    if (record) {
        if (title) {
            title.textContent = record.species + " (" + record.id + ")";
        }
        if (status) {
            status.textContent = "Planted by " + record.planterName + ".";
        }
        if (details) {
            renderDetails(details, record);
        }
        if (empty) {
            empty.textContent = "";
        }
    } else if (id) {
        if (title) {
            title.textContent = "Plant profile";
        }
        if (status) {
            status.textContent = "No record found for " + id + ".";
        }
        if (empty) {
            empty.textContent = "Add a record for this Plant ID in data/plant_records.js.";
        }
    } else {
        if (title) {
            title.textContent = "Plant profile";
        }
        if (status) {
            status.textContent = "No Plant ID provided.";
        }
        if (empty) {
            empty.textContent = "Use a QR code or add ?id=PLANT-YYYY-XXXX to the URL.";
        }
    }

    if (id) {
        var profileUrl = window.location.href;
        if (link) {
            link.href = profileUrl;
            link.textContent = profileUrl;
        }
        if (qrImage) {
            qrImage.src = buildQrImageUrl(profileUrl);
            qrImage.alt = "QR code for " + profileUrl;
        }
    } else if (link) {
        link.removeAttribute("href");
        link.textContent = "Enter a Plant ID to generate a QR code.";
    }
})();
