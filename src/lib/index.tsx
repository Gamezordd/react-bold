import React, { useEffect, useRef, useState } from 'react';
import './Styles.css';

interface SourceType {
  title: string,
  description: string,
  thumbnailSrc: string,
  accentColor?: string,
  color?: string,
  subtitle?: string,
  fontColor: string,
  link?: string,
}
type SourceDataType = SourceType[];

type BoldConfigType = {
  height?: string,
  width?: string,
  light?: boolean
}

interface HighlightPropTypes {
  source: SourceType[];
  config?: BoldConfigType
}

const Bold = ({config, source}:HighlightPropTypes) => {

  const {height, width, light} = config || {};
  
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [shouldRenderOverlay, setShouldRenderOverlay] = useState(false);

  const subjectElementRef = useRef<HTMLDivElement>(null);
  const [subjectInitialOffsets, setSubjectOffsets] = useState<{left: number, top: number, width: number} | undefined>(undefined)
  const handleHide = () => {
    setSelectedIndex(undefined);
    setTimeout(() => {
      setShouldRenderOverlay(false);
    },500);
  }
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setShouldRenderOverlay(true);
    const targetElement: HTMLElement | null = document.getElementById(`child-${index}`);
    if(!targetElement) return setSelectedIndex(undefined);
    var {top, left, width} = targetElement.getBoundingClientRect();
    setSubjectOffsets({left, top, width});
  }



  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      if(e.key === 'Escape') handleHide();
    }
    window.addEventListener('keydown', handleKeypress);
    return () => {
      window.removeEventListener('keydown', handleKeypress);
    }
  },[])

  useEffect(() => {
    if(shouldRenderOverlay) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'auto';
  }, [shouldRenderOverlay]);

  const selectedItem = selectedIndex!==undefined ? source[selectedIndex] : undefined;

  return (
    <>
    {shouldRenderOverlay && selectedItem &&
      <div className={`${light ? 'backdrop-light' : ''} backdrop-const backdrop${(selectedIndex === undefined) ?  `-hide ${light ? 'backdrop-hide-light' : ''}` : ''} `}>
        <div ref={subjectElementRef} style={{top: subjectInitialOffsets?.top, left: subjectInitialOffsets?.left, width: subjectInitialOffsets?.width}} className={`backdrop-subject backdrop-subject-const ${light ? 'thumbnail-contrast' : ''}`}>
          <img src={selectedItem.thumbnailSrc} alt="thumbnail" className='child-img' />
            <div className={`child-title ${light ? 'text-light-contrast' : ''}`}>{selectedItem.title}</div>
        </div>
        <div className={`text-container-grid`}>
          <div className={`animated-title animated-title-const ${light ? 'text-light-contrast' : ''}`}>
            <div>{selectedItem.title}</div>
            {
              selectedItem.subtitle && 
                <div className={`date-string ${light ? 'text-light-contrast' : ''}`}>{selectedItem.subtitle}</div>
            }
            {
              selectedItem.link && 
              <a target={selectedItem.link ? '_blank' : undefined} rel='noreferrer' href={selectedItem.link || "#"}>
                <button className={`backdrop-btn ${light ? 'btn-light-contrast' : ''}`}>
                  Visit Link
                </button>
              </a>
            }
            
          </div>
          <div className={`animated-description animated-description-const ${light ? 'text-light-contrast' : ''}`}>
            <span> {selectedItem.description} </span>
          </div>
        </div>
        
        <div onClick={() => handleHide()} className='backdrop-close-btn backdrop-close-btn-const'>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></svg>
        </div>
      </div>
    }
    <div className='container-grid'>
      {
        source.map((child, index) => (
          <div onClick={() => handleSelect(index)} key={`child-${index}`} id={`child-${index}`} className={`container-child ${light ? 'thumbnail-contrast' : ''}`}>
            <img src={child.thumbnailSrc} style={{height: '100%', width:'auto', backgroundColor:'#000000'}} alt="lol" className='child-img' />
            <div className={`child-title ${light ? 'text-light-contrast' : ''}`} style={{color: '#ffffff'}}>{child.title}</div>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default Bold;
export type {SourceDataType};
export {Bold}