const { response } = require('express');
const Events = require('../models/Event');

const getEvents = async( req, res = response ) => {
    const events = await Events.find().populate('user','name');
    res.json({
        ok: true,
        events
    });
}

const createEvents = async( req, res = response ) => {
    const event = new Events( req.body );

    try{
        event.user = req.uid;

        const saveEvent = await event.save();

        res.json({
            ok: true,
            event: saveEvent
        }); 

    }catch(error){
        res.status(500).json({
            ok: false,
            msg:'Contact with your Admin'
        });
    }
}

const updateEvent = async(req, res = response ) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Events.findById( eventId );

        if(!event) {
            return res.status(404).json({
                ok:false,
                msg: 'Event does not exist for that id'
            });
        }

        if(event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have editing privileges for this event'
            });  
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Events.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: eventUpdated
        }); 
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Contact with your Admin'
        });
    }
}

const deleteEvent = async(req, res = response )=>{
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Events.findById( eventId );

        if(!event) {
            return res.status(404).json({
                ok:false,
                msg: 'Event does not exist for that id'
            });
        }

        if(event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have editing privileges for this event'
            });  
        }


        await Events.findByIdAndDelete( eventId );

        res.json({ ok: true }); 
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Contact with your Admin'
        });
    }
}

module.exports = {
    createEvents,
    deleteEvent,
    getEvents,
    updateEvent
}