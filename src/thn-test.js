function retrieveAvaliabilityRooms() {

    const hotelData = {};

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

    return hotelData;
}

function avaliabilityOptions() {
    const availabilityObjest = retrieveAvaliabilityRooms();

    if(!availabilityObjest) console.error('You are not in an availability screen');
    else return availabilityObjest;
}
