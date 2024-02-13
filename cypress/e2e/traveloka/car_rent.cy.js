describe('Car Rent Without Driver', () => {
  beforeEach(() => {
    cy.visit('https://www.traveloka.com/id-id')
  })

  it('rent a car without driver', () => {
    //Select Cars Product
    cy.get('[data-id="IcProductDuotoneCarRentalFill"]').click({force:true});

    //Select tab Without Driver
    cy.get('[data-id="IcTransportPickUpDriver"]').click({force:true});

    //Select Pick-up Location (e.g.: Jakarta)
    cy.get('[data-testid="rental-search-form-location-input"]').click({force: true}).type("Jakarta")
    cy.intercept({
      method: "POST",
      url: "https://sdk.iad-03.braze.com/api/v3/data/**",
    }).as("data");
    cy.wait(10000);
    cy.wait("@data");
    cy.get('[aria-label="Jakarta"][data-testid="rental-search-form-location-item"]').click({force: true});

    //Select Pick-up Date & Time (e.g.: today+2d 09:00)
    cy.get('[data-testid="rental-search-form-date-input-start"]').click({force: true});
    cy.get('[data-testid="date-cell-16-2-2024"]').eq(0).click({force: true});

    cy.get('[data-testid="rental-search-form-time-input-start"]').click({force: true});
    cy.xpath('//*[@id="__next"]/div[3]/div[2]/div[1]/div[2]/div/div[3]/div/div/div/div/div[2]/div/div[5]/div/div[2]/div/div/div[1]/div[1]').contains('9').click({force: true});
    cy.xpath('//*[@id="__next"]/div[3]/div[2]/div[1]/div[2]/div/div[3]/div/div/div/div/div[2]/div/div[5]/div/div[2]/div/div/div[1]/div[3]').contains('0').click({force: true});
    cy.get('[role="button"]').contains('Selesai').click({force: true});
    
    //Select Drop-off Date & Time (e.g.: today+5d 11:00)
    cy.get('[data-testid="rental-search-form-date-input-end"]').click({force: true});
    cy.get('[data-testid="date-cell-19-2-2024"]').eq(1).click({force: true});

    cy.get('[data-testid="rental-search-form-time-input-end"]').click({force: true});
    cy.xpath('//*[@id="__next"]/div[3]/div[2]/div[1]/div[2]/div/div[3]/div/div/div/div/div[2]/div/div[9]/div/div[2]/div/div/div[1]/div[1]').contains('11').click({force: true});
    cy.xpath('//*[@id="__next"]/div[3]/div[2]/div[1]/div[2]/div/div[3]/div/div/div/div/div[2]/div/div[9]/div/div[2]/div/div/div[1]/div[3]').contains('30').click({force: true});
    cy.get('[role="button"]').contains('Selesai').click({force: true});
 
    //Click button Search Car
    cy.get('[data-testid="rental-search-form-cta"]').click({force: true});

    cy.url().should('contain', 'https://www.traveloka.com/id-id/car-rental/search?')
    cy.wait(10000)
    
    //Select Car
    cy.xpath('//*[@id="__next"]/div/div[5]/div[2]/div[2]/div/div/div[1]/div/div/div[3]/div[3]/div').click({force: true});
    
    //Select Car Provider & Click button Continue in Product Detail
    cy.xpath('//*[@id="__next"]/div/div[5]/div/div[4]/div/div[2]/div[2]/div[1]').click({force: true});
    cy.url().should('contain', 'https://www.traveloka.com/id-id/car-rental/detail?')
    cy.wait(10000)

    //Select Pick-up Location in “Rental Office”
    cy.get('[id="RENTAL_PICKUP_LOCATION"]').contains('Kantor Rental').click({force: true});
    cy.xpath('//*[@id="RENTAL_PICKUP_LOCATION"]/div/div/div[3]/div[2]/div/div/div[1]/div[1]/div').click({force: true});
    cy.xpath('//*[@id="RENTAL_PICKUP_LOCATION"]/div/div/div[3]/div[2]/div/div/div[1]/div[2]/div/div[1]/div/div[1]').click({force: true});
    cy.wait(10000)

    //Select Drop-off Location in “Other Location”
    cy.get('[id="RENTAL_DROPOFF_LOCATION"]').contains('Lokasi Lainnya').click({force: true});
    cy.xpath('//*[@id="RENTAL_DROPOFF_LOCATION"]/div/div/div[5]/div[2]/div/div[1]/div[1]/div/div[1]/input').click({force: true});
    cy.get('[aria-label="Soekarno Hatta International Airport (CGK)"]').eq(2).click({force: true});
    cy.wait(10000)

    //Input Pick-up/Drop-off notes is optional
    cy.xpath('//*[@id="RENTAL_DROPOFF_LOCATION"]/div/div/div[5]/div[2]/div/div[2]/div/textarea').type('Jalan Mawar No 10');

    //Click button Book Now
    cy.xpath('//*[@id="__next"]/div/div[5]/div/div[1]/div/div[5]/div[3]/div').click({force: true});
    
    cy.wait(10000)
    cy.url().should('contain', 'https://www.traveloka.com/id-id/booking/')
    cy.wait(10000)

    //Fill Contact Details
    cy.get('input[aria-labelledby="name.full"]').eq(0).click({force: true}).type("Pemesan");
    cy.get('input[aria-label="Phone Number"]').eq(0).click({force: true}).type("8000000000");
    cy.get('input[aria-labelledby="emailAddress"]').click({force: true}).type("email@example.com");

    //Fill Driver Details
    cy.xpath('//*[@id="adultForm0"]/div/div/div[2]/div[1]/div/div/select').select("Nyonya");
    cy.get('div[id="adultForm0"] input[aria-labelledby="name.full"]').click({force: true}).type("Pengemudi");
    cy.get('div[id="adultForm0"] input[aria-label="Phone Number"]').click({force: true}).type("8111111111");

    //Click Continue
    cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[1]/div[4]/div/div/div').click({force: true});

    //Add a special request is optional
    cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[1]/div[9]/div/div/div[3]/div[1]/textarea').type('Testing notes');

    //Check all rental requirements
    cy.get('[data-id="IcSystemChevronRight"]').click({force: true});

    cy.xpath('/html/body/div[2]/div/div[2]/div/div[2]/div/div[1]/div[2]').click({force: true});

    cy.xpath('/html/body/div[2]/div/div[2]/div/div[2]/div/div[3]/div[2]').click({force: true});

    cy.xpath('//*[@id="__next"]/div[2]/div[2]/div[1]/div[14]/div/div/div').click({force: true});

    //Click Continue
    cy.xpath('/html/body/div[3]/div/div[2]/div/div[2]/div/div[3]').click({force: true});

    cy.url().should('contain', 'https://www.traveloka.com/id-id/payment/')
    cy.wait(10000)

    //Select payment method and proceed payment
    cy.get('[data-testid="paymentPayButton"]').click({force: true});
  })
})