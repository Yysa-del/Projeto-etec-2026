package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/usuarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioResource {

    @GET
    public List<Usuario> listarTodos() {
        return Usuario.listAll();
    }

    @POST
    @Transactional
    public Response criarUsuario(Usuario novoUsuario) {
        novoUsuario.persist();
        return Response.status(Response.Status.CREATED).entity(novoUsuario).build();
    }
}
