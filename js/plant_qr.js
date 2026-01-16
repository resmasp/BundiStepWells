(function () {
    var QR_SIZE = 160;
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

    function buildProfileUrl(id) {
        var baseUrl = window.location.href.split("#")[0];
        var url = new URL("plant.html", baseUrl);
        if (id) {
            url.searchParams.set("id", id);
        }
        return url.toString();
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
        labelSpan.className = "qr-plan-detail-label";
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
            var empty = document.createElement("div");
            empty.textContent = "No details yet. Add a record in data/plant_records.js.";
            container.appendChild(empty);
            return;
        }
        var list = document.createElement("ul");
        addDetail(list, "Plant ID", record.id);
        addDetail(list, "Planter", record.planterName);
        addDetail(list, "Organization", record.organization);
        addDetail(list, "Species", record.species);
        addDetail(list, "Planted", record.datePlanted);
        addDetail(list, "Location", record.location);
        if (record.latitude !== undefined && record.longitude !== undefined) {
            addDetail(list, "GPS", record.latitude + ", " + record.longitude);
        }
        addDetail(list, "Notes", record.notes);
        container.appendChild(list);
    }

    function setText(element, text) {
        if (element) {
            element.textContent = text;
        }
    }

    function initPlantQrPanel() {
        var input = document.getElementById("plant-id-input");
        var button = document.getElementById("plant-id-generate");
        var link = document.getElementById("plant-profile-link");
        var qrImage = document.getElementById("plant-qr-image");
        var details = document.getElementById("plant-qr-details");
        var status = document.getElementById("plant-qr-status");
        var datalist = document.getElementById("plant-ids");

        if (!input || !link || !qrImage || !details) {
            return;
        }

        var records = getRecords();
        if (datalist) {
            clearElement(datalist);
            records.forEach(function (record) {
                var option = document.createElement("option");
                option.value = record.id;
                datalist.appendChild(option);
            });
        }

        function update() {
            var id = input.value.trim();
            var record = findRecord(records, id);
            var idToUse = record ? record.id : id;
            if (record && input.value.trim() !== record.id) {
                input.value = record.id;
            }

            if (idToUse) {
                var profileUrl = buildProfileUrl(idToUse);
                link.href = profileUrl;
                link.textContent = profileUrl;
                qrImage.src = buildQrImageUrl(profileUrl);
                qrImage.alt = "QR code for " + profileUrl;
            } else {
                link.removeAttribute("href");
                link.textContent = "Enter a Plant ID";
                qrImage.removeAttribute("src");
                qrImage.alt = "QR code placeholder";
            }

            if (record) {
                setText(status, "Record found for " + record.id + ".");
            } else if (idToUse) {
                setText(status, "No record found for " + idToUse + ". QR will still work.");
            } else {
                setText(status, "Enter a Plant ID to generate a QR code.");
            }

            renderDetails(details, record);
        }

        if (!input.value && records.length) {
            input.value = records[0].id;
        }

        input.addEventListener("input", update);
        if (button) {
            button.addEventListener("click", update);
        }

        update();
    }

    window.initPlantQrPanel = initPlantQrPanel;
})();
