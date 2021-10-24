const {google} = require('googleapis')

const {OAuth2} = google.auth

const oAuth2Client = new OAuth2('563965089163-smq0ehktilrg9gphlrdia19e7jmkci76.apps.googleusercontent.com', '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')

oAuth2Client.setCredentials({refresh_token: '1//04_s4xlQU7UdpCgYIARAAGAQSNwF-L9Irfib683pwVJ2pptwQTEw6D4WglhW7ajQQkO5GQnaiMPcItcParn4fTgvpDNCJ2e7cv_M'})

const calendar = google.calendar({version: 'v3', auth: oAuth2Client})
//date format: year, month - 1, day, hour, minute, second
const eventStartTime = new Date(2021, 9, 23, 16, 0, 0)
//eventStartTime.setDate(2021, 9, 23)

const eventEndTime = new Date(2021, 9, 23, 17, 0, 0)
//const eventEndTime
//eventEndTime.setDate(eventEndTime.getDay())
//eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
  summary: 'Meeting',
  location: '266 Ferst Dr NW, Atlanta, GA 30332',
  description: 'Meeting that works for both of us',
  start : {
    dateTime: eventStartTime,
    timeZone: 'America/New_York'
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/New_York'
  }
}

//queries google calendar checks if any events in this time window
calendar.freebusy.query({
  resource: {
    timeMin: eventStartTime,
    timeMax: eventEndTime,
    timeZone: 'America/New_York',
    items: [{id: 'primary'}],
  }
}, (err, res) => {
  if(err) return console.error('Free busy Query Error: ', err)

  //array that contains all the busy times in primary calendar
  const eventsArr = res.data.calendars.primary.busy
  const array2 = 
  {
      start: '2021-10-23T18:00:00-06:00',
      end: '2021-10-23T19:00:00-06:00'
  }
  //function isBetween(meetingStartTime, time1, time2) {

  //}

  //var eventFound = new Boolean(false)
  //var proposedMeetingStart = new Date(2021, 9, 23, 23, 0, 0)
  //while(!eventFound) {

  //}



  if(eventsArr.length === 0)
    return calendar.events.insert(
      { calendarId: "primary", resource: event},
      err => {
        if(err) return console.log('Calendar Event Creation error: ', err)

        return (console.log('Calendar Event Created.'))
        
      })
    return console.log("Busy")
})