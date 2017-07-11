const Vorpal = require('vorpal');
const common = require('../common');
const list = require('../../src/commands/list');
const query = require('../../src/utils/query');

const sinon = common.sinon;
const vorpal = new Vorpal();

vorpal.use(list);
vorpal.pipe(() => '');

describe('lisky list command palette', () => {
  it('should test command list accounts', () => {
    const command = 'list accounts 13133549779353512613L 13133549779353512613L';

    sinon.stub(query, 'isAccountQuery');

    vorpal.execSync(command);

    (query.isAccountQuery.called).should.be.equal(true);

    query.isAccountQuery.restore();
  });

  it('should have the right parameters with block', () => {
    const command = 'list blocks 3641049113933914102 5650160629533476718';

    sinon.stub(query, 'isBlockQuery');

    vorpal.execSync(command);

    (query.isBlockQuery.called).should.be.equal(true);

    query.isBlockQuery.restore();
  });

  it('should have the right parameters with delegate', () => {
    const command = 'list delegates lightcurve tosch';

    sinon.stub(query, 'isDelegateQuery');

    vorpal.execSync(command);

    (query.isDelegateQuery.called).should.be.equal(true);

    query.isDelegateQuery.restore();
  });

  it('should have the right parameters with transaction', () => {
    const command = 'list transactions 16388447461355055139 14735719251498448056';

    sinon.stub(query, 'isTransactionQuery');

    vorpal.execSync(command);

    (query.isTransactionQuery.called).should.be.equal(true);

    query.isTransactionQuery.restore();
  });

  it('should have the right parameters with transaction, handling response', () => {
    const command = 'list transactions 16388447461355055139 14735719251498448056';

    sinon.stub(query, 'isTransactionQuery').resolves({ transactionid: '123' });

    vorpal.execSync(command);

    (query.isTransactionQuery.called).should.be.equal(true);

    query.isTransactionQuery.restore();
  });

  it('should have the right parameters with transaction, handling error from http', () => {
    const command = 'list transactions 16388447461355055139 14735719251498448056';

    sinon.stub(query, 'isTransactionQuery').resolves({ error: 'transaction not found' });

    vorpal.execSync(command);

    (query.isTransactionQuery.called).should.be.equal(true);

    query.isTransactionQuery.restore();
  });
});


describe('list command palette with json settings', () => {
  it('should have the right parameters with transactions', () => {
    const command = 'list transactions 16388447461355055139 14735719251498448056 -j';

    sinon.stub(query, 'isTransactionQuery').resolves({ transactionId: '123' });

    vorpal.execSync(command);

    (query.isTransactionQuery.called).should.be.equal(true);

    query.isTransactionQuery.restore();
  });

  it('should print no-json output', () => {
    const command = 'list transactions 16388447461355055139 14735719251498448056 --no-json';

    sinon.stub(query, 'isTransactionQuery');

    vorpal.execSync(command);

    (query.isTransactionQuery.called).should.be.equal(true);

    query.isTransactionQuery.restore();
  });

  it('should have the right parameters with transaction, handling error from http', () => {
    const command = 'list transactions 16388447461355055139 14735719251498448056 -j';

    sinon.stub(query, 'isTransactionQuery').resolves({ error: 'transaction not found' });

    vorpal.execSync(command);

    (query.isTransactionQuery.called).should.be.equal(true);

    query.isTransactionQuery.restore();
  });
});
