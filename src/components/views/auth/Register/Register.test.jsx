import { render, screen } from "@testing-library/react";
import Register from "./Register";
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';


const server = setupServer(
    rest.get('https://goscrum-api.alkemy.org/auth/data', (req, res, ctx) => {
        return res(ctx.json({
            result: {
                continente: ['America', 'Europa', 'Otro'],
                Region: ['Otro', 'Latam', 'Brasil', 'America del Norte'],
                Rol: ['Team Member', 'Team Leader'],
            }

        }))
    })
)

beforeAll(() => server.listen())
afterAll(() => server.close())

it("fetch options", async () => {
  render(<Register />, {wrapper: MemoryRouter});

  expect(screen.getByRole("option", { name: "Elegir" })).toBeInTheDocument();

  expect(await screen.findByRole("option", { name: "Europa" })).toBeInTheDocument();

});
