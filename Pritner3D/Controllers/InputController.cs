using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Pritner3D.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class InputController : ApiController
    {
        print_storageEntities ctx = new print_storageEntities();
        public IEnumerable<input> GetAllInputs()
        {
            return ctx.inputs.ToList();
        }

        public IHttpActionResult GetInputComposition(string idInput)
        {
            var inputCompositions = (from A in ctx.input_composition
                                     join B in ctx.inputs on A.idComplementInput equals B.idInput
                                     where A.idInput == idInput
                                     select new
                                     {
                                        idInput = A.idComplementInput,
                                        name = B.name,
                                        quantity = A.quantity,
                                        preparationTime = B.preparationTime,
                                        stock = B.stock
                                     });

            return Ok(inputCompositions);
        }
    }
}
