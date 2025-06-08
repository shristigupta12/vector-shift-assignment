from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]
    width: Optional[int] = None
    height: Optional[int] = None

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    adj = {node.id: [] for node in nodes}
    for edge in edges:
        adj[edge.source].append(edge.target)

    visiting = set()
    visited = set()

    def has_cycle(node_id):
        visiting.add(node_id)
        for neighbor in adj.get(node_id, []):
            if neighbor in visiting:
                return True
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
        visiting.remove(node_id)
        visited.add(node_id)
        return False

    for node in nodes:
        if node.id not in visited:
            if has_cycle(node.id):
                return False
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_check = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_check,
    }
