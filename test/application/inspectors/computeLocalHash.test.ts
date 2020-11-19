import blockcertsV3Fixture from '../../fixtures/v3/blockcerts-3.0-alpha.json';
import computeLocalHash from '../../../src/inspectors/computeLocalHash';
import Versions from '../../../src/constants/certificateVersions';

describe('computeLocalHash test suite', function () {
  describe('given it receives a document', function () {
    it('should return the SHA-256 hashed version', async function () {
      const fixture = JSON.parse(JSON.stringify(blockcertsV3Fixture));
      const output = await computeLocalHash(fixture, Versions.V3_0_alpha);
      expect(output).toBe('5a44e794431569f4b50a44336c3d445085f09ac5785e38e133385fb486ada9c5');
    });
  });

  describe('given it receives the document has unmapped fields', function () {
    it('should throw', async function () {
      const fixture = JSON.parse(JSON.stringify(blockcertsV3Fixture));
      fixture.testUnmapped = 'this field is not mapped';
      await expect(async () => {
        await computeLocalHash(fixture, Versions.V3_0_alpha);
      }).rejects.toThrow('Found unmapped fields during JSON-LD normalization');
    });
  });
});