import React, { CSSProperties } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  BarChart2, 
  ArrowLeft, 
  Copy,
  Info,
  Zap,
  Mail
} from 'lucide-react';

interface Classification {
  request_type: string;
  sub_request_type: string;
  primary_request: string;
  sender_address: string;
  confidence_score: number;
  key_values: Record<string, any>;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const classification: Classification = location.state?.classification || {
    request_type: 'Not Classified',
    sub_request_type: 'Unknown',
    primary_request: 'Unspecified',
    sender_address: 'wells@mail.com', 
    confidence_score: 1,
    key_values: {}
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return { 
      solid: '#10b981', 
      gradient: 'linear-gradient(to right, #10b981, #34d399)' 
    };
    if (confidence > 0.5) return { 
      solid: '#f59e0b', 
      gradient: 'linear-gradient(to right, #f59e0b, #fbbf24)' 
    };
    return { 
      solid: '#ef4444', 
      gradient: 'linear-gradient(to right, #ef4444, #f87171)' 
    };
  };

  const styles: { [key: string]: CSSProperties } = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    mainContainer: {
      width: '100%',
      minHeight: '100vh',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      boxShadow: 'none',
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    gradientHeader: {
      background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'white',
      flexShrink: 0
    },
    detailsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      padding: '2rem',
      background: 'linear-gradient(to bottom right, #f5f7fa, #e6e9f0)',
      flexShrink: 0,
      width: '100%',
      boxSizing: 'border-box'
    },
    detailCard: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -3px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    extractedDetailsSection: {
      padding: '2rem',
      backgroundColor: 'white',
      borderTop: '1px solid #e5e7eb',
      overflowX: 'auto',
      overflowY: 'visible',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'thin',
      scrollbarColor: '#888 #f1f1f1'
    },
    extractedDetailsContainer: {
      display: 'inline-flex',
      gap: '1rem',
      overflowX: 'auto',
      overflowY: 'visible',
      width: '100%',
      padding: '0 0 1rem 0',
      WebkitOverflowScrolling: 'touch'
    },
    extractedDetailsCard: {
      flexShrink: 0,
      minWidth: '250px',
      width: 'auto',
      backgroundColor: '#f3f4f6',
      padding: '1rem',
      borderRadius: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      borderLeft: '3px solid #4f46e5'
    },
    copyButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#4f46e5',
      transition: 'transform 0.2s ease'
    },
    confidenceSection: {
      padding: '1.5rem', 
      backgroundColor: '#f9fafb',
      borderTop: '1px solid #e5e7eb',
      flexShrink: 0,
      width: '100%',
      boxSizing: 'border-box'
    },
    footer: {
      backgroundColor: '#f3f4f6', 
      borderTop: '1px solid #e5e7eb', 
      padding: '1rem', 
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5rem',
      flexShrink: 0,
      width: '100%',
      boxSizing: 'border-box'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.mainContainer}>
        <div style={styles.gradientHeader}>
          <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            position: 'relative', 
            zIndex: 2,
            width: '100%'
          } as CSSProperties}>
            <div style={{
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              width: '100%', 
              marginBottom: '1rem'
            } as CSSProperties}>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem'
              } as CSSProperties}>
                <Zap color="white" size={32} />
                <h1 style={{
                  margin: 0, 
                  fontSize: '1.5rem', 
                  fontWeight: 600, 
                  color: 'white'
                } as CSSProperties}>
                  AI Classification Results
                </h1>
              </div>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem'
              } as CSSProperties}>
                <h2 style={{
                  margin: 0, 
                  fontSize: '1rem', 
                  color: 'white'
                } as CSSProperties}>
              Sender of this mail -    {classification.sender_address}
                </h2>
                <div 
                  style={{
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '0.5rem', 
                    borderRadius: '50%', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  } as CSSProperties} 
                  onClick={() => navigate('/')}
                  title="Back to Upload"
                >
                  <ArrowLeft color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.detailsSection}>
          <div style={{
            ...styles.detailCard,
            borderLeft: `4px solid #4f46e5`,
            backgroundImage: 'linear-gradient(to right, rgba(79,70,229,0.05), transparent)'
          } as CSSProperties}>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            } as CSSProperties}>
              <FileText color="#4f46e5" size={24} />
              <button 
                style={styles.copyButton}
                onClick={() => copyToClipboard(classification.request_type)}
                title="Copy Request Type"
              >
                <Copy size={20} />
              </button>
            </div>
            <div>
              <h3 style={{
                margin: 0, 
                color: '#6b7280', 
                fontSize: '0.875rem', 
                marginBottom: '0.25rem'
              } as CSSProperties}>
                Request Type
              </h3>
              <p style={{
                margin: 0, 
                fontWeight: 'bold', 
                color: '#1f2937', 
                fontSize: '1rem'
              } as CSSProperties}>
                {classification.request_type}
              </p>
            </div>
          </div>

          <div style={{
            ...styles.detailCard,
            borderLeft: `4px solid #3b82f6`,
            backgroundImage: 'linear-gradient(to right, rgba(59,130,246,0.05), transparent)'
          } as CSSProperties}>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            } as CSSProperties}>
              <TrendingUp color="#3b82f6" size={24} />
              <button 
                style={styles.copyButton}
                onClick={() => copyToClipboard(classification.sub_request_type)}
                title="Copy Sub Request Type"
              >
                <Copy size={20} />
              </button>
            </div>
            <div>
              <h3 style={{
                margin: 0, 
                color: '#6b7280', 
                fontSize: '0.875rem', 
                marginBottom: '0.25rem'
              } as CSSProperties}>
                Sub Request Type
              </h3>
              <p style={{
                margin: 0, 
                fontWeight: 'bold', 
                color: '#1f2937', 
                fontSize: '1rem'
              } as CSSProperties}>
                {classification.sub_request_type}
              </p>
            </div>
          </div>

          <div style={{
            ...styles.detailCard,
            borderLeft: `4px solid #10b981`,
            backgroundImage: 'linear-gradient(to right, rgba(16,185,129,0.05), transparent)'
          } as CSSProperties}>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            } as CSSProperties}>
              <CheckCircle color="#10b981" size={24} />
              <button 
                style={styles.copyButton}
                onClick={() => copyToClipboard(classification.primary_request)}
                title="Copy Primary Request Type"
              >
                <Copy size={20} />
              </button>
            </div>
            <div>
              <h3 style={{
                margin: 0, 
                color: '#6b7280', 
                fontSize: '0.875rem', 
                marginBottom: '0.25rem'
              } as CSSProperties}>
                Primary Request Type
              </h3>
              <p style={{
                margin: 0, 
                fontWeight: 'bold', 
                color: '#1f2937', 
                fontSize: '1rem'
              } as CSSProperties}>
                {classification.primary_request}
              </p>
            </div>
          </div>
        </div>

        <div style={styles.extractedDetailsSection}>
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1.5rem',
            paddingLeft: '2rem'
          } as CSSProperties}>
            <Info color="#4f46e5" size={24} style={{marginRight: '0.75rem'}} />
            <h2 style={{margin: 0, color: '#1f2937'} as CSSProperties}>Extracted Details</h2>
          </div>
          
          <div style={styles.extractedDetailsContainer}>
            {Object.entries(classification.key_values || {}).map(([key, value]) => (
              <div 
                key={key}
                style={styles.extractedDetailsCard}
              >
                <div style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center'
                } as CSSProperties}>
                  <h4 style={{
                    margin: 0, 
                    color: '#4b5563', 
                    fontSize: '0.875rem', 
                    textTransform: 'capitalize'
                  } as CSSProperties}>
                    {key}
                  </h4>
                  <button 
                    style={styles.copyButton}
                    onClick={() => copyToClipboard(value)}
                    title={`Copy ${key}`}
                  >
                    <Copy size={14} />
                  </button>
                </div>
                <p style={{
                  margin: 0, 
                  color: '#1f2937', 
                  fontWeight: 'bold'
                } as CSSProperties}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.confidenceSection}>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'} as CSSProperties}>
            <BarChart2 color="#4f46e5" size={24} style={{marginRight: '0.75rem'}} />
            <h3 style={{margin: 0, color: '#1f2937'} as CSSProperties}>Confidence Level</h3>
          </div>
          
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem'
          } as CSSProperties}>
            <div style={{
              width: '100%',
              height: '0.75rem',
              backgroundColor: '#e5e7eb',
              borderRadius: '9999px',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
            } as CSSProperties}>
              <div style={{
                width: `${classification.confidence_score * 100}%`,
                height: '100%',
                background: getConfidenceColor(classification.confidence_score).gradient,
                transition: 'width 0.5s ease-in-out',
                borderRadius: '9999px'
              } as CSSProperties}></div>
            </div>
            <span style={{
              fontWeight: 'bold', 
              color: getConfidenceColor(classification.confidence_score).solid
            } as CSSProperties}>
              {(classification.confidence_score ).toFixed(2)}%
            </span>
          </div>
        </div>

        <div style={styles.footer}>
          <Mail size={16} color="#6b7280" />
          <p style={{
            fontSize: '0.75rem', 
            color: '#6b7280',
            margin: 0
          } as CSSProperties}>
            by Back-Propagatores AI Classification
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;