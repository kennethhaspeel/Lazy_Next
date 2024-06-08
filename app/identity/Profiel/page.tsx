import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfielPagina = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/identity/login");
  const user = session?.user;
  console.log(user?.rollen.indexOf("test"))
  return (
    <div>
      {
        user?.image ? (
               <Image
        className="rounded-full"
        height={300}
        width={300}
        src={user?.image ?? ""}
        alt={user?.voornaam ?? ""}
      /> 
        ) : ("")
      }

      <div className="grid grid-cols-4 gap-y-4">
        <table>
          <tbody>
            <tr>
              <th>Voornaam</th>
              <td>{user?.voornaam}</td>
            </tr>
            <tr>
              <th>Naam</th>
              <td>{user?.naam}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user?.email}</td>
            </tr>
            <tr>
              <th>Telefoon</th>
              <td>{user?.telefoon}</td>
            </tr>
            <tr>
              <th>Rollen</th>
              <td>          <ul>
            {user?.rollen.map((rol, index) => (
              <li key={index}>{rol}</li>
            ))}
          </ul></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfielPagina;
