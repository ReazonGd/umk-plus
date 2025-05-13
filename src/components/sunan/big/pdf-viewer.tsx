import { h, Component, createRef, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

interface PDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

interface PDFLinkEnhancerProps {
  selector?: string; // Optional CSS selector to limit where to look for PDF links
}

// Check if the device supports PDF viewing
const isPDFSupported = (): boolean => {
  // Check for built-in PDF support
  const nav = navigator as any;

  // Most modern browsers support PDF viewing
  // This is a basic check that can be expanded
  return (
    // Check if the browser has PDF plugin
    (nav.mimeTypes && nav.mimeTypes["application/pdf"]) ||
    // Check for mobile devices that typically have built-in PDF support
    // /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    // Most modern desktop browsers support PDF
    /Chrome|Firefox|Safari|Edge/i.test(navigator.userAgent)
  );
};

// PDF Viewer Modal Component
const PDFViewer = ({ pdfUrl, onClose }: PDFViewerProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => setLoading(false);
    }

    // Add escape key listener to close viewer
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="pdf-viewer-modal">
      <div className="pdf-viewer-overlay" onClick={onClose}></div>
      <div className="pdf-viewer-content">
        <button className="pdf-viewer-close" onClick={onClose}>
          ×
        </button>
        {loading && <div className="pdf-viewer-loading">Loading PDF...</div>}
        <iframe ref={iframeRef} src={pdfUrl} title="PDF Viewer" width="100%" height="100%" />
      </div>

      <style>{`
        .pdf-viewer-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1100;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .pdf-viewer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
        }
        
        .pdf-viewer-content {
          position: relative;
          width: 90%;
          height: 90%;
          background: white;
          z-index: 1001;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .pdf-viewer-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          background: white;
          border: none;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          z-index: 1002;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        
        .pdf-viewer-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          z-index: 1001;
        }
      `}</style>
    </div>
  );
};

// Component to enhance PDF links in the document
class PDFLinkEnhancer extends Component<PDFLinkEnhancerProps> {
  state = {
    pdfLinks: [] as HTMLAnchorElement[],
    currentPdf: null as string | null,
    isSupported: false,
  };

  componentDidMount() {
    // Check if PDFs are supported
    const isSupported = isPDFSupported();
    this.setState({ isSupported });

    if (isSupported) {
      // Find all PDF links in the document
      this.findPDFLinks();

      // Set up a mutation observer to detect new links
      this.setupMutationObserver();
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  observer: MutationObserver | null = null;

  setupMutationObserver() {
    // Watch for changes in the DOM to catch newly added PDF links
    this.observer = new MutationObserver((mutations) => {
      let shouldRefresh = false;

      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          shouldRefresh = true;
          break;
        }
      }

      if (shouldRefresh) {
        this.findPDFLinks();
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  findPDFLinks() {
    const { selector } = this.props;

    // // Query selector to find PDF links
    const baseSelector = 'a[href*=".pdf"]';
    const fullSelector = selector ? `${selector} ${baseSelector}` : baseSelector;

    const all_links = document.querySelectorAll<HTMLAnchorElement>(".activityinstance a");
    const activity_links = Array.from(all_links).filter((el) => el.querySelector('img[src*="pdf"]'));

    const all_A_links = Array.from(document.querySelectorAll<HTMLAnchorElement>(fullSelector));

    // Update state with found links
    this.setState({ pdfLinks: [...all_A_links, ...activity_links] });

    // Add view buttons next to each link
    this.enhanceLinks([...all_A_links, ...activity_links]);
  }

  enhanceLinks(links: HTMLAnchorElement[]) {
    links.forEach((link) => {
      // Skip if we've already processed this link
      if (link.dataset.pdfEnhanced === "true") return;

      // Mark as processed
      link.dataset.pdfEnhanced = "true";

      // Create view button
      const viewButton = document.createElement("button");
      viewButton.innerHTML = "👁️ View";
      viewButton.className = "pdf-view-button";
      viewButton.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openPdf(link.href);
      };

      // Apply some basic styling
      viewButton.style.marginLeft = "6px";
      viewButton.style.fontSize = "12px";
      viewButton.style.padding = "2px 6px";
      viewButton.style.borderRadius = "3px";
      viewButton.style.border = "1px solid #ccc";
      viewButton.style.background = "#f5f5f5";
      viewButton.style.cursor = "pointer";

      // Insert button after the link
      link.parentNode?.insertBefore(viewButton, link.nextSibling);
    });
  }

  openPdf(url: string) {
    this.setState({ currentPdf: url });
  }

  closePdf = () => {
    this.setState({ currentPdf: null });
  };

  render() {
    const { currentPdf, isSupported } = this.state;

    // Don't render anything if PDFs aren't supported
    if (!isSupported) return null;

    return <Fragment>{currentPdf && <PDFViewer pdfUrl={currentPdf} onClose={this.closePdf} />}</Fragment>;
  }
}

// Example usage:
// Add this component to your main app component:
// <PDFLinkEnhancer selector=".content-area" />

export default PDFLinkEnhancer;
