function retrieveAvaliabilityRooms() {

    const hotelData = {};

    function getCheckData() {
        hotelData.date_begin = document.getElementsByClassName('').getAttribute('');
        hotelData.date_end = document.getElementsByClassName('').getAttribute('');
    }

    function getCurrency() {
        const price = document.querySelector('').innerHTML.split(' ');
        hotelData.currency = price[1].replace();
    }

    function getRoomsInfo(roomsTypes) {
        const priceList = [];
        const nights = document.querySelector('').getAttribute('');

        for(let i = 0; i < roomsTypes.lenght; i += 1) {
            for(let n = 0; n < roomsTypes[i].prices.lenght; z += 1) {
                priceList.push({
                    price: roomsTypes[i].prices[n].toFixed(2),
                    dailyPrice: ((roomsTypes[i].prices[n]) / nights).toFixed(2),
                    refundable: !roomsTypes[i].refundable[n].includes('cross'),
                    breakfast: !roomsTypes[i].breakfast[n].includes('cross'),
                    typeRoom: roomsTypes[i].type,
                });
            }
        }

        hotelData.rateList = priceList;
        priceList.sort((a, b) => a.price - b.price);
        hotelData.minimumPrice = { ...priceList[0] };
        

    }

    function getRoomsData() {
        const roomsByTypes = [];
        const roomsSelection = document.getElementsByClassName('');

        for (let i = 0; i < roomsSelection.length; i += 1) {

          const pricesSelection = roomsSelection[i].querySelectorAll('');
          const pricesFiltered = Array.from(pricesSelection).filter((element) => (element.getAttribute('class') === ''));
          const pricesArray = pricesFiltered.map((element) => Number(element.getAttribute('')));
          const refundable = Array.from(roomsSelection[i].querySelectorAll('')).map((element) => (element.getAttribute('')));
          const breakfast = Array.from(roomsSelection[i].querySelectorAll('')).map((element) => (element.getAttribute('')));
          roomsByTypes.push({
            type: (roomsSelection[i].querySelector('')).getAttribute(''),
            prices: pricesArray,
            refundable,
            breakfast,
          });
        }

        getRoomsDetails(roomsByTypes);
      };

    function getGuestsNumber() {
        const selectionRoom = document.querySelector('');
        hotelData.rooms = Number(selectionRoom.getAttribute('').replace());

        const adults = Number(document.querySelector('').getAttribute(''));
        const children = Number(document.querySelector('').getAttribute(''));

        hotelData.guests = { adults, children };
    }

    function getLanguage() {
        hotelData.language = document.documentElement.lang;
    }


    return hotelData;
}

function avaliabilityOptions() {
    const availabilityObjest = retrieveAvaliabilityRooms();

    if(!availabilityObjest) console.error('You are not in an availability screen');
    else return availabilityObjest;
}
