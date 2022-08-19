import { DebugIndex } from '~components/debug/DebugIndex';
import { ContentContainer } from '~components/util/ContentContainer';

/**
 * Debug page
 * @constructor
 */
export default function Debug() {
  return (
    <ContentContainer>
      <DebugIndex />
    </ContentContainer>
  );
}
