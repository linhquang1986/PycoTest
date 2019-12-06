
const hasMapObj = (arrived, departures) => {
    // Collection of events
    const events = [];
    // Number of rooms
    let n = arrived.length;

    for (let i = 0; i < n; i++) {
        let arrival = arrived[i];
        let departure = departures[i];
        // Add one during an arrival
        let current = events[arrival];
        let arrivalObj = { "bookingDate": arrival, "isDepature" : (current == null ? 1 : current + 1) }
        events.push(arrivalObj);

        // Remove one during a departure
        current = events[departure];
        let departureObj = { "bookingDate": departure, "isDepature" :  (current == null ? -1 : current - 1) };
        events.push(departureObj);
    }
    return events;
}

const sortHashMap = (hmObj) => {
    return hmObj.sort((a, b) =>  a.bookingDate - b.bookingDate);
}

const isBooking = async (arrived, departures, K) => {
    const evtOBJ = await hasMapObj(arrived, departures);
    const sortObject = await sortHashMap(evtOBJ);
    let status = true;
    let count = 0;
    sortObject.map(item => {
        count += item.isDepature;
        if (count > K) {
            status = false;
        }
    });
    return status;
}

exports.getStatusRoom = (req, res, next) => {
    try {
        let arrived, departures, K;
        if (!req.body._arrived || !req.body._departures || !req.body._K ) {
            res.json({ message: 'Please enter time or number of room you have!' });
        } else {
            const { _arrived, _departures, _K } = req.body;
            arrived = JSON.parse("[" + _arrived + "]");
            departures = JSON.parse("[" + _departures + "]");
            K = _K
        }

        isBooking(arrived, departures, K).then(rs => res.json({ "isBooking": rs }));
    } catch (e) {
        next(e);
    }
}