describe('App Button Click Event', function() {
  let client;

  beforeEach(function() {
    client = {
      events: {
        on: jasmine.createSpy('on')
      },
      interface: {
        trigger: jasmine.createSpy('trigger').and.callFake(function() {
          return Promise.resolve('Modal opened successfully');
        })
      }
    };

    // Mock the event listener
    client.events.on('ticketTopNavigation.onAppButtonClick', function() {
      console.log('App icon clicked');
      client.interface.trigger('showModal', {
        title: 'Sample App Form',
        template: 'modal.html'
      }).then(function(data) {
        console.log('Modal opened successfully', data);
      }, function(error) {
        console.error('Error opening modal', error);
      });
    });
  });

  it('should register the event listener for app button click', function() {
    expect(client.events.on).toHaveBeenCalledWith('ticketTopNavigation.onAppButtonClick', jasmine.any(Function));
  });

  it('should trigger showModal interface method when app button is clicked', function(done) {
    const eventCallback = client.events.on.calls.argsFor(0)[1];
    spyOn(console, 'log');
    spyOn(console, 'error');

    eventCallback();

    expect(console.log).toHaveBeenCalledWith('App icon clicked');
    client.interface.trigger('showModal', {
      title: 'Sample App Form',
      template: 'modal.html'
    }).then(function(data) {
      expect(console.log).toHaveBeenCalledWith('Modal opened successfully', 'Modal opened successfully');
      done();
    }).catch(function(error) {
      expect(console.error).toHaveBeenCalledWith('Error opening modal', error);
      done();
    });
  });
});
