const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon jovi') );
bands.addBand( new Band('Heroes del silencio') );
bands.addBand( new Band('Javier') ); 



io.on('connection',client => {
    console.log('Cliente conectado');
    client.emit('active-bands',bands.getBands());
    client.on('disconnect',() => { console.log('Cliente desconectado'); });
    client.on('mensaje',(payload) => { 
        console.log('mensaje!!',payload); 
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });  
    client.on('vote-band',(payload)=>{
        console.log('vote id : '+ payload['id']);
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());
        io.emit('message', 'se voto a '+payload['name']+'!');
    });
    client.on('add-band',(payload) => {
        const newBand = new Band(payload['name']);
        bands.addBand( newBand );
        io.emit('active-bands',bands.getBands());
    });
    client.on('delete-band',(payload)=>{ 
        bands.deleteBand( payload['id'] );
        io.emit('active-bands',bands.getBands() );
        io.emit('delete-message','se elimino a '+payload['name'] +'!');
    }); 
});