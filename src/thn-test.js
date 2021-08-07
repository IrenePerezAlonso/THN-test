const AVAILABLE_IDS = {
    RESULTS_ITEMS: 'results-items',
    FB_HEADBAR_BLOCK_CURRENCY: 'fb-headbar-block-currency',
    FB_SUMMARY_DATES_ARRIBAL: 'fb-qs-summary-dates-arrival',
    FB_SUMMARY_DATES_DEPARTURE: 'fb-qs-summary-dates-departure',
    FB_SUMMARY_ROOMS_QUANTITY: 'fb-qs-summary-rooms-quantity'
};

const AVAILABLE_CLASSES = {
    ACCOMMODATION_TITLE: '.fb-results-acc-title > span',
    ACCOMMODATION_NEW_PRICE: '.new-price',
    ACCOMMODATION_PRICE: '.fb-price > span',
    ACCOMMODATION_RESULTS: 'fb-results-accommodation',
    ACCOMMODATION_RATEKEY_RESULTS: 'fb-results-ratekeys'
};

const ERROR_MESSAGE = {
    MESSAGE: 'You are not in an availability screen'
}

class AvailableRoom {
    accommodationTitle;
    accommodationPrice;
    extraInfo;

    constructor (room, roomExtraInfo) {
        this.accommodationTitle = this.getAccommodationTitle(room);
        this.accommodationPrice = this.getAccommodationPrice(room);
        this.extraInfo = roomExtraInfo && this.getExtraInfo(roomExtraInfo);
    }

    getAccommodationTitle (data) {
        return data.querySelector(AVAILABLE_CLASSES.ACCOMMODATION_TITLE).textContent;
    }

    getAccommodationPrice (data) {
        const newPrice = data.querySelector(AVAILABLE_CLASSES.ACCOMMODATION_NEW_PRICE);
        if(newPrice) return newPrice.querySelector(AVAILABLE_CLASSES.ACCOMMODATION_PRICE).textContent;
        else return data.querySelector(AVAILABLE_CLASSES.ACCOMMODATION_PRICE).textContent;
    }

    getExtraInfo(data) {
        const spans = data.getElementsByTagName('span');
        const resultingRateKeys = [];

        for (let i = 0; i < spans.length; i++) {
            const rateKey = spans[i].textContent;
            resultingRateKeys[i] = rateKey;
        }

        return resultingRateKeys;
    }
}

class SearchData {
    checkDates;
    minimumPricePerNight;
    currency;
    numRooms;
    numGuests;
    language;
    availableRooms;
    
    constructor() {
        this.checkDates = this.getCheckDates();
        this.minimumPricePerNight = this.getMinimumPriceNight();
        this.currency = this.getCurrency();
        this.numRooms = this.getNumRooms();
        this.numGuests = this.getNumGuests();
        this.language = this.getLanguageUsed();
        this.availableRooms = this.getAvailableRooms();
    }
        
    getCheckDates () {
        const arrivalDate = document.querySelector(`#${AVAILABLE_IDS.FB_SUMMARY_DATES_ARRIBAL} > span`);
        const pepartureDate = document.querySelector(`#${AVAILABLE_IDS.FB_SUMMARY_DATES_DEPARTURE} > span`);
        
        return {  
            checkInDate: arrivalDate.getAttribute('data-date'),
            checkOutDate: pepartureDate.getAttribute('data-date')
        }
    }

    getMinimumPriceNight() {
        const minimumPrice = document.querySelector(AVAILABLE_CLASSES.ACCOMMODATION_PRICE);

        return minimumPrice.innerText;
    }

    getCurrency() {
        const currencyType = document.querySelector(`#${AVAILABLE_IDS.FB_HEADBAR_BLOCK_CURRENCY} > span.fb-headbar-value`);

        return currencyType.innerText;
    }

    getNumRooms() {
        const numberOfRooms = document.querySelector(`#${AVAILABLE_IDS.FB_SUMMARY_ROOMS_QUANTITY} > span`);

        return numberOfRooms.innerText;
    }

    getNumGuests() {
        const numAdults = Number(document.querySelector('span[data-key=adult]').getAttribute('data-mode'));
        const numChildren = Number(document.querySelector('span[data-key=child]').getAttribute('data-mode'));

        return {
            numAdults,
            numChildren,
            guests: numAdults + numChildren
        }
    }

    getLanguageUsed() {
        const language = document.documentElement.lang;

        return language;
    }

    getAvailableRooms() {
        const rooms = document.getElementById(AVAILABLE_IDS.RESULTS_ITEMS).getElementsByClassName(AVAILABLE_CLASSES.ACCOMMODATION_RESULTS);
        const availableRooms = []

        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
            const roomExtraInfo = room.getElementsByClassName(AVAILABLE_CLASSES.ACCOMMODATION_RATEKEY_RESULTS)[0];

            availableRooms[i] = new AvailableRoom(room, roomExtraInfo);
        }

        return availableRooms;
    }
}

function avaliabilityOptions() {
    const isAvailabilityScreen = !!document.querySelector('span[data-key=adult]');

    if(!isAvailabilityScreen) console.error(ERROR_MESSAGE.MESSAGE);
    else {
        const results = new SearchData();
    
        return results;
    }
}

avaliabilityOptions();