import React, { useState, Component } from 'react';
import LoadingSequence3D from './LoadingSequence3D';
import MainPage from './MainPage';
import './index.css';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 40, color: 'red', background: '#222', zIndex: 99999, position: 'relative' }}>
                    <h1>Something went wrong.</h1>
                    <pre>{this.state.error.toString()}</pre>
                    <pre>{this.state.error.stack}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function App() {
    const [loading, setLoading] = useState(true);

    return (
        <ErrorBoundary>
            {loading ? (
                <LoadingSequence3D onComplete={() => setLoading(false)} />
            ) : (
                <MainPage />
            )}
        </ErrorBoundary>
    );
}
