function retrieveAvaliabilityRooms() {

    const hotelData = {};

    //Customer data (number of adults, children, dates ...)
    const summaryData = document.querySelector('#fb-qs-summary');
    //All the search results (rooms)
    const mainContainer = document.querySelector('#results-items');
    //One of the results within all the results
    const searchResults = mainContainer.querySelectorAll('.fb-results-accommodation');


    function getCheckDates() {

        const arrivalDate = document.querySelector('#fb-qs-summary-dates-arrival > span');
        const pepartureDate = document.querySelector('#fb-qs-summary-dates-departure > span');

        hotelData.checkInDate = arrivalDate.getAttribute('data-date');
        hotelData.checkOutDate = pepartureDate.getAttribute('data-date');
    }

    function getMinimumPriceNight() {

        const minimumPrice = document.querySelector('.fb-price > span');

        hotelData.minimumPricePerNight = minimumPrice.innerText;
    }

    function getCurrency() {

        const currencyType = document.querySelector('#fb-headbar-block-currency > span.fb-headbar-value');

        hotelData.currency = currencyType.innerText;
    }

    function numRooms() {

        const numberOfRooms = document.querySelector('#fb-qs-summary-rooms-quantity > span');

        hotelData.numRooms = numberOfRooms.innerText;
    }

    function getNumGuests() {

        const adults = Number(document.querySelector('span[data-key=adult]').getAttribute('data-mode'));
        const childrens = Number(document.querySelector('span[data-key=child]').getAttribute('data-mode'));

        hotelData.numAdults = adults;
        hotelData.numChildern = childrens;
        
        hotelData.guests = adults + childrens;
    }

    function getLanguageUsed() {

        const lenguage = document.documentElement.lang;

        hotelData.language = lenguage;
      };

    // function getRoomsInfo(roomsTypes) {
    //     const priceList = [];
    //     const nights = document.querySelector('').getAttribute('');

    //     for(let i = 0; i < roomsTypes.lenght; i += 1) {
    //         for(let n = 0; n < roomsTypes[i].prices.lenght; z += 1) {
    //             priceList.push({
    //                 price: roomsTypes[i].prices[n].toFixed(2),
    //                 dailyPrice: ((roomsTypes[i].prices[n]) / nights).toFixed(2),
    //                 refundable: !roomsTypes[i].refundable[n].includes('cross'),
    //                 breakfast: !roomsTypes[i].breakfast[n].includes('cross'),
    //                 typeRoom: roomsTypes[i].type,
    //             });
    //         }
    //     }

    //     hotelData.rateList = priceList;
    //     priceList.sort((a, b) => a.price - b.price);
    //     hotelData.minimumPrice = { ...priceList[0] };
        

    // }

    // function getRoomsData() {
    //     const roomsByTypes = [];
    //     const roomsSelection = document.getElementsByClassName('');

    //     for (let i = 0; i < roomsSelection.length; i += 1) {

    //       const pricesSelection = roomsSelection[i].querySelectorAll('');
    //       const pricesFiltered = Array.from(pricesSelection).filter((element) => (element.getAttribute('class') === ''));
    //       const pricesArray = pricesFiltered.map((element) => Number(element.getAttribute('')));
    //       const refundable = Array.from(roomsSelection[i].querySelectorAll('')).map((element) => (element.getAttribute('')));
    //       const breakfast = Array.from(roomsSelection[i].querySelectorAll('')).map((element) => (element.getAttribute('')));
    //       roomsByTypes.push({
    //         type: (roomsSelection[i].querySelector('')).getAttribute(''),
    //         prices: pricesArray,
    //         refundable,
    //         breakfast,
    //       });
    //     }

    //     getRoomsDetails(roomsByTypes);
    //   };

    // function getGuestsNumber() {
    //     const selectionRoom = document.querySelector('');
    //     hotelData.rooms = Number(selectionRoom.getAttribute('').replace());

    //     const adults = Number(document.querySelector('').getAttribute(''));
    //     const children = Number(document.querySelector('').getAttribute(''));

    //     hotelData.guests = { adults, children };
    // }


    return hotelData;
}

function avaliabilityOptions() {
    const availabilityObjest = retrieveAvaliabilityRooms();

    if(!availabilityObjest) console.error('You are not in an availability screen');
    else return availabilityObjest;
}
