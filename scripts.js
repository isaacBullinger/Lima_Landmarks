// Added custom graphics layer for my 20 places
require([
  "esri/layers/GraphicsLayer", 
  "esri/Graphic"
], (GraphicsLayer, Graphic) => {

  const arcgisMap = document.querySelector("arcgis-map");

  arcgisMap.addEventListener("arcgisViewReadyChange", () => {
    const view = arcgisMap.view;

    // Create a GraphicsLayer
    const graphicsLayer = new GraphicsLayer();
    arcgisMap.map.add(graphicsLayer);

    // Array of landmarks, their location, type and description
    const landmarks = [
        {
            name: "Parque Kennedy",
            type: "Park",
            address: "Av. Oscar R. Benavides, Miraflores 15074",
            coordinates: [-77.0303686314842, -12.121633478284604],
            description: "City park honoring President John F. Kennedy, with street vendors, artists & many resident cats."
        },
        {
            name: "Plaza 27 de Noviembre",
            type: "Park",
            address: "Av República de Colombia 490, San Isidro 15046",
            coordinates: [-77.02896501930115, -12.098241427623721],
            description: "A circular shaped park commemorating the Battle of Tarapacá. A battle in the War of the Pacific between Chilean and Peruvian soldiers."
        },
        {
            name: "Louis Vuitton Store",
            type: "Store",
            address: "Jockey Plaza, Av. Javier Prado Este, 4200 Santiago de Surco, Lima 15023",
            coordinates: [-76.97714661711835, -12.084944802671592],
            description: "Opened in 2021, First Louis Vuitton Store in Peru."
        },
        {
            name: "Huaca Pucllana",
            type: "Historical Site",
            address: "Ca. Gral. Borgoño cdra. 8, Miraflores 15074",
            coordinates: [-77.0333222535336, -12.111189236933836],
            description: "Ancient adobe pyramid built sometime between 200 and 700 ad."
        },
        {
            name: "Circuito Mágico del Agua",
            type: "Park",
            address: "Jirón Madre de Dios S/N, Lima 15046",
            coordinates: [-77.03484657116451, -12.070158171179541],
            description: "A water fountain park with colorful night shows, inaugurated in 2007."
        },
        {
            name: "Lima Golf Club",
            type: "Park",
            address: "Av. Camino Real 770, San Isidro 15073",
            coordinates: [-77.0386584171181, -12.101843095430745],
            description: "Founded May 28th 1924, the entirety of the golf course is completely surrounded by high end apartment buildings with a gorgeous view of both San Isidro and the golf course."
        },
        {
            name: "Location of first ward meetinghouse ever in Peru",
            type: "Church",
            address: "Los Cedros 388, San Isidro 15073",
            coordinates: [-77.04376747478915, -12.09529072827434],
            description: "First Property bought by the church in Peru, in November of 1956, for the first ward in Peru, composed of all American members. Building was turned into an MTC in 1986 and eventually sold and demolished, now an apartment building rests on that lot."
        },
        {
            name: "Larcomar Mall",
            type: "Store",
            address: "Mal. de la Reserva 610, Miraflores 15074",
            coordinates: [-77.03048271711747, -12.131750892847647],
            description: "Located in the famous Miraflores Malecón, an open air mall with a stunning view of the ocean, opened 1998."
        },
        {
            name: "Parque Tamayo",
            type: "Park",
            address: "Calle Las Camelias 851, San Isidro 15076",
            coordinates: [-77.0278260401311, -12.096850664487729],
            description: "Park named after Augusto Enrique Tamayo Möller, a Peruvian engineer who was a pioneer of telecommunications in Peru."
        },
        {
            name: "Lima Country Club Hotel",
            type: "Historical Site",
            address: "Ca. Los Eucaliptos 590, San Isidro 15076",
            coordinates: [-77.04882849013114, -12.097765929729023],
            description: "Opened February 8th 1927, one of the most exclusive places in San Isidro. Situated next to the golf course."
        },
        {
            name: "Cerro San Cristóbal",
            type: "Viewpoint",
            address: "-12.035669324986216, -77.01772765055416",
            coordinates: [-77.01772765055416, -12.035669324986216],
            description: "This 409m-high hill in Lima features a giant cross & a viewing area at its summit."
        },
        {
            name: "Plaza San Martín",
            type: "Historical Site",
            address: "Av. Nicolás de Piérola cdra. 9, Lima 15001",
            coordinates: [-77.03462009013187, -12.051410294086468],
            description: "A major square with a statue of José de San Martín. San Martin is known as the Protector of Peru and helped to liberate it from the Spanish Empire."
        },
        {
            name: "Real Felipe Fortress",
            type: "Historical Site",
            address: "Plaza Independencia, Callao 07021",
            coordinates: [-77.1487169017768, -12.062330225040455],
            description: "Storied 18th-century fort built to defend against pirates, with tours & an on-site museum."
        },
        {
            name: "Parque Reducto No. 2",
            type: "Park",
            coordinates: [-77.02265035944664, -12.126111509754013],
            description: "Tranquil park & War of the Pacific memorial, with a small museum displaying a historic steam train."
        },
        {
            name: "Malecón de Miraflores",
            type: "Viewpoint",
            address: "Mal. de la Reserva 275, Miraflores 15074",
            coordinates: [-77.038425415342, -12.12433913347114],
            description: "A scenic cliffside walkway overlooking the Pacific Ocean."
        },
        {
            name: "Tiffany & Co. Store",
            type: "Store",
            address: "Av. Sta. Cruz 888, Miraflores 15074",
            coordinates: [-77.0383357054729, -12.111478827639923],
            description: "Opened April 2017, First Tiffany & co store in Peru."
        },
        {
            name: "El Olivar Park",
            type: "Park",
            address: "VXX7+4W6, Delimitado por la avenidas Paz Soldán, La Republica y, C. Ántero Aspíllaga, Lima 15073",
            coordinates: [-77.0352391728013, -12.102160149531757],
            description: "Calm green space featuring centuries-old olive trees & lagoons with koi fish & flower beds."
        },
        {
            name: "Historic Sears & Roebuck store (currently Saga Falabella department Store)",
            type: "Historical Site",
            address: "Av. Paseo de la República 3220, San Isidro 15046",
            coordinates: [-77.02502867478918, -12.094901846707128],
            description: "An ancient archaeological site outside Lima."
        },
        {
            name: "Lima Perú Temple",
            type: "Temple",
            address: "Av. Javier Prado Este 6420, La Molina 15024",
            coordinates: [-76.9500633133599, -12.062484805376329],
            description: "Dedicated January of 1986 by Gordon B Hinkley. First Temple in Peru. Designed by Jesse M. Harris."
        },
        {
            name: "Los Olivos Temple",
            type: "Temple",
            address: "Av. Eloy Espinoza 680, San Martín de Porres 15102",
            coordinates: [-77.05218173107629, -12.014366140171845],
            description: "Dedicated January of 2024 by D. Todd Christofferson. Fourth Temple in Peru. Designed by Matt Clinger."
        }
    ];

    // Loop through landmarks and add them as points using coordinates and longitude and latitude
    landmarks.forEach((landmark) => {
      const point = {
        type: "point",
        longitude: landmark.coordinates[0],
        latitude: landmark.coordinates[1]
      };

    // This function maps symbols to landmarks by type
    function getSymbolByType(type) {
        const icons = {
            "Store": "imgs/store-pin.png",
            "Park": "imgs/park-pin.png",
            "Historical Site": "imgs/historical-pin.png",
            "Viewpoint": "imgs/viewpoint-pin.png",
            "Temple": "imgs/temple-pin.png",
            "Church": "imgs/church-pin.png",
            "Default": "imgs/location-pin.png"
        };

        return {
            type: "picture-marker",
            // Fallback to default icon
            url: icons[type] || icons["Default"],
            width: "30px",
            height: "30px"
        };
    }

    // This function is used to display filtered landmarks
    function addLandmarks(filteredLandmarks) {
        // Clear previous markers
        graphicsLayer.removeAll();

        filteredLandmarks.forEach(landmark => {
        const point = {
            type: "point",
            longitude: landmark.coordinates[0],
            latitude: landmark.coordinates[1]
        };
        const symbol = getSymbolByType(landmark.type);
        // Define the pop-up template
        const popupTemplate = {
            title: `{name}`,
            content: `
            <b>Address:</b> {address} <br>
            <b>Type:</b> {type} <br>
            <b>Description:</b> {description} <br>`
        };
        
        // Create a Graphic
        const graphic = new Graphic({
            geometry: point,
            symbol: symbol,
            attributes: landmark,
            popupTemplate: popupTemplate
        });
        
        graphicsLayer.add(graphic);
        });
    }

    // This event listener handles changing the displayed landmarks based on the dropdown filter
    document.getElementById("landmarkFilter").addEventListener("change", (event) => {
        const selectedType = event.target.value;
        let filtered;
        if (selectedType === "all") {
            filtered = landmarks;
        } else {
            filtered = landmarks.filter(l => l.type === selectedType);
        }
        addLandmarks(filtered);
    });

    // Load all landmarks initially
    addLandmarks(landmarks);
    });
  });
});
