import React, { useState } from 'react';
import { Button, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const CargaDatos = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const cargarDatosPrueba = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('http://localhost:8080/backend/api/datos-prueba/cargar');
            setSuccess(true);
            console.log('Datos cargados exitosamente:', response.data);
        } catch (err) {
            setError(err.response?.data || 'Error al cargar los datos de prueba');
            console.error('Error al cargar datos:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <Card>
                <Card.Header as="h5">Carga de Datos de Prueba</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Este botón cargará datos de prueba en el sistema, incluyendo:
                    </Card.Text>
                    <ul className="list-unstyled mb-3">
                        <li>5 clientes</li>
                        <li>5 vehículos</li>
                        <li>5 mecánicos</li>
                        <li>5 repuestos</li>
                    </ul>
                    <Card.Text>
                        <strong>Nota:</strong> Esta acción no se puede deshacer.
                    </Card.Text>

                    {error && (
                        <Alert variant="danger" className="mt-3">
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert variant="success" className="mt-3">
                            Datos de prueba cargados exitosamente
                        </Alert>
                    )}

                    <Button 
                        variant="primary" 
                        onClick={cargarDatosPrueba}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Cargando...
                            </>
                        ) : (
                            'Cargar Datos de Prueba'
                        )}
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CargaDatos;
