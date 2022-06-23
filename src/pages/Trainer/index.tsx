import { useEffect, useState } from 'react';
import { GraphVisualizator } from '../../components/GraphVisualizator';
import { GraphService } from '../../services/graph.service';
import { PokemonService } from '../../services/pokemon.service';
import { StorageService } from '../../services/storage.service';
import { TrainerService } from '../../services/trainer.service';

import './styles.css';

export function Trainer() {
 
  
  const [graphData, setGraphData] = useState<any[]>([]);

  const ps = new PokemonService();
  const ts = new TrainerService();


  useEffect(() => {
    const data = [] as any;
    //pokemon
    ps.findAll().forEach(p => {
      data.push(GraphService.setNode(p.name, p.name, p.image));
    });

    //treinadores
    ts.findAll().forEach(t => {
      if(t.name === StorageService.getData('username'))
        data.push(GraphService.setNode(t.name, t.name, t.image));
      
    });

    // ligações
    ts.findAllConnections().forEach(c => {
      console.log(c);
      if(c.trainer_name === StorageService.getData('username'))
        data.push(GraphService.setEdge(c.trainer_name, c.pokemon_name));
    
        
    });

  
    setGraphData(data);

  }, []);


 
  return (
   
    <div className="backgound">
      <GraphVisualizator 
      title={'PokeGraph'}
      graphData={graphData}
    />

    </div>
   
  );
}